// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateTeamForm.css';

// interface TeamForm {
//   name: string;
//   description?: string;
//   is_active: boolean; // matches Prisma model
// }

// const CreateTeamForm: React.FC = () => {
//   const [formData, setFormData] = useState<TeamForm>({
//     name: '',
//     description: '',
//     is_active: true,
//   });

//   // Handle input change with checkbox support
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
//       setFormData({ ...formData, [name]: e.target.checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/teams', formData);
//       alert('✅ Team created successfully!');
//       setFormData({ name: '', description: '', is_active: true });
//     } catch (error) {
//       console.error(error);
//       alert('❌ Error creating team');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="team-form">
//       <h2>Create Team</h2>

//       <label>
//         Team Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Description:
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </label>

//       <label className="checkbox-label">
//         Active:
//         <input
//           type="checkbox"
//           name="is_active"
//           checked={formData.is_active}
//           onChange={handleChange}
//         />
//       </label>

//       <button type="submit">Create Team</button>
//     </form>
//   );
// };

// export default CreateTeamForm;

import React, { useState } from 'react';
import axios from 'axios';
import './CreateTeamForm.css';

interface TeamForm {
  name: string;
  description?: string;
  is_active: boolean; // matches Prisma model
}

const CreateTeamForm: React.FC = () => {
  const [formData, setFormData] = useState<TeamForm>({
    name: '',
    description: '',
    is_active: true,
  });

  // Handle input change with checkbox support
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/teams', formData);
      alert('✅ Team created successfully!');
      setFormData({ name: '', description: '', is_active: true });
    } catch (error) {
      console.error(error);
      alert('❌ Error creating team');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="team-form">
      <h2 className="form-title">Create Team</h2>

      <label className="form-label">
        Team Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
        />
      </label>

      <label className="checkbox-label">
        Active:
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
          className="form-checkbox"
        />
      </label>

      <button type="submit" className="submit-btn">Create Team</button>
    </form>
  );
};

export default CreateTeamForm;
