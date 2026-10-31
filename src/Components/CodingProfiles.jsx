import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  EDIT THIS BLOCK: only usernames live here. Every number on the     */
/*  page (GitHub, LeetCode, GfG) is fetched from an API at load time.  */
/* ------------------------------------------------------------------ */
const PROFILE_DATA = {
  github: { username: 'Avinash2912', url: 'https://github.com/Avinash2912' },
  leetcode: { username: 'Avinash_1912' },
  gfg: { username: 'avinashjha832' },
};

const HEAT = [
  'rgba(255,255,255,0.08)',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
];

/* ------------------------------ Shared fetch helpers --------------- */
// Free hosts can cold-start slowly (30-60s), so each request gets a generous timeout.
const fetchJson = async (url, parentSignal, ms = 45000) => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  const onAbort = () => ctrl.abort();
  parentSignal.addEventListener('abort', onAbort);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
    parentSignal.removeEventListener('abort', onAbort);
  }
};

// Accepts numbers or numeric strings ("224", "00"); anything else -> null.
const toNum = (v) => {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  const n = parseFloat(String(v ?? '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : null;
};

/* ------------------------------ LeetCode data ---------------------- */
// Unofficial community APIs (LeetCode has no public REST API). All are tried in parallel;
// each one may supply the solved counts, the question totals, or both.
const LC_URLS = [
  (u) => `https://alfa-leetcode-api.onrender.com/${u}/solved`,
  (u) => `https://alfa-leetcode-api.onrender.com/userProfile/${u}`,
  (u) => `https://leetcode-stats.tashif.codes/${u}`,
];

const byDiff = (arr, name) =>
  Array.isArray(arr) ? toNum(arr.find((x) => x?.difficulty === name)?.count) : null;

const firstNum = (...vals) => {
  for (const v of vals) {
    const n = toNum(v);
    if (n !== null && v !== '' && v !== undefined && v !== null) return n;
  }
  return null;
};

// Tolerant of several response shapes. Returns { counts, totals } (either may be null) or null.
const parseLeetCode = (j) => {
  if (!j || typeof j !== 'object') return null;
  const ac = j.acSubmissionNum ?? j.matchedUser?.submitStats?.acSubmissionNum;
  const all = j.allQuestionsCount;

  const easy = firstNum(j.easySolved, byDiff(ac, 'Easy'));
  const medium = firstNum(j.mediumSolved, byDiff(ac, 'Medium'));
  const hard = firstNum(j.hardSolved, byDiff(ac, 'Hard'));
  const counts = [easy, medium, hard].every((n) => n !== null)
    ? {
        easy,
        medium,
        hard,
        solved: firstNum(j.solvedProblem, j.totalSolved, byDiff(ac, 'All'), easy + medium + hard),
      }
    : null;

  const tEasy = firstNum(j.totalEasy, byDiff(all, 'Easy'));
  const tMedium = firstNum(j.totalMedium, byDiff(all, 'Medium'));
  const tHard = firstNum(j.totalHard, byDiff(all, 'Hard'));
  const tAll = firstNum(j.totalQuestions, byDiff(all, 'All'));
  const totals = [tEasy, tMedium, tHard].every((n) => n !== null)
    ? { easy: tEasy, medium: tMedium, hard: tHard, all: tAll ?? tEasy + tMedium + tHard }
    : null;

  // Extra profile details (only the tashif API provides these).
  const d = j.data && typeof j.data === 'object' ? j.data : {};
  const extras = {
    rating: firstNum(d.currentRating, j.currentRating),
    peakRating: firstNum(d.maxRating, j.maxRating),
    contests: firstNum(d.totalContests, j.totalContests),
    activeDays: firstNum(d.totalActiveDays, j.totalActiveDays),
    badges: firstNum(d.badgesCount, j.badgesCount),
    acceptance: firstNum(j.acceptanceRate),
    ranking: firstNum(j.ranking),
    contributionPoints: firstNum(j.contributionPoints, d.contributionPoints),
    reputation: firstNum(j.reputation, d.reputation),
  };
  const hasExtras = Object.values(extras).some((v) => v !== null);

  return counts || totals || hasExtras
    ? { counts, totals, extras: hasExtras ? extras : null }
    : null;
};

// Contest ranking + rating history (LeetCode's userContestRankingInfo, via alfa-leetcode-api).
const LC_SKILL_URL = (u) => `https://alfa-leetcode-api.onrender.com/${u}/skill`;
const LC_LANGUAGE_URL = (u) => `https://alfa-leetcode-api.onrender.com/${u}/language`;

const parseLeetCodeLanguages = (json) => {
  const rows = Array.isArray(json?.languageProblemCount) ? json.languageProblemCount : [];
  return rows
    .filter((row) => row && typeof row.languageName === 'string' && Number.isFinite(Number(row.problemsSolved)))
    .map((row) => ({ languageName: row.languageName, problemsSolved: Number(row.problemsSolved) }))
    .sort((a, b) => b.problemsSolved - a.problemsSolved);
};

const LeetCodeLanguages = ({ languages }) => {
  if (!languages.length) return null;
  const total = languages.reduce((sum, item) => sum + item.problemsSolved, 0);
  const palette = ['#f59e0b', '#38bdf8', '#34d399', '#a78bfa', '#fb7185', '#facc15', '#2dd4bf', '#c084fc'];
  let offset = 0;
  const segments = languages.map((item, index) => {
    const start = offset;
    offset += total > 0 ? (item.problemsSolved / total) * 100 : 0;
    return { ...item, color: palette[index % palette.length], start, end: offset, percent: total ? (item.problemsSolved / total) * 100 : 0 };
  });
  const pieBackground = total
    ? `conic-gradient(${segments.map((item) => `${item.color} ${item.start}% ${item.end}%`).join(', ')})`
    : 'conic-gradient(#555 0% 100%)';
  return (
    <section className="lc-languages" aria-label="LeetCode language-wise solved">
      <div className="lc-languages-header">
        <span>Language-wise Solved</span>
        <span>{languages.length} languages</span>
      </div>
      <div className="lc-language-summary">
        <strong>{total.toLocaleString()}</strong>
        <span>problems solved across languages</span>
      </div>
      <div className="lc-language-chart-layout">
        <div className="lc-language-pie" role="img" aria-label={`Language distribution: ${segments.map((item) => `${item.languageName} ${item.percent.toFixed(1)} percent`).join(', ')}`} style={{ background: pieBackground }}>
          <div className="lc-language-pie-center"><strong>{total.toLocaleString()}</strong><span>Total</span></div>
        </div>
        <div className="lc-language-legend">
          {segments.map((item) => (
            <div className="lc-language-legend-row" key={item.languageName}>
              <span className="lc-language-dot" style={{ background: item.color }} />
              <span className="lc-language-name">{item.languageName}</span>
              <strong className="lc-language-count">{item.problemsSolved.toLocaleString()}</strong>
              <span className="lc-language-percent">{item.percent.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// The skill endpoint returns category keys (for example fundamental,
// intermediate and advanced), each containing topic records.
const parseLeetCodeTopics = (json) => {
  if (!json || typeof json !== 'object' || Array.isArray(json)) return [];

  return Object.entries(json)
    .filter(([, topics]) => Array.isArray(topics))
    .map(([category, topics]) => ({
      category,
      topics: topics.filter(
        (topic) =>
          topic &&
          typeof topic.tagName === 'string' &&
          typeof topic.tagSlug === 'string' &&
          Number.isFinite(Number(topic.problemsSolved))
      ),
    }))
    .filter((group) => group.topics.length > 0);
};

const LeetCodeTopics = ({ groups }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const allTopics = groups.flatMap((group) => group.topics);
  const maxSolved = Math.max(
    1,
    ...allTopics.map((topic) => Number(topic.problemsSolved) || 0)
  );

  useEffect(() => {
    if (!selectedCategory) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedCategory(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCategory]);

  if (!allTopics.length) return null;

  const renderTopicRows = (topics) => (
    <div className="lc-topic-list">
      {topics.map((topic) => {
        const solved = Number(topic.problemsSolved) || 0;
        return (
          <div className="lc-topic-row" key={topic.tagSlug}>
            <span className="lc-topic-name" title={topic.tagName}>
              {topic.tagName}
            </span>
            <div
              className="lc-topic-progress"
              role="progressbar"
              aria-label={`${topic.tagName} solved`}
              aria-valuemin={0}
              aria-valuemax={maxSolved}
              aria-valuenow={solved}
            >
              <div
                className="lc-topic-progress-fill"
                style={{ width: `${(solved / maxSolved) * 100}%` }}
              />
            </div>
            <span className="lc-topic-count">{solved}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="lc-topics">
      <div className="lc-topics-header">
        <span>Topic-wise Solved</span>
        <span>{allTopics.length} topics</span>
      </div>

      <div className="lc-category-cards">
        {groups.map((group) => (
          <button
            type="button"
            className="lc-category-card"
            key={group.category}
            onClick={() => setSelectedCategory(group)}
            aria-label={`View ${group.category} topics`}
          >
            <span className="lc-category-card-name">
              {group.category.replace(/[-_]/g, ' ')}
            </span>
            <span className="lc-category-card-count">{group.topics.length} topics</span>
            <span className="lc-category-card-action">View topics <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div
          className="lc-topic-modal-backdrop"
          onClick={() => setSelectedCategory(null)}
        >
          <section
            className="lc-topic-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lc-topic-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lc-topic-modal-header">
              <div>
                <h3 id="lc-topic-modal-title">
                  {selectedCategory.category.replace(/[-_]/g, ' ')}
                </h3>
                <span>{selectedCategory.topics.length} topics</span>
              </div>
              <button
                type="button"
                className="lc-topic-modal-close"
                onClick={() => setSelectedCategory(null)}
                aria-label="Close topics modal"
              >
                ×
              </button>
            </div>
            {renderTopicRows(selectedCategory.topics)}
          </section>
        </div>
      )}
    </div>
  );
};

const LC_CONTEST_URL = (u) => `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${u}`;

const parseContest = (j) => {
  if (!j || typeof j !== 'object') return null;
  const root = j.data && typeof j.data === 'object' ? j.data : j;
  const r = root.userContestRanking ?? null;
  const history = Array.isArray(root.userContestRankingHistory) ? root.userContestRankingHistory : [];

  // Only contests the user actually took part in, oldest -> newest.
  const points = history
    .filter((h) => h && h.attended === true && toNum(h.rating) !== null)
    .map((h) => ({
      rating: toNum(h.rating),
      time: toNum(h.contest?.startTime),
      title: h.contest?.title ?? null,
      ranking: toNum(h.ranking),
      solved: toNum(h.problemsSolved),
      total: toNum(h.totalProblems),
      trend: h.trendDirection ?? null,
      finish: toNum(h.finishTimeInSeconds),
    }))
    .sort((a, b) => (a.time ?? 0) - (b.time ?? 0));

  const rating = toNum(r?.rating) ?? (points.length ? points[points.length - 1].rating : null);
  if (rating === null && !points.length) return null;

  return {
    rating,
    attended: toNum(r?.attendedContestsCount) ?? (points.length || null),
    globalRanking: toNum(r?.globalRanking),
    totalParticipants: toNum(r?.totalParticipants),
    topPercentage: toNum(r?.topPercentage),
    points,
  };
};

/* ------------------------------ GfG data --------------------------- */
const GFG_BASE = 'https://gfg-stats.tashif.codes';
const GFG_FALLBACK = (u) => `https://geeks-for-geeks-api.vercel.app/${u}`;

// Numbers or purely numeric strings only ("224", "00"); "avinashjha832" -> null.
const strictNum = (v) =>
  typeof v === 'number'
    ? Number.isFinite(v) ? v : null
    : typeof v === 'string' && /^\s*-?\d+(\.\d+)?\s*$/.test(v)
      ? parseFloat(v)
      : null;

const normKey = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

// Depth-first search for the first non-empty value whose key matches any of `names`.
const findKey = (obj, names, depth = 0) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj) || depth > 4) return undefined;
  const want = names.map(normKey);
  for (const k of Object.keys(obj)) {
    if (want.includes(normKey(k)) && obj[k] != null && obj[k] !== '') return obj[k];
  }
  for (const k of Object.keys(obj)) {
    const r = findKey(obj[k], names, depth + 1);
    if (r !== undefined) return r;
  }
  return undefined;
};

const findNum = (obj, names) => strictNum(findKey(obj, names));

// A count can be 49, "49", { count: 49 } or { questions: [...] }.
const countOf = (v) =>
  v && typeof v === 'object'
    ? strictNum(v.count ?? v.solved ?? v.problemsSolved ?? (Array.isArray(v.questions) ? v.questions.length : null))
    : strictNum(v);

const GFG_DIFF_META = [
  { key: 'school', label: 'School', color: '#a78bfa', names: ['school', 'schoolSolved', 'schoolProblemsSolved'] },
  { key: 'basic', label: 'Basic', color: '#60a5fa', names: ['basic', 'basicSolved', 'basicProblemsSolved'] },
  { key: 'easy', label: 'Easy', color: '#1CBABA', names: ['easy', 'easySolved', 'easyProblemsSolved'] },
  { key: 'medium', label: 'Medium', color: '#FFB800', names: ['medium', 'mediumSolved', 'mediumProblemsSolved'] },
  { key: 'hard', label: 'Hard', color: '#EF4743', names: ['hard', 'hardSolved', 'hardProblemsSolved'] },
];

// Used for "/", "/profile", "/stats" and the fallback API. Returns null if nothing useful was found.
const parseGfgSummary = (j) => {
  if (!j || typeof j !== 'object') return null;

  const diffs = {};
  for (const m of GFG_DIFF_META) {
    const n = countOf(findKey(j, m.names));
    if (n !== null) diffs[m.key] = n;
  }

  const diffSum = Object.values(diffs).reduce((a, b) => a + b, 0);
  const instituteRaw = findKey(j, ['institution', 'institute', 'college', 'organization']);

  const out = {
    solved:
      findNum(j, ['totalProblemsSolved', 'problemsSolved', 'totalSolved', 'solved']) ??
      (Object.keys(diffs).length ? diffSum : null),
    score: findNum(j, ['codingScore', 'overallCodingScore', 'score']),
    monthlyScore: findNum(j, ['monthlyCodingScore', 'monthlyScore']),
    streak: findNum(j, ['currentStreak', 'streak']),
    maxStreak: findNum(j, ['maxStreak', 'longestStreak']),
    instituteRank: findNum(j, ['instituteRank', 'collegeRank']),
    institute: typeof instituteRaw === 'string' ? instituteRaw : null,
    diffs,
  };

  const any =
    out.solved !== null ||
    out.score !== null ||
    out.streak !== null ||
    out.instituteRank !== null ||
    Object.keys(diffs).length > 0;
  return any ? out : null;
};

// First real value wins for every field; difficulty counts merge per key.
const mergeGfg = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  const out = { ...a, diffs: { ...b.diffs, ...a.diffs } };
  for (const k of Object.keys(b)) if (k !== 'diffs' && out[k] == null) out[k] = b[k];
  return out;
};

const toIsoDate = (key) => {
  if (/^\d{4}-\d{2}-\d{2}/.test(String(key))) return String(key).slice(0, 10);
  const n = strictNum(key);
  if (n !== null) return new Date(n * (n < 1e12 ? 1000 : 1)).toISOString().slice(0, 10);
  const d = new Date(key);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
};

// Accepts [{date,count}] or { "YYYY-MM-DD": n } (or unix-second keys). Returns [{date,count}] or null.
const parseGfgHeat = (j) => {
  const v = findKey(j, ['heatmap', 'submissionCalendar', 'calendar', 'activity']) ?? j;
  const acc = {};
  const add = (key, n) => {
    const date = toIsoDate(key);
    if (date && n > 0) acc[date] = (acc[date] ?? 0) + n;
  };

  if (Array.isArray(v)) {
    v.forEach((it) => {
      if (it && typeof it === 'object') {
        add(it.date ?? it.day ?? it.timestamp, strictNum(it.count ?? it.value ?? it.submissions ?? it.solved));
      }
    });
  } else if (v && typeof v === 'object') {
    Object.entries(v).forEach(([k, val]) => add(k, countOf(val)));
  }

  const days = Object.entries(acc)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return days.length ? days : null;
};

// Accepts [{topic,count}] or { "Arrays": 40, ... }. Returns [{name,n}] sorted desc, or null.
// Language tags GfG mixes into topics; they aren't DSA topics, so they are hidden.
const GFG_LANG_TAGS = new Set(['cpp', 'c', 'java', 'python', 'javascript', 'c#', 'csharp', 'php', 'go', 'kotlin', 'swift', 'scala', 'rust', 'ruby']);
// "two-pointer-algorithm" -> "Two Pointer Algorithm", "implementation" -> "Implementation".
const prettyTopic = (s) =>
  /[-_]/.test(s) || s === s.toLowerCase()
    ? s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : s;

const parseGfgTopics = (j) => {
  let v =
    findKey(j, ['topicAnalysis', 'topics', 'topicWise', 'topicWiseStats', 'topicStats']) ??
    (Array.isArray(j?.data) ? j.data : j);
  // Never treat a { data: [...] } wrapper as a topic called "data".
  if (v && !Array.isArray(v) && Array.isArray(v.data)) v = v.data;
  let list = [];
  if (Array.isArray(v)) {
    list = v.map((it) => ({
      name: it?.topic ?? it?.name ?? it?.tag ?? it?.title,
      n:
        strictNum(it?.count ?? it?.solved ?? it?.problemsSolved ?? it?.total) ??
        (Array.isArray(it?.questions) ? it.questions.length : null),
    }));
  } else if (v && typeof v === 'object') {
    list = Object.entries(v).map(([name, val]) => ({ name, n: Array.isArray(val) ? val.length : countOf(val) }));
  }
  list = list
    .filter((t) => typeof t.name === 'string' && t.n > 0 && !GFG_LANG_TAGS.has(t.name.toLowerCase()))
    .map((t) => ({ ...t, name: prettyTopic(t.name) }))
    .sort((a, b) => b.n - a.n);
  return list.length ? list : null;
};

// Every request runs in parallel; each one fills in whatever it can.
const GFG_JOBS = [
  { url: (u) => `${GFG_BASE}/${u}`, apply: (j, p) => ({ ...p, summary: mergeGfg(p.summary, parseGfgSummary(j)) }) },
  { url: (u) => `${GFG_BASE}/${u}/profile`, apply: (j, p) => ({ ...p, summary: mergeGfg(p.summary, parseGfgSummary(j)) }) },
  {
    url: (u) => `${GFG_BASE}/${u}/stats`,
    apply: (j, p) => ({ ...p, summary: mergeGfg(p.summary, parseGfgSummary(j)), topics: p.topicsFromEndpoint ? p.topics : parseGfgTopics(j) ?? p.topics }),
  },
  { url: GFG_FALLBACK, apply: (j, p) => ({ ...p, summary: mergeGfg(p.summary, parseGfgSummary(j)) }) },
  { url: (u) => `${GFG_BASE}/${u}/heatmap`, apply: (j, p) => ({ ...p, heat: p.heat ?? parseGfgHeat(j) }) },
  {
    url: (u) => `${GFG_BASE}/${u}/topics`,
    apply: (j, p) => {
      const parsed = parseGfgTopics(j);
      return parsed ? { ...p, topics: parsed, topicsFromEndpoint: true } : p;
    },
  },
];

// Combine two partial "extras" objects: keep the first real value for every field.
const mergeExtras = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  const out = { ...a };
  for (const k of Object.keys(b)) if (out[k] == null) out[k] = b[k];
  return out;
};

/* ------------------------------ LeetCode contest panel ------------- */
const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
const fullDate = (sec) =>
  sec ? new Date(sec * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;
const monthYear = (sec) =>
  sec ? new Date(sec * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null;

const CH_W = 520;
const CH_H = 110;
const CH_PX = 6;
const CH_PY = 14;

// Shape of LeetCode's contest-rating distribution (relative bar heights, low -> high rating).
// The API doesn't return the histogram, so the highlighted bar is placed from topPercentage.
const DIST = [10, 10, 10, 18, 42, 110, 86, 58, 38, 28, 20, 14, 10, 8, 8, 8, 8, 8, 8, 8];
const DIST_MAX = Math.max(...DIST);
const DIST_TOTAL = DIST.reduce((a, b) => a + b, 0);

const fmtDuration = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.round(sec % 60);
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const UP_COLOR = '#2CBB5D';
const DOWN_COLOR = '#EF4743';
const FLAT_COLOR = '#FFA116';
const trendColor = (dir) => (dir === 'UP' ? UP_COLOR : dir === 'DOWN' ? DOWN_COLOR : FLAT_COLOR);

const TrendArrow = ({ dir }) => {
  if (dir !== 'UP' && dir !== 'DOWN') return null;
  const up = dir === 'UP';
  return (
    <svg
      className="ct-arrow"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke={up ? '#2CBB5D' : '#EF4743'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={up ? 'Rating went up' : 'Rating went down'}
      role="img"
    >
      {up ? <path d="M6 18 L18 6 M8 6 H18 V16" /> : <path d="M6 6 L18 18 M18 8 V18 H8" />}
    </svg>
  );
};

const ContestPanel = ({ contest }) => {
  const {
    rating,
    attended,
    globalRanking,
    totalParticipants,
    topPercentage,
    points = [],
  } = contest;

  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);

  const chart = useMemo(() => {
    if (!Array.isArray(points) || points.length < 2) return null;

    const ratings = points.map((point) => point.rating).filter(Number.isFinite);
    if (ratings.length < 2) return null;

    const min = Math.min(...ratings);
    const max = Math.max(...ratings);
    const span = max - min || 1;
    const firstTime = points[0].time;
    const lastTime = points[points.length - 1].time;
    const useTime =
      points.every((point) => Number.isFinite(point.time)) &&
      lastTime > firstTime;

    const pts = points.map((point, index) => ({
      ...point,
      x:
        CH_PX +
        (useTime
          ? (point.time - firstTime) / (lastTime - firstTime)
          : index / (points.length - 1)) *
          (CH_W - 2 * CH_PX),
      y: CH_PY + (1 - (point.rating - min) / span) * (CH_H - 2 * CH_PY),
    }));

    const peak = pts.reduce((best, point) =>
      point.rating > best.rating ? point : best
    );

    return {
      pts,
      peak,
      segs: pts.slice(1).map((point, index) => {
        const previous = pts[index];
        const direction =
          point.rating > previous.rating
            ? 'UP'
            : point.rating < previous.rating
              ? 'DOWN'
              : 'FLAT';
        return {
          x1: previous.x,
          y1: previous.y,
          x2: point.x,
          y2: point.y,
          color: trendColor(direction),
        };
      }),
      from: monthYear(firstTime),
      to: monthYear(lastTime),
    };
  }, [points]);

  const hlIndex = useMemo(() => {
    if (topPercentage == null) return null;
    let accumulated = 0;
    for (let index = DIST.length - 1; index >= 0; index -= 1) {
      accumulated += DIST[index];
      if ((accumulated / DIST_TOTAL) * 100 >= topPercentage) return index;
    }
    return 0;
  }, [topPercentage]);

  const hoveredPoint =
    chart && hover !== null ? chart.pts[hover] ?? null : null;

  const changeAt = (index) => {
    const point = points[index];
    if (!point) return null;
    const previousRating = index > 0 ? points[index - 1].rating : 1500;
    return point.rating - previousRating;
  };

  const selectedIndex = hoveredPoint ? hover : points.length - 1;
  const selectedChange = changeAt(selectedIndex);
  const selectedDirection =
    selectedChange == null || Math.round(selectedChange) === 0
      ? null
      : selectedChange > 0
        ? 'UP'
        : 'DOWN';

  const pickNearest = (clientX) => {
    const svg = svgRef.current;
    if (!svg || !chart) return;

    const rect = svg.getBoundingClientRect();
    if (!rect.width) return;

    // Convert the pointer's screen position into the SVG viewBox coordinate system.
    const pointerX = ((clientX - rect.left) / rect.width) * CH_W;
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    chart.pts.forEach((point, index) => {
      const distance = Math.abs(point.x - pointerX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setHover(nearestIndex);
  };

  const onChartKeyDown = (event) => {
    if (!chart) return;
    const lastIndex = chart.pts.length - 1;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setHover((current) =>
        current === null ? 0 : Math.min(lastIndex, current + 1)
      );
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setHover((current) =>
        current === null ? lastIndex : Math.max(0, current - 1)
      );
    } else if (event.key === 'Escape') {
      setHover(null);
    }
  };

  const chipWidth = 42;
  const chipLeft = chart ? chart.peak.x > CH_W - chipWidth - 16 : false;
  const chipX = chart
    ? chipLeft
      ? chart.peak.x - chipWidth - 8
      : chart.peak.x + 8
    : 0;
  const chipY = chart ? chart.peak.y - 3 : 0;

  return (
    <div className="ct">
      <style>{`
        .ct { flex: 999 1 480px; min-width: 0; align-self: stretch; display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(210px, 1fr); margin-top: 6px; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; background: #262626; color: #fff; font-variant-numeric: tabular-nums; }
        .ct-left, .ct-right { padding: 16px 18px; min-width: 0; }
        .ct-right { display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.1); }
        .ct-head { display: flex; flex-wrap: nowrap; align-items: flex-start; gap: 10px 20px; min-height: 3.5rem; }
        .ct-col { min-width: 0; animation: ct-fade 140ms ease-out; }
        .ct-col.grow { flex: 0 1 auto; min-width: 0; }
        .ct-label { font-size: 0.78rem; line-height: 1.2; color: #a8a8a8; font-weight: 600; white-space: nowrap; }
        .ct-label.plain { font-weight: 400; }
        .ct-big { display: flex; align-items: center; gap: 6px; margin-top: 6px; font-size: 1.9rem; line-height: 1.1; font-weight: 400; letter-spacing: -0.02em; color: #fff; }
        .ct-arrow { flex: 0 0 auto; }
        .ct-delta { font-size: 0.9rem; font-weight: 600; letter-spacing: 0; }
        .ct-val { margin-top: 6px; font-size: 0.78rem; line-height: 1.2; font-weight: 700; color: #fff; white-space: nowrap; }
        .ct-val.title { overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
        .ct-val span { color: #7a7a7a; font-weight: 500; }
        .ct-chartwrap { margin-top: 12px; }
        .ct-chart { width: 100%; height: auto; display: block; overflow: visible; cursor: crosshair; touch-action: pan-y; border-radius: 6px; }
        .ct-chart:focus-visible { outline: 2px solid #e05a1c; outline-offset: 4px; }
        .ct-chip { transition: opacity 150ms ease; }
        .ct-axis { display: flex; justify-content: space-between; margin-top: 2px; font-size: 0.78rem; color: #a8a8a8; }
        .ct-top { margin-top: 0; }
        .ct-hist { display: grid; grid-template-columns: repeat(20, 1fr); gap: 4px; align-items: end; height: 120px; margin-top: auto; padding-top: 14px; }
        .ct-hist i { display: block; border-radius: 2px; background: #3a3a3a; min-height: 8px; }
        .ct-hist i.on { background: #FFA116; }
        @keyframes ct-fade { from { opacity: 0.35; } to { opacity: 1; } }
        @media (max-width: 760px) {
          .ct { grid-template-columns: 1fr; }
          .ct-right { border-left: 0; border-top: 1px solid rgba(255,255,255,0.1); min-height: 150px; }
        }
        @media (prefers-reduced-motion: reduce) { .ct-col { animation: none; } .ct-chip { transition: none; } }
      `}</style>

      <div className="ct-left">
        <div className="ct-head" role="status" aria-live="polite">
          <div className="ct-col" key={`rating-${hover}`}>
            <div className="ct-label">Contest Rating</div>
            <div className="ct-big">
              {fmtInt(hoveredPoint ? hoveredPoint.rating : rating)}
              {selectedDirection && (
                <>
                  <TrendArrow dir={selectedDirection} />
                  <span
                    className="ct-delta"
                    style={{ color: trendColor(selectedDirection) }}
                  >
                    {selectedChange > 0 ? '+' : '\u2212'}
                    {fmtInt(Math.abs(selectedChange))}
                  </span>
                </>
              )}
            </div>
          </div>

          {hoveredPoint ? (
            <>
              <div className="ct-col grow" key={`contest-${hover}`}>
                <div className="ct-label plain">
                  {fullDate(hoveredPoint.time) ?? 'Contest'}
                </div>
                <div
                  className="ct-val title"
                  title={hoveredPoint.title ?? ''}
                >
                  {hoveredPoint.title ?? 'Contest'}
                </div>
              </div>

              <div className="ct-col" key={`rank-${hover}`}>
                <div className="ct-label plain">Rank</div>
                <div className="ct-val">
                  {hoveredPoint.ranking == null
                    ? '—'
                    : fmtInt(hoveredPoint.ranking)}
                </div>
              </div>

              <div className="ct-col" key={`solved-${hover}`}>
                <div className="ct-label plain">Solved</div>
                <div className="ct-val">
                  {hoveredPoint.solved != null && hoveredPoint.total != null
                    ? `${hoveredPoint.solved} / ${hoveredPoint.total}`
                    : '—'}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="ct-col" key="global-ranking">
                <div className="ct-label plain">Global Ranking</div>
                <div className="ct-val">
                  {globalRanking == null ? '—' : fmtInt(globalRanking)}
                  {totalParticipants != null && (
                    <span>/{fmtInt(totalParticipants)}</span>
                  )}
                </div>
              </div>
              <div className="ct-col" key="attended">
                <div className="ct-label plain">Attended</div>
                <div className="ct-val">{attended ?? '—'}</div>
              </div>
            </>
          )}
        </div>

        {chart ? (
          <div className="ct-chartwrap">
            <svg
              ref={svgRef}
              className="ct-chart"
              viewBox={`0 0 ${CH_W} ${CH_H}`}
              role="img"
              tabIndex={0}
              aria-label={`Contest rating history across ${points.length} contests. Hover or use arrow keys to inspect contest details.`}
              onPointerMove={(event) => pickNearest(event.clientX)}
              onPointerDown={(event) => pickNearest(event.clientX)}
              onPointerLeave={() => setHover(null)}
              onKeyDown={onChartKeyDown}
              onBlur={() => setHover(null)}
            >
              {hoveredPoint && (
                <line
                  x1={hoveredPoint.x}
                  x2={hoveredPoint.x}
                  y1="0"
                  y2={CH_H}
                  stroke={trendColor(selectedDirection)}
                  strokeOpacity="0.85"
                  strokeWidth="1.2"
                />
              )}

              {chart.segs.map((segment, index) => (
                <line
                  key={`segment-${index}`}
                  x1={segment.x1}
                  y1={segment.y1}
                  x2={segment.x2}
                  y2={segment.y2}
                  stroke={hoveredPoint ? '#FFA116' : segment.color}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ))}

              {/* Each point is API-backed and independently hoverable. */}
              {chart.pts.map((point, index) => (
                <circle
                  key={`point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r={hover === index ? 5.5 : 3.5}
                  fill={hover === index ? '#FFA116' : '#fff'}
                  stroke={hover === index ? '#fff' : 'none'}
                  strokeWidth="1.4"
                  style={{ cursor: 'crosshair' }}
                />
              ))}

              {!hoveredPoint && (
                <g className="ct-chip" aria-hidden="true">
                  <rect
                    x={chipX}
                    y={chipY}
                    width={chipWidth}
                    height="19"
                    rx="5"
                    fill="#2b2b2b"
                    stroke="rgba(255,255,255,0.18)"
                  />
                  <text
                    x={chipX + chipWidth / 2}
                    y={chipY + 13}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#d0d0d0"
                  >
                    {fmtInt(chart.peak.rating)}
                  </text>
                </g>
              )}

              {hoveredPoint && (
                <circle
                  cx={hoveredPoint.x}
                  cy={hoveredPoint.y}
                  r="11"
                  fill="#FFA116"
                  fillOpacity="0.28"
                />
              )}
            </svg>

            {(chart.from || chart.to) && (
              <div className="ct-axis" aria-hidden="true">
                <span>{chart.from}</span>
                <span>{chart.to}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="cp-empty">
            Not enough contest history to display the rating graph.
          </div>
        )}
      </div>

      {topPercentage != null && (
        <div className="ct-right">
          <div className="ct-label plain">Top</div>
          <div className="ct-big ct-top">{topPercentage.toFixed(2)}%</div>
          <div
            className="ct-hist"
            role="img"
            aria-label={`Top ${topPercentage.toFixed(2)}% of contest participants`}
          >
            {DIST.map((height, index) => (
              <i
                key={index}
                className={index === hlIndex ? 'on' : ''}
                style={{ height: `${(height / DIST_MAX) * 100}%` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


/* ------------------------------ LeetCode ring ---------------------- */
const polarToCartesian = (cx, cy, r, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

// clockwise from a0 to a1 (0 degrees = top)
const describeArc = (cx, cy, r, a0, a1) => {
  const s = polarToCartesian(cx, cy, r, a0);
  const e = polarToCartesian(cx, cy, r, a1);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
};

const START = 225; // bottom-left
const SWEEP = 270; // open at the bottom
const GAP = 8;
const SEG = (SWEEP - GAP * 2) / 3;

// easy/medium/hard: { solved, total } where total may be null if no API supplied it.
const LeetCodeStats = ({ solved, totalQuestions, easy, medium, hard, extras, contest }) => {
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const diff = [
    { key: 'easy', color: '#1CBABA', label: 'Easy', value: easy },
    { key: 'medium', color: '#FFB800', label: 'Med.', value: medium },
    { key: 'hard', color: '#EF4743', label: 'Hard', value: hard },
  ];

  const active = diff.find((d) => d.key === focused);
  const center = active
    ? { n: active.value.solved, t: active.value.total, c: active.color }
    : { n: solved, t: totalQuestions, c: '#fff' };

  // Only show the details the API actually returned.
  const stats = [];
  if (extras) {
    // Rating and contest count live in the contest panel when it is available.
    if (!contest && extras.rating !== null) {
      stats.push({
        label: 'Contest rating',
        value: Math.round(extras.rating).toLocaleString('en-US'),
        sub: extras.peakRating !== null ? `Peak ${Math.round(extras.peakRating).toLocaleString('en-US')}` : null,
      });
    }
    if (!contest && extras.contests !== null) stats.push({ label: 'Contests', value: extras.contests });
    if (extras.activeDays !== null) stats.push({ label: 'Active days', value: extras.activeDays });
    if (extras.acceptance !== null) stats.push({ label: 'Acceptance', value: `${extras.acceptance.toFixed(1)}%` });
    if (extras.badges !== null) stats.push({ label: 'Badges', value: extras.badges });
    if (extras.ranking !== null && extras.ranking > 0) {
      stats.push({ label: 'Overall rank', value: extras.ranking.toLocaleString('en-US') });
    }
    if (extras.contributionPoints !== null) {
      stats.push({ label: 'Contribution points', value: extras.contributionPoints.toLocaleString('en-US') });
    }
    if (extras.reputation) {
      stats.push({ label: 'Reputation', value: extras.reputation });
    }
  }

  return (
    <div
      className="lc"
      role="group"
      aria-label={`${solved}${totalQuestions ? ` of ${totalQuestions}` : ''} problems solved: ${easy.solved} easy, ${medium.solved} medium, ${hard.solved} hard.`}
    >
      <div className="lc-ring">
        <svg viewBox="0 0 200 200" width="190" height="190" aria-hidden="true">
          {diff.map((d, i) => {
            const s = START + i * (SEG + GAP);
            const path = describeArc(100, 100, 80, s, s + SEG);
            // With totals: progress through that difficulty. Without: share of everything solved.
            const raw = d.value.total ? d.value.solved / d.value.total : solved ? d.value.solved / solved : 0;
            const p = Math.min(1, Math.max(0, raw));
            return (
              <g key={d.key} style={{ opacity: focused && focused !== d.key ? 0.4 : 1, transition: 'opacity 180ms' }}>
                <path d={path} fill="none" stroke={d.color} strokeOpacity="0.22" strokeWidth="6" strokeLinecap="round" />
                <path
                  d={path}
                  pathLength="1"
                  fill="none"
                  stroke={d.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${mounted ? p : 0} 1`}
                  opacity={mounted && p > 0 ? 1 : 0}
                  style={{ transition: reduce ? 'none' : 'stroke-dasharray 800ms ease-out' }}
                />
              </g>
            );
          })}
        </svg>

        <div className="lc-center">
          <div className="lc-num">
            <span style={{ color: center.c }}>{center.n}</span>
            {center.t ? <small>/{center.t}</small> : null}
          </div>
          <div className="lc-solved">
            <span aria-hidden="true">✓</span> Solved
          </div>
        </div>
      </div>

      <div className="lc-tiles">
        {diff.map((d) => (
          <div
            key={d.key}
            className="lc-tile"
            tabIndex={0}
            onMouseEnter={() => setFocused(d.key)}
            onMouseLeave={() => setFocused(null)}
            onFocus={() => setFocused(d.key)}
            onBlur={() => setFocused(null)}
            style={{ borderColor: focused === d.key ? d.color : undefined }}
          >
            <div style={{ color: d.color }} className="lc-tile-label">{d.label}</div>
            <div className="lc-tile-value">
              {d.value.total ? `${d.value.solved}/${d.value.total}` : d.value.solved}
            </div>
          </div>
        ))}
      </div>

      {contest && <ContestPanel contest={contest} />}

      {stats.length > 0 && (
        <div className="lc-extras">
          {stats.map((s) => (
            <div key={s.label} className="lc-stat">
              <div className="lc-stat-value">{s.value}</div>
              <div className="lc-stat-label">{s.label}</div>
              {s.sub && <div className="lc-stat-sub">{s.sub}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------ GitHub heatmap --------------------- */
const GH_API = 'https://github-contributions-api.jogruber.de/v4';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// days: [{date:'YYYY-MM-DD', count, level}] oldest -> newest. Build Sun..Sat columns.
const buildWeeks = (days) => {
  if (!days.length) return [];
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(pad).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
};

const getStats = (days) => {
  let total = 0, active = 0, streak = 0, max = 0;
  for (const d of days) {
    total += d.count;
    if (d.count > 0) {
      active += 1;
      streak += 1;
      if (streak > max) max = streak;
    } else {
      streak = 0;
    }
  }
  return { total, active, max };
};

// A label goes on the first week column of each month (skipped if too close to the previous one).
const getMonthLabels = (weeks) => {
  const labels = [];
  let prevMonth = -1;
  let lastCol = -10;
  weeks.forEach((week, i) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = Number(first.date.slice(5, 7)) - 1;
    if (m !== prevMonth) {
      if (i - lastCol >= 3) {
        labels.push({ col: i + 1, text: MONTHS[m] });
        lastCol = i;
      }
      prevMonth = m;
    }
  });
  return labels;
};

const GitHubHeatmap = ({ username, url, onStatus }) => {
  const [data, setData] = useState({ status: 'loading', days: [], years: [] });
  const [selected, setSelected] = useState('current');

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${GH_API}/${username}?y=all`, { signal: ctrl.signal });
        if (!res.ok) throw new Error('request failed');
        const json = await res.json();
        // y=all returns year blocks newest-first, so sort into true date order.
        const days = [...(json?.contributions ?? [])].sort((a, b) => a.date.localeCompare(b.date));
        if (!days.length) throw new Error('empty');
        const years = Object.keys(json.total ?? {}).sort((a, b) => b - a);
        setData({ status: 'ready', days, years });
      } catch (err) {
        if (err.name !== 'AbortError') setData({ status: 'error', days: [], years: [] });
      }
    })();
    return () => ctrl.abort();
  }, [username]);

  useEffect(() => {
    if (onStatus) onStatus(data.status);
  }, [data.status, onStatus]);

  const { weeks, stats, labels } = useMemo(() => {
    // Local date (not UTC) so today's contributions aren't cut off in your timezone.
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    // "Current" = the current calendar year, 1 Jan up to today.
    const year = selected === 'current' ? String(now.getFullYear()) : selected;
    // Never show future days.
    const selectedDays = data.days.filter((d) => d.date.startsWith(year) && d.date <= today);
    const w = buildWeeks(selectedDays);
    return { weeks: w, stats: getStats(selectedDays), labels: getMonthLabels(w) };
  }, [data.days, selected]);

  const periodText = selected === 'current' ? `in ${new Date().getFullYear()}` : `in ${selected}`;

  if (data.status === 'loading') return <div className="cp-empty">Loading contributions…</div>;

  if (data.status === 'error') {
    return (
      <div className="cp-empty">
        Contributions are unavailable right now.{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">View them on GitHub</a>.
      </div>
    );
  }

  return (
    <div className="ghm">
      <div className="ghm-top">
        <div className="ghm-title">
          <b>{stats.total.toLocaleString()}</b>
          contributions {periodText}
        </div>

        <div className="ghm-meta">
          <span>Total active days: <b>{stats.active}</b></span>
          <span>Max streak: <b>{stats.max}</b></span>
          <select
            className="ghm-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            aria-label="Select year"
          >
            <option value="current">Current</option>
            {data.years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ghm-scroll">
        <div className="ghm-inner">
          <div
            className="ghm-grid"
            role="img"
            aria-label={`GitHub contributions: ${stats.total} ${periodText}, ${stats.active} active days, longest streak ${stats.max} days`}
            style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
          >
            {weeks.flatMap((week, w) =>
              week.map((day, d) => (
                <span
                  key={`${w}-${d}`}
                  className={`ghm-cell ${day ? 'on' : ''}`}
                  title={day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined}
                  style={{ background: day ? HEAT[day.level] : 'transparent' }}
                />
              ))
            )}
          </div>

          <div className="ghm-months" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
            {labels.map((l) => (
              <span key={`${l.text}-${l.col}`} style={{ gridColumn: l.col }}>{l.text}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="ghm-legend" aria-hidden="true">
        Less {HEAT.map((c) => <i key={c} style={{ background: c }} />)} More
      </div>
    </div>
  );
};

/* ------------------------------ GfG widget ------------------------- */
const GfgHeatmap = ({ days }) => {
  const [selected, setSelected] = useState('current');
  const years = useMemo(
    () => [...new Set(days.map((d) => d.date.slice(0, 4)))].sort((a, b) => b - a),
    [days]
  );

  const { weeks, stats, labels } = useMemo(() => {
    const now = new Date();
    const year = selected === 'current' ? now.getFullYear() : Number(selected);
    const byDate = new Map(days.map((d) => [d.date, d.count]));
    const start = Date.UTC(year, 0, 1);
    const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const end = Math.min(Date.UTC(year, 11, 31), todayUtc);

    // The API usually lists only active days, so fill every day up to today.
    const filled = [];
    for (let t = start; t <= end; t += 86400000) {
      const date = new Date(t).toISOString().slice(0, 10);
      filled.push({ date, count: byDate.get(date) ?? 0 });
    }
    const max = Math.max(1, ...filled.map((d) => d.count));
    const leveled = filled.map((d) => {
      const r = d.count / max;
      return { ...d, level: d.count === 0 ? 0 : r <= 0.25 ? 1 : r <= 0.5 ? 2 : r <= 0.75 ? 3 : 4 };
    });

    const w = buildWeeks(leveled);
    return { weeks: w, stats: getStats(leveled), labels: getMonthLabels(w) };
  }, [days, selected]);

  const periodText = selected === 'current' ? `in ${new Date().getFullYear()}` : `in ${selected}`;

  return (
    <div className="ghm">
      <div className="ghm-top">
        <div className="ghm-title">
          <b>{stats.total.toLocaleString()}</b>
          submissions {periodText}
        </div>
        <div className="ghm-meta">
          <span>Total active days: <b>{stats.active}</b></span>
          <span>Max streak: <b>{stats.max}</b></span>
          <select
            className="ghm-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            aria-label="Select year"
          >
            <option value="current">Current</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ghm-scroll">
        <div className="ghm-inner">
          <div
            className="ghm-grid"
            role="img"
            aria-label={`GeeksforGeeks activity: ${stats.total} submissions ${periodText}, ${stats.active} active days`}
            style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
          >
            {weeks.flatMap((week, w) =>
              week.map((day, d) => (
                <span
                  key={`${w}-${d}`}
                  className={`ghm-cell ${day ? 'on' : ''}`}
                  title={day ? `${day.count} submission${day.count === 1 ? '' : 's'} on ${day.date}` : undefined}
                  style={{ background: day ? HEAT[day.level] : 'transparent' }}
                />
              ))
            )}
          </div>
          <div className="ghm-months" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
            {labels.map((l) => (
              <span key={`${l.text}-${l.col}`} style={{ gridColumn: l.col }}>{l.text}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="ghm-legend" aria-hidden="true">
        Less {HEAT.map((c) => <i key={c} style={{ background: c }} />)} More
      </div>
    </div>
  );
};

// Donut: each difficulty gets an arc proportional to how many problems were solved in it.
const GfgDifficulty = ({ solved, tiles, diffs, institute }) => {
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const total = tiles.reduce((s, m) => s + diffs[m.key], 0);
  const segs = tiles.filter((m) => diffs[m.key] > 0);
  const gapDeg = segs.length > 1 ? 10 : 0;
  const usable = 360 - gapDeg * segs.length;

  let cursor = 0;
  const arcs = segs.map((m) => {
    const sweep = Math.min(359.9, (diffs[m.key] / total) * usable);
    const a0 = cursor;
    cursor += sweep + gapDeg;
    return { ...m, path: describeArc(100, 100, 80, a0, a0 + sweep) };
  });

  const active = tiles.find((m) => m.key === focused);
  const centerN = active ? diffs[active.key] : solved;
  const centerColor = active ? active.color : '#fff';

  return (
    <div>
      <div className="gf-topics-head">
        <span>Solved by difficulty{institute ? ` · ${institute}` : ''}</span>
      </div>
      <div className="gf-diff">
        <div className="lc-ring">
          <svg viewBox="0 0 200 200" width="190" height="190" aria-hidden="true">
            {arcs.map((a) => (
              <g key={a.key} style={{ opacity: focused && focused !== a.key ? 0.35 : 1, transition: 'opacity 180ms' }}>
                <path
                  className="gf-arc"
                  d={a.path}
                  pathLength="1"
                  fill="none"
                  stroke={a.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${mounted ? 1 : 0} 1`}
                />
              </g>
            ))}
          </svg>
          <div className="lc-center">
            <div className="lc-num">
              <span style={{ color: centerColor }}>{centerN}</span>
            </div>
            <div className="lc-solved">
              <span aria-hidden="true">✓</span> Solved
            </div>
          </div>
        </div>

        <div className="gf-diff-tiles">
          {tiles.map((m) => (
            <div
              key={m.key}
              className="gf-tile"
              tabIndex={0}
              onMouseEnter={() => setFocused(m.key)}
              onMouseLeave={() => setFocused(null)}
              onFocus={() => setFocused(m.key)}
              onBlur={() => setFocused(null)}
              style={{ borderColor: focused === m.key ? m.color : undefined }}
            >
              <div className="gf-tile-label" style={{ color: m.color }}>{m.label}</div>
              <div className="gf-tile-value">
                {diffs[m.key]}
                {total > 0 && <span className="gf-tile-pct">{Math.round((diffs[m.key] / total) * 100)}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GfgStats = ({ summary, heat, topics }) => {
  const { solved, diffs } = summary;

  const tiles = GFG_DIFF_META.filter((m) => diffs[m.key] != null);

  const stats = [];
  if (summary.score != null) stats.push({ label: 'Coding score', value: fmtInt(summary.score) });
  if (summary.monthlyScore != null) stats.push({ label: 'Monthly score', value: fmtInt(summary.monthlyScore) });
  if (summary.streak != null) stats.push({ label: 'Current streak', value: summary.streak });
  if (summary.maxStreak != null) stats.push({ label: 'Max streak', value: summary.maxStreak });
  if (summary.instituteRank != null) stats.push({ label: 'Institute rank', value: fmtInt(summary.instituteRank) });

  const shown = topics ?? [];
  const maxTopic = topics?.[0]?.n ?? 1;

  return (
    <div className="gf">
      <div className="gf-top">
        <div className="gf-card">
          {tiles.length > 0 ? (
            <GfgDifficulty solved={solved} tiles={tiles} diffs={diffs} institute={summary.institute} />
          ) : (
            <>
              <div className="gf-solved-num">{solved}</div>
              <div className="gf-solved-label">
                problems solved{summary.institute ? ` · ${summary.institute}` : ''}
              </div>
            </>
          )}
        </div>

        {topics && (
          <div className="gf-card">
            <div className="gf-topics-head">
              <span>Topic-wise solved</span>
              <span>{topics.length} topics</span>
            </div>
            <div className="gf-topics-list">
              {shown.map((t) => (
                <div key={t.name} className="gf-trow">
                  <span className="gf-tname" title={t.name}>{t.name}</span>
                  <span className="gf-tbar"><i style={{ width: `${(t.n / maxTopic) * 100}%` }} /></span>
                  <span className="gf-tcount">{t.n}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div className="lc-extras">
          {stats.map((s) => (
            <div key={s.label} className="lc-stat">
              <div className="lc-stat-value">{s.value}</div>
              <div className="lc-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {heat && (
        <div className="gf-card">
          <GfgHeatmap days={heat} />
        </div>
      )}
    </div>
  );
};

/* ------------------------------ Main component --------------------- */
const CodingProfiles = () => {
  const { github, leetcode, gfg } = PROFILE_DATA;

  /* GitHub status (the heatmap fetches its own data) */
  const [ghStatus, setGhStatus] = useState('loading');

  /* LeetCode topic-wise skill statistics */
  const [lcTopicGroups, setLcTopicGroups] = useState([]);
  const [lcTopicsStatus, setLcTopicsStatus] = useState('loading');
  const [lcLanguages, setLcLanguages] = useState([]);
  const [lcLanguagesStatus, setLcLanguagesStatus] = useState('loading');

  useEffect(() => {
    const ctrl = new AbortController();

    const fetchTopics = async () => {
      try {
        const json = await fetchJson(LC_SKILL_URL(leetcode.username), ctrl.signal);
        const groups = parseLeetCodeTopics(json);

        if (!ctrl.signal.aborted) {
          setLcTopicGroups(groups);
          setLcTopicsStatus(groups.length ? 'ready' : 'empty');
        }
      } catch (err) {
        if (!ctrl.signal.aborted) setLcTopicsStatus('error');
      }
    };

    fetchTopics();
    return () => ctrl.abort();
  }, [leetcode.username]);

  useEffect(() => {
    const ctrl = new AbortController();
    const fetchLanguages = async () => {
      try {
        const json = await fetchJson(LC_LANGUAGE_URL(leetcode.username), ctrl.signal);
        const languages = parseLeetCodeLanguages(json);
        if (!ctrl.signal.aborted) {
          setLcLanguages(languages);
          setLcLanguagesStatus(languages.length ? 'ready' : 'empty');
        }
      } catch (err) {
        if (!ctrl.signal.aborted) setLcLanguagesStatus('error');
      }
    };
    fetchLanguages();
    return () => ctrl.abort();
  }, [leetcode.username]);

  /* LeetCode: merge whatever each API returns as it arrives */
  const [lcParts, setLcParts] = useState({ counts: null, totals: null, extras: null });
  const [lcDone, setLcDone] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    let pending = LC_URLS.length;

    LC_URLS.forEach(async (buildUrl) => {
      try {
        const part = parseLeetCode(await fetchJson(buildUrl(leetcode.username), ctrl.signal));
        if (part) {
          setLcParts((prev) => ({
            counts: prev.counts ?? part.counts,
            totals: prev.totals ?? part.totals,
            extras: mergeExtras(prev.extras, part.extras),
          }));
        }
      } catch (err) {
        /* a failing source is fine; the others may still answer */
      } finally {
        pending -= 1;
        if (pending === 0 && !ctrl.signal.aborted) setLcDone(true);
      }
    });

    return () => ctrl.abort();
  }, [leetcode.username]);

  const lcStatus = lcParts.counts ? 'ready' : lcDone ? 'error' : 'loading';

  const lcView = useMemo(() => {
    const { counts, totals, extras } = lcParts;
    if (!counts) return null;
    return {
      extras,
      solved: counts.solved,
      totalQuestions: totals?.all ?? null,
      easy: { solved: counts.easy, total: totals?.easy ?? null },
      medium: { solved: counts.medium, total: totals?.medium ?? null },
      hard: { solved: counts.hard, total: totals?.hard ?? null },
    };
  }, [lcParts]);

  /* LeetCode contest ranking + history (optional extra; the card works without it) */
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchJson(LC_CONTEST_URL(leetcode.username), ctrl.signal)
      .then((json) => {
        const parsed = parseContest(json);
        if (parsed && !ctrl.signal.aborted) setContestData(parsed);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [leetcode.username]);

  // Prefer the contest API; fall back to the rating fields from the stats API.
  const contest = useMemo(() => {
    const ex = lcParts.extras;
    const rating = contestData?.rating ?? ex?.rating ?? null;
    if (rating === null) return null;
    return {
      rating,
      attended: contestData?.attended ?? ex?.contests ?? null,
      globalRanking: contestData?.globalRanking ?? null,
      totalParticipants: contestData?.totalParticipants ?? null,
      topPercentage: contestData?.topPercentage ?? null,
      points: contestData?.points ?? [],
    };
  }, [contestData, lcParts.extras]);

  /* GeeksforGeeks: merge whatever each endpoint returns as it arrives */
  const [gfgParts, setGfgParts] = useState({ summary: null, heat: null, topics: null });
  const [gfgDone, setGfgDone] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    let pending = GFG_JOBS.length;

    GFG_JOBS.forEach(async (job) => {
      try {
        const json = await fetchJson(job.url(gfg.username), ctrl.signal);
        setGfgParts((prev) => job.apply(json, prev));
      } catch (err) {
        /* a failing endpoint is fine; the others may still answer */
      } finally {
        pending -= 1;
        if (pending === 0 && !ctrl.signal.aborted) setGfgDone(true);
      }
    });

    return () => ctrl.abort();
  }, [gfg.username]);

  const gfgView = useMemo(() => {
    const s = gfgParts.summary;
    if (!s || s.solved == null) return null;
    return s;
  }, [gfgParts.summary]);

  const gfgStatus = gfgView ? 'ready' : gfgDone ? 'error' : 'loading';

  const ghUrl = github.url;
  const lcUrl = `https://leetcode.com/u/${leetcode.username}/`;
  const gfgUrl = `https://www.geeksforgeeks.org/user/${gfg.username}/`;

  const Status = ({ state }) => (
    <span className={`cp-status ${state === 'ready' ? 'live' : ''}`}>
      {state === 'ready' && <span className="cp-dot" aria-hidden="true" />}
      {state === 'ready' ? 'Live' : state === 'loading' ? 'Loading' : 'Unavailable'}
    </span>
  );

  return (
    <section id="coding-profiles" className="cp-section">
      <style>{`
        .cp-section { position: relative; background: #050505; padding: 7rem 1.25rem 5rem; overflow: hidden; font-family: 'Manrope', system-ui, sans-serif; }
        .cp-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 62% 35%, rgba(224,90,28,0.18), transparent 32%); }
        .cp-shell { max-width: 1480px; margin: 0 auto; position: relative; z-index: 1; }

        .cp-header { text-align: center; margin-bottom: 2.4rem; }
        .cp-title { margin: 0 0 0.9rem; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.05; letter-spacing: -0.04em; color: #fff; font-family: 'Neue Machina', 'Manrope', sans-serif; }
        .cp-title span { color: #e05a1c; }
        .cp-sub { margin: 0 auto 1.2rem; max-width: 52ch; color: #b8b8b8; font-size: 1rem; line-height: 1.6; }
        .cp-divider { width: 56px; height: 3px; margin: 0 auto; background: #e05a1c; border-radius: 999px; }

        .cp-dashboard { border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; background: rgba(14,14,14,0.92); box-shadow: 0 35px 80px rgba(0,0,0,0.48); overflow: hidden; }
        .cp-dash-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.9rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.7); }
        .cp-dash-head::before { content: ''; width: 9px; height: 9px; border-radius: 50%; background: #f97316; box-shadow: 0 0 12px rgba(249,115,22,0.7); }

        .cp-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1rem; padding: 1rem; }
        .cp-panel { border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; background: rgba(255,255,255,0.02); padding: 1.1rem; min-width: 0; transition: border-color 180ms ease, box-shadow 180ms ease; }
        .cp-panel:hover, .cp-panel:focus-within { border-color: rgba(224,90,28,0.5); box-shadow: 0 18px 42px rgba(224,90,28,0.14); }
        .cp-panel.wide { grid-column: span 2; }

        .cp-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; margin-bottom: 1.1rem; }
        .cp-link { display: inline-flex; align-items: center; gap: 0.7rem; text-decoration: none; color: #fff; border-radius: 10px; }
        .cp-link:focus-visible { outline: 2px solid #e05a1c; outline-offset: 4px; }
        .cp-badge { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; font-size: 0.72rem; font-weight: 700; border: 1px solid; }
        .cp-name { font-weight: 700; font-size: 0.95rem; }
        .cp-handle { display: block; font-size: 0.75rem; color: #a8a8a8; font-weight: 500; }
        .cp-arrow { color: #a8a8a8; margin-left: 0.15rem; }
        .cp-link:hover .cp-arrow { color: #e05a1c; }

        .cp-status { display: inline-flex; align-items: center; gap: 0.45rem; border-radius: 999px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #b8b8b8; padding: 0.28rem 0.65rem; font-size: 0.72rem; font-weight: 600; white-space: nowrap; }
        .cp-status.live { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.25); color: #4ade80; }
        .cp-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 10px rgba(74,222,128,0.7); }

        .cp-metric { display: flex; align-items: baseline; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .cp-big { font-size: clamp(1.8rem, 3vw, 2.5rem); line-height: 1; color: #fff; font-family: 'Neue Machina', 'Manrope', sans-serif; letter-spacing: -0.04em; }
        .cp-label { margin-top: 0.35rem; font-size: 0.78rem; color: #b8b8b8; }

        .cp-empty { padding: 2.2rem 1rem; text-align: center; color: #b8b8b8; font-size: 0.9rem; border: 1px dashed rgba(255,255,255,0.12); border-radius: 12px; }
        .cp-empty a { color: #e05a1c; }

        /* GitHub heatmap */
        .ghm { color: #fff; font-variant-numeric: tabular-nums; }
        .ghm-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.8rem 1.5rem; margin-bottom: 1rem; }
        .ghm-title { font-size: 0.95rem; color: #b8b8b8; }
        .ghm-title b { font-size: 1.5rem; color: #fff; margin-right: 0.35rem; font-family: 'Neue Machina', 'Manrope', sans-serif; letter-spacing: -0.03em; }
        .ghm-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem 1.3rem; font-size: 0.8rem; color: #a8a8a8; }
        .ghm-meta b { color: #fff; }
        .ghm-select { appearance: none; background: rgba(255,255,255,0.06) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b8b8b8' stroke-width='3'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 0.65rem center; color: #fff; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 0.45rem 2rem 0.45rem 0.8rem; font: inherit; font-weight: 600; font-size: 0.82rem; cursor: pointer; }
        .ghm-select:hover { border-color: rgba(224,90,28,0.5); }
        .ghm-select:focus-visible { outline: 2px solid #e05a1c; outline-offset: 2px; }
        .ghm-select option { background: #1a1a1a; color: #fff; }

        .ghm-scroll { overflow-x: auto; padding-bottom: 6px; }
        .ghm-inner { min-width: 680px; }
        .ghm-grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 1fr); gap: 3px; align-items: stretch; }
        .ghm-cell { aspect-ratio: 1; border-radius: 3px; min-width: 0; border: 1px solid rgba(255,255,255,0.02); }
        .ghm-cell.on:hover { outline: 1px solid rgba(255,255,255,0.7); }
        .ghm-months { display: grid; gap: 3px; margin-top: 8px; font-size: 0.72rem; color: #a8a8a8; height: 1rem; }
        .ghm-months span { white-space: nowrap; }
        .ghm-legend { display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-top: 0.4rem; font-size: 0.7rem; color: #a8a8a8; }
        .ghm-legend i { width: 11px; height: 11px; border-radius: 3px; display: block; }

        /* LeetCode widget: ring | tiles | contest panel in one row */
        .lc { display: grid; grid-template-columns: 190px 210px minmax(0, 1fr); gap: 18px 20px; align-items: stretch; color: #fff; font-variant-numeric: tabular-nums; }
        .lc-ring { position: relative; width: 190px; height: 190px; align-self: center; filter: drop-shadow(0 0 20px rgba(245,166,35,0.07)); }
        .lc-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-bottom: 10px; }
        .lc-num { display: flex; align-items: baseline; gap: 3px; line-height: 1; }
        .lc-num span { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; }
        .lc-num small { font-size: 15px; color: #9a9a9a; }
        .lc-solved { margin-top: 8px; display: flex; align-items: center; gap: 6px; font-size: 16px; font-weight: 600; }
        .lc-solved span { color: #2CBB5D; }
        .lc-tiles { display: flex; flex-direction: column; justify-content: center; gap: 10px; min-width: 0; }
        .lc-tile { background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); border-radius: 10px; padding: 11px 16px; text-align: left; border: 1px solid rgba(255,255,255,0.06); transition: border-color 180ms, transform 180ms ease; }
        .lc-tile:hover { transform: translateY(-1px); }
        .lc-tile:focus-visible { outline: 2px solid #e05a1c; outline-offset: 2px; }
        .lc-tile-label { font-weight: 600; font-size: 14px; }
        .lc-tile-value { font-weight: 700; font-size: 15px; margin-top: 5px; }
        .lc-extras { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-top: 6px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); }
        .lc-stat { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 12px; text-align: center; min-width: 0; }
        .lc-stat-value { font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
        .lc-stat-label { margin-top: 3px; font-size: 0.72rem; color: #a8a8a8; }
        .lc-stat-sub { margin-top: 2px; font-size: 0.68rem; color: #8a8a8a; }

        /* LeetCode topic-wise solved statistics */
        .lc-topics { grid-column: 1 / -1; margin-top: 24px; padding: 18px; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; background: #262626; min-width: 0; }
        .lc-topics-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 20px; color: #fff; font-size: 0.9rem; font-weight: 700; }
        .lc-topics-header span:last-child { color: #ff8a4c; background: rgba(224,90,28,0.14); border: 1px solid rgba(224,90,28,0.38); border-radius: 999px; padding: 5px 11px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }
        .lc-category-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
        .lc-category-card { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; min-width: 0; padding: 15px 16px; text-align: left; color: #fff; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.09); border-radius: 11px; cursor: pointer; transition: border-color 160ms ease, background 160ms ease, transform 160ms ease; }
        .lc-category-card:hover { border-color: rgba(224,90,28,0.55); background: rgba(224,90,28,0.07); transform: translateY(-1px); }
        .lc-category-card:focus-visible, .lc-topic-modal-close:focus-visible { outline: 2px solid #e05a1c; outline-offset: 3px; }
        .lc-category-card-name { color: #ff7840; font-size: 0.9rem; font-weight: 700; text-transform: capitalize; }
        .lc-category-card-count { color: #72c7ff; background: rgba(48,145,210,0.14); border: 1px solid rgba(72,170,230,0.32); border-radius: 999px; padding: 3px 9px; font-size: 0.68rem; font-weight: 700; }
        .lc-category-card-action { margin-top: 3px; color: #aaa; font-size: 0.72rem; }
        .lc-topic-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); column-gap: 28px; row-gap: 13px; }
        .lc-topic-modal-backdrop { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,0.72); backdrop-filter: blur(5px); }
        .lc-topic-modal { width: min(900px, 100%); max-height: min(78vh, 760px); overflow: auto; padding: 22px; color: #fff; background: #222; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; box-shadow: 0 24px 80px rgba(0,0,0,0.55); }
        .lc-topic-modal-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
        .lc-topic-modal-header h3 { margin: 0 0 7px; color: #ff7840; font-size: 1.15rem; font-weight: 750; text-transform: capitalize; }
        .lc-topic-modal-header span { color: #72c7ff; font-size: 0.75rem; }
        .lc-topic-modal-close { display: grid; place-items: center; width: 34px; height: 34px; flex: 0 0 auto; color: #ddd; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 9px; font-size: 1.4rem; line-height: 1; cursor: pointer; }
        .lc-topic-modal-close:hover { color: #fff; background: rgba(224,90,28,0.2); border-color: rgba(224,90,28,0.45); }
        .lc-topic-row { display: grid; grid-template-columns: minmax(100px, 150px) minmax(50px, 1fr) 34px; align-items: center; gap: 10px; min-width: 0; }
        .lc-topic-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #c4c4c4; font-size: 0.76rem; }
        .lc-topic-progress { height: 6px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,0.08); }
        .lc-topic-progress-fill { height: 100%; border-radius: inherit; background: #e05a1c; transition: width 500ms ease; }
        .lc-topic-count { color: #fff; text-align: right; font-size: 0.76rem; font-weight: 700; font-variant-numeric: tabular-nums; }
        @media (max-width: 520px) { .lc-topics { padding: 14px; } .lc-topic-row { grid-template-columns: minmax(85px, 115px) minmax(35px, 1fr) 28px; gap: 7px; } .lc-topic-modal { padding: 16px; } .lc-category-cards { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .lc-topic-progress-fill { transition: none; } }

        /* LeetCode language-wise solved statistics */
        .lc-languages { grid-column: 1 / -1; margin-top: 16px; padding: 18px; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; background: #262626; min-width: 0; }
        .lc-languages-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; color: #fff; font-size: 0.9rem; font-weight: 700; }
        .lc-languages-header span:last-child { color: #72c7ff; background: rgba(48,145,210,0.14); border: 1px solid rgba(72,170,230,0.32); border-radius: 999px; padding: 5px 10px; font-size: 0.72rem; }
        .lc-language-summary { display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px; }
        .lc-language-summary strong { color: #fff; font-size: 1.25rem; }
        .lc-language-summary span { color: #999; font-size: 0.72rem; }
        .lc-language-chart-layout { display: flex; align-items: center; justify-content: center; gap: clamp(24px, 6vw, 64px); padding: 8px 0 4px; }
        .lc-language-pie { width: 190px; height: 190px; flex: 0 0 190px; border-radius: 50%; display: grid; place-items: center; position: relative; }
        .lc-language-pie-center { width: 112px; height: 112px; border-radius: 50%; background: #262626; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .lc-language-pie-center strong { color: #fff; font-size: 1.35rem; font-variant-numeric: tabular-nums; }
        .lc-language-pie-center span { color: #999; font-size: 0.7rem; }
        .lc-language-legend { display: grid; gap: 13px; min-width: min(100%, 260px); }
        .lc-language-legend-row { display: grid; grid-template-columns: 9px minmax(80px, 1fr) auto auto; align-items: center; gap: 9px; }
        .lc-language-dot { width: 9px; height: 9px; border-radius: 50%; }
        .lc-language-name { color: #c4c4c4; font-size: 0.8rem; }
        .lc-language-count { color: #fff; text-align: right; font-size: 0.8rem; font-variant-numeric: tabular-nums; }
        .lc-language-percent { min-width: 48px; color: #8e8e8e; text-align: right; font-size: 0.72rem; font-variant-numeric: tabular-nums; }
        @media (max-width: 520px) { .lc-languages { padding: 14px; } .lc-language-chart-layout { flex-direction: column; gap: 22px; } .lc-language-pie { width: 170px; height: 170px; flex-basis: 170px; } .lc-language-pie-center { width: 100px; height: 100px; } .lc-language-legend { width: 100%; } }

        .cp-chip { display: inline-block; border-radius: 999px; border: 1px solid rgba(52,211,153,0.3); background: rgba(52,211,153,0.08); color: #6ee7b7; padding: 0.3rem 0.7rem; font-size: 0.75rem; font-weight: 600; }

        /* GeeksforGeeks widget */
        .gf { display: flex; flex-direction: column; gap: 18px; color: #fff; font-variant-numeric: tabular-nums; }
        .gf-top { display: grid; grid-template-columns: minmax(300px, 1fr) minmax(0, 2fr); gap: 18px; align-items: stretch; }
        .gf-card { border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; background: #262626; padding: 16px 18px; min-width: 0; }
        .gf-solved-num { font-size: 2.6rem; line-height: 1; letter-spacing: -0.04em; font-family: 'Neue Machina', 'Manrope', sans-serif; }
        .gf-solved-label { margin-top: 6px; font-size: 0.78rem; color: #a8a8a8; }
        .gf-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 10px; margin-top: 16px; }
        .gf-tile { background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 14px; }
        .gf-tile-label { font-weight: 600; font-size: 13px; }
        .gf-tile-value { font-weight: 700; font-size: 15px; margin-top: 4px; }
        .gf-topics-head { display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: #a8a8a8; margin-bottom: 6px; }
        .gf-toggle { background: none; border: 0; padding: 0; color: #e05a1c; font: inherit; font-weight: 600; cursor: pointer; }
        .gf-toggle:focus-visible { outline: 2px solid #e05a1c; outline-offset: 2px; border-radius: 4px; }
        .gf-topics-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0 32px; }
        .gf-trow { display: grid; grid-template-columns: minmax(90px, 150px) 1fr 34px; gap: 10px; align-items: center; margin-top: 8px; font-size: 0.78rem; }
        .gf-tname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #d0d0d0; }
        .gf-tbar { height: 6px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .gf-tbar i { display: block; height: 100%; border-radius: 999px; background: #34d399; }
        .gf-tcount { text-align: right; font-weight: 700; }
        .gf-diff { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 18px 24px; }
        .gf-diff-tiles { display: flex; flex-direction: column; gap: 8px; flex: 1 1 140px; min-width: 140px; max-width: 240px; }
        .gf-tile { transition: border-color 180ms, transform 180ms ease; }
        .gf-tile:hover { transform: translateY(-1px); }
        .gf-tile:focus-visible { outline: 2px solid #e05a1c; outline-offset: 2px; }
        .gf-tile-pct { margin-left: 6px; font-size: 12px; font-weight: 500; color: #7a7a7a; }
        .gf-arc { transition: stroke-dasharray 800ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .gf-arc { transition: none; } }

        @media (max-width: 1100px) {
          .lc { grid-template-columns: 190px minmax(0, 1fr); }
          .ct { grid-column: 1 / -1; }
        }
        @media (max-width: 820px) {
          .cp-grid { grid-template-columns: 1fr; }
          .cp-panel.wide { grid-column: span 1; }
          .gf-top { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cp-panel { transition: none; }
        }
      `}</style>

      <div className="cp-glow" aria-hidden="true" />

      <div className="cp-shell">
        <div className="cp-header">
          <h2 className="cp-title">Coding <span>Profiles</span></h2>
          <p className="cp-sub">Where I practice DSA and ship code.</p>
          <div className="cp-divider" />
        </div>

        <div className="cp-dashboard">
          <div className="cp-dash-head">Coding activity</div>

          <div className="cp-grid">
            {/* GitHub */}
            <article className="cp-panel wide">
              <div className="cp-panel-head">
                <a className="cp-link" href={ghUrl} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile">
                  <span className="cp-badge" style={{ color: '#f97316', background: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.4)' }}>GH</span>
                  <span>
                    <span className="cp-name">GitHub <span className="cp-arrow" aria-hidden="true">↗</span></span>
                    <span className="cp-handle">@{github.username}</span>
                  </span>
                </a>
                <Status state={ghStatus} />
              </div>

              <GitHubHeatmap username={github.username} url={ghUrl} onStatus={setGhStatus} />
            </article>

            {/* LeetCode */}
            <article className="cp-panel wide">
              <div className="cp-panel-head">
                <a className="cp-link" href={lcUrl} target="_blank" rel="noopener noreferrer" aria-label="Open LeetCode profile">
                  <span className="cp-badge" style={{ color: '#f5a623', background: 'rgba(245,166,35,0.1)', borderColor: 'rgba(245,166,35,0.4)' }}>LC</span>
                  <span>
                    <span className="cp-name">LeetCode <span className="cp-arrow" aria-hidden="true">↗</span></span>
                    <span className="cp-handle">@{leetcode.username}</span>
                  </span>
                </a>
                <Status state={lcStatus} />
              </div>

              {lcStatus === 'ready' && <LeetCodeStats {...lcView} contest={contest} />}
              {lcStatus === 'loading' && <div className="cp-empty">Loading LeetCode stats…</div>}

              {lcTopicsStatus === 'loading' && (
                <div className="cp-empty">Loading topic-wise statistics…</div>
              )}
              {lcTopicsStatus === 'ready' && (
                <LeetCodeTopics groups={lcTopicGroups} />
              )}
              {lcTopicsStatus === 'empty' && (
                <div className="cp-empty">No topic-wise statistics were returned by the API.</div>
              )}
              {lcTopicsStatus === 'error' && (
                <div className="cp-empty">Topic-wise statistics are unavailable right now.</div>
              )}
              {lcLanguagesStatus === 'loading' && (
                <div className="cp-empty">Loading language-wise statistics…</div>
              )}
              {lcLanguagesStatus === 'ready' && <LeetCodeLanguages languages={lcLanguages} />}
              {lcLanguagesStatus === 'empty' && (
                <div className="cp-empty">No language-wise statistics were returned by the API.</div>
              )}
              {lcLanguagesStatus === 'error' && (
                <div className="cp-empty">Language-wise statistics are unavailable right now.</div>
              )}
              {lcStatus === 'error' && (
                <div className="cp-empty">
                  Stats are unavailable right now.{' '}
                  <a href={lcUrl} target="_blank" rel="noopener noreferrer">View them on LeetCode</a>.
                </div>
              )}
            </article>

            {/* GeeksforGeeks */}
            <article className="cp-panel wide">
              <div className="cp-panel-head">
                <a className="cp-link" href={gfgUrl} target="_blank" rel="noopener noreferrer" aria-label="Open GeeksforGeeks profile">
                  <span className="cp-badge" style={{ color: '#34d399', background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.4)' }}>GfG</span>
                  <span>
                    <span className="cp-name">GeeksforGeeks <span className="cp-arrow" aria-hidden="true">↗</span></span>
                    <span className="cp-handle">@{gfg.username}</span>
                  </span>
                </a>
                <Status state={gfgStatus} />
              </div>

              {gfgStatus === 'ready' && (
                <GfgStats summary={gfgView} heat={gfgParts.heat} topics={gfgParts.topics} />
              )}
              {gfgStatus === 'loading' && <div className="cp-empty">Loading GeeksforGeeks stats…</div>}
              {gfgStatus === 'error' && (
                <div className="cp-empty">
                  Stats are unavailable right now.{' '}
                  <a href={gfgUrl} target="_blank" rel="noopener noreferrer">View them on GeeksforGeeks</a>.
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;