// import React, { useState } from "react";
// import "./ProjectAssign.css";

// interface Project {
//   id: string;
//   name: string;
// }

// interface User {
//   id: string;
//   name: string;
// }

// interface ProjectAssignmentFormData {
//   PROJECT_ID: string;
//   USER_IDS: string[];
//   START_DATE?: string;
//   END_DATE?: string;
// }

// const CreateProjectAssignmentForm: React.FC<{
//   projects: Project[];
//   users: User[];
// }> = ({ projects, users }) => {
//   const [formData, setFormData] = useState<ProjectAssignmentFormData>({
//     PROJECT_ID: "",
//     USER_IDS: [],
//     START_DATE: "",
//     END_DATE: "",
//   });

//   const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, PROJECT_ID: e.target.value });
//   };

//   const handleAddUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedUser = e.target.value;
//     if (selectedUser && !formData.USER_IDS.includes(selectedUser)) {
//       setFormData({
//         ...formData,
//         USER_IDS: [...formData.USER_IDS, selectedUser],
//       });
//     }
//     e.target.value = ""; // reset dropdown
//   };

//   const handleRemoveUser = (userId: string) => {
//     setFormData({
//       ...formData,
//       USER_IDS: formData.USER_IDS.filter((id) => id !== userId),
//     });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="form-container">
//       <h2>Create Project Assignment</h2>

//       {/* Project Dropdown */}
//       <div className="form-group">
//         <label>Project</label>
//         <select value={formData.PROJECT_ID} onChange={handleProjectChange} required>
//           <option value="">-- Select a project --</option>
//           {projects.map((project) => (
//             <option key={project.id} value={project.id}>
//               {project.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* User Dropdown with Tag Display */}
//       <div className="form-group">
//         <label>Assign to Users</label>
//         <select onChange={handleAddUser}>
//           <option value="">-- Select a user --</option>
//           {users
//             .filter((u) => !formData.USER_IDS.includes(u.id))
//             .map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//         </select>

//         {/* Display selected users as tags */}
//         <div className="selected-users">
//           {formData.USER_IDS.map((id) => {
//             const user = users.find((u) => u.id === id);
//             return (
//               <span key={id} className="user-tag">
//                 {user?.name}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveUser(id)}
//                   className="remove-btn"
//                 >
//                   ×
//                 </button>
//               </span>
//             );
//           })}
//         </div>
//       </div>

//       {/* Start Date */}
//       <div className="form-group">
//         <label>Start Date</label>
//         <input
//           type="date"
//           name="START_DATE"
//           value={formData.START_DATE}
//           onChange={handleChange}
//         />
//       </div>

//       {/* End Date */}
//       <div className="form-group">
//         <label>End Date</label>
//         <input
//           type="date"
//           name="END_DATE"
//           value={formData.END_DATE}
//           onChange={handleChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default CreateProjectAssignmentForm;
"use client"

import type React from "react"
import { useState } from "react"
import "./ProjectAssign.css"
import DatePicker from "./date-picker"
 // Import the new DatePicker component

interface Project {
  id: string
  name: string
}

interface User {
  id: string
  name: string
}

interface ProjectAssignmentFormData {
  PROJECT_ID: string
  USER_IDS: string[]
  START_DATE?: string
  END_DATE?: string
}

const CreateProjectAssignmentForm: React.FC<{
  projects: Project[]
  users: User[]
}> = ({ projects, users }) => {
  const [formData, setFormData] = useState<ProjectAssignmentFormData>({
    PROJECT_ID: "",
    USER_IDS: [],
    START_DATE: "",
    END_DATE: "",
  })

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, PROJECT_ID: e.target.value })
  }

  const handleAddUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = e.target.value
    if (selectedUser && !formData.USER_IDS.includes(selectedUser)) {
      setFormData({
        ...formData,
        USER_IDS: [...formData.USER_IDS, selectedUser],
      })
    }
    e.target.value = "" // reset dropdown
  }

  const handleRemoveUser = (userId: string) => {
    setFormData({
      ...formData,
      USER_IDS: formData.USER_IDS.filter((id) => id !== userId),
    })
  }

  // Modified handleChange to handle date changes from DatePicker
  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data Submitted:", formData)
    alert("Form submitted! Check console for data.")
  }

  return (
    <div className="form-container">
      <h2>Create Project Assignment</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Dropdown */}
        <div className="form-group">
          <label htmlFor="project-select">Project</label>
          <select id="project-select" value={formData.PROJECT_ID} onChange={handleProjectChange} required>
            <option value="">-- Select a project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* User Dropdown with Tag Display */}
        <div className="form-group">
          <label htmlFor="user-select">Assign to Users</label>
          <select onChange={handleAddUser} id="user-select">
            <option value="">-- Select a user --</option>
            {users
              .filter((u) => !formData.USER_IDS.includes(u.id))
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>

          {/* Display selected users as tags */}
          <div className="selected-users">
            {formData.USER_IDS.length === 0 && <span className="placeholder-text">No users selected</span>}
            {formData.USER_IDS.map((id) => {
              const user = users.find((u) => u.id === id)
              return (
                <span key={id} className="user-tag">
                  {user?.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(id)}
                    className="remove-btn"
                    aria-label={`Remove ${user?.name}`}
                  >
                    &times;
                  </button>
                </span>
              )
            })}
          </div>
        </div>

        {/* Start Date - Using the new DatePicker component */}
        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            id="start-date"
            name="START_DATE"
            value={formData.START_DATE}
            onChange={(date) => handleChange("START_DATE", date)}
          />
        </div>

        {/* End Date - Using the new DatePicker component */}
        <div className="form-group">
          <label htmlFor="end-date">End Date</label>
          <DatePicker
            id="end-date"
            name="END_DATE"
            value={formData.END_DATE}
            onChange={(date) => handleChange("END_DATE", date)}
          />
        </div>

        <button type="submit" className="submit-button">
          Create Assignment
        </button>
      </form>
    </div>
  )
}

export default CreateProjectAssignmentForm
