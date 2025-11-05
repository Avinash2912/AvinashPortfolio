# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Note about a dependency fix

During install a peer dependency conflict between `postprocessing` and `three` was encountered on 2025-11-05. `postprocessing@^6.37.8` requires `three` < 0.181.0; the project had `three@^0.181.0`.

To resolve this, `three` was changed to `^0.180.0` in `package.json`. After the change `npm install` and `npm run build` were successful.

If you intentionally need `three@0.181.x`, consider upgrading `postprocessing` to a version that supports it or use an install-time flag (`--legacy-peer-deps`) at your own risk.
