import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Schedule from "./pages/Schedule"
import Resources from "./pages/Resources"
import Timer from "./pages/Timer"
import Seminar from "./pages/Seminar"
import TutorialView from "./pages/TutorialView"
import AlgorithmSetView from "./pages/AlgorithmSetView"
import QuizView from "./pages/QuizView"
import VideoView from "./pages/VideoView"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Copyright from "./pages/Copyright"
import { SolveProvider } from "./contexts/SolveContext"

function App() {
  return (
    <Router>
      <SolveProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/tutorial/:slug" element={<TutorialView />} />
            <Route path="/resources/algorithms/:set" element={<AlgorithmSetView />} />
            <Route path="/resources/quiz/:quizId" element={<QuizView />} />
            <Route path="/resources/video/:videoId" element={<VideoView />} />
            <Route path="/seminar/:id" element={<Seminar />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/copyright" element={<Copyright />} />
          </Routes>
        </Layout>
      </SolveProvider>
    </Router>
  )
}

export default App
