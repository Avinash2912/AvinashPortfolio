import { Navbar } from "./Components/Navbar";
import { Hero } from "./Components/Hero";
import { Experience } from "./Components/Experience";
import About from "./Components/About";
import Education from "./Components/Education";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import CodingProfiles from "./Components/CodingProfiles";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  return (
    <>
    <div>
    <Navbar />
    <Hero />
    </div>

    <About />
    <Education />
    <Experience />
    <Skills />
    <Projects />
    <CodingProfiles />
    <Footer />
    </>
  );
}

export default App;
