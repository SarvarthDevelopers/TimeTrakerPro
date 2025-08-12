// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./TeamList.css";

// interface Team {
//   id: string;
//   name: string;
//   description?: string;
//   is_active: boolean;
// }

// const TeamList: React.FC = () => {
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch teams from API
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/teams");
//         setTeams(response.data);
//       } catch (error) {
//         console.error("Error fetching teams:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeams();
//   }, []);

//   if (loading) {
//     return <p className="loading-text">Loading teams...</p>;
//   }

//   return (
//     <div className="team-list-container">
//       <h2 className="team-list-title">Teams</h2>
//       <div className="team-grid">
//         {teams.length > 0 ? (
//           teams.map((team) => (
//             <div key={team.id} className="team-card">
//               <h3 className="team-name">{team.name}</h3>
//               <p className="team-description">
//                 {team.description || "No description available"}
//               </p>
//               <span
//                 className={`team-status ${team.is_active ? "active" : "inactive"}`}
//               >
//                 {team.is_active ? "Active" : "Inactive"}
//               </span>
//             </div>
//           ))
//         ) : (
//           <p className="no-data-text">No teams found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeamList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TeamList.css";

interface Team {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:3000/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete team
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await axios.delete(`http://localhost:3000/teams/${id}`);
      setTeams((prev) => prev.filter((team) => team.id !== id)); // remove from UI
      alert("🗑️ Team deleted successfully!");
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("❌ Failed to delete team");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading teams...</p>;
  }

  return (
    <div className="team-list-container">
      <h2 className="team-list-title">Teams</h2>
      <div className="team-grid">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="team-card">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-description">
                {team.description || "No description available"}
              </p>
              <span
                className={`team-status ${team.is_active ? "active" : "inactive"}`}
              >
                {team.is_active ? "Active" : "Inactive"}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(team.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-data-text">No teams found.</p>
        )}
      </div>
    </div>
  );
};

export default TeamList;
