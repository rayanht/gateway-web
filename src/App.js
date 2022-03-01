import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./layout/Header/Header";
import ProfileUpdate from "./components/profileUpdate/ProfileUpdate";
import AddAbout from "./components/addAbout/AddAbout";
import AddExperience from "./components/addExperience/AddExperience";
import AddLanguage from "./components/addLanguage/AddLanguage";
import AddSkill from "./components/addSkill/AddSkill";
import CompleteProfile from "./components/completeProfile/CompleteProfile";
import AddKnowledge from "./components/addKnowledge/AddKnowledge";
import AddAttitude from "./components/addAttitude/AddAttitude";

// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
function App() {
  return (
    <Router>
      <div className="main-outer">
        <Header />
        <Routes>
            <Route exact path="/" element={<ProfileUpdate />}></Route>
            <Route exact path="/add-about" element={<AddAbout />}></Route>
            <Route exact path="/add-experience" element={<AddExperience />}></Route>
            <Route exact path="/add-language" element={<AddLanguage />}></Route>
            <Route exact path="/add-skills" element={<AddSkill />}></Route>
            <Route exact path="/add-knowledge" element={<AddKnowledge />}></Route>
            <Route exact path="/add-attitude" element={<AddAttitude />}></Route>
            <Route exact path="/complete-profile" element={<CompleteProfile />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
