import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateProjectForm from './components/CreateProjectForm';
import CreateTeamForm from './components/CreateTeamForm';
import ProjectAssign from './components/ProjectAssign';
import TeamList from './components/TeamList';
import ProjectForm from './components/ProjectForm';
import ProjectCards from './components/ProjectList';

function App() {
  return (
    <div className="App">
     <h1>Create Project</h1>
      <CreateProjectForm />
      {/* <CreateTeamForm /> */}
      {/* <TeamList /> */}
      {/* <ProjectAssign projects={[]} users={[]} /> */}

      {/* <ProjectAssign
  projects={[
    { id: "p1", name: "Website Redesign" },
    { id: "p2", name: "Mobile App Development" },
     { id: "p2", name: " App Development" }
  ]}
  users={[
    { id: "u1", name: "Tamanna Thakur" },
    { id: "u2", name: "Rahul Sharma" }
  ]}
/> */}

{/* <ProjectCards /> */}
    </div>
  );
}

export default App;
