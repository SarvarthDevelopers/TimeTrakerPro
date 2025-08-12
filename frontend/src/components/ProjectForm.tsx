import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateProjectForm.css';
// import ProjectList from './ProjectList';

interface Project {
  id: string;
  name: string;
  description?: string;
  clientName?: string;
  budgetHours?: number;
  isBillable: boolean;
  isArchived: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

const ProjectForm: React.FC = () => {
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    clientName: '',
    budgetHours: 0,
    isBillable: true,
    isArchived: false,
    startDate: '',
    endDate: '',
  });
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3000/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, type } = target;
    const value =
      type === 'checkbox' && target instanceof HTMLInputElement
        ? target.checked
        : target.value;
    setCreateFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/projects', {
        ...createFormData,
        budgetHours: Number(createFormData.budgetHours),
        startDate: createFormData.startDate ? new Date(createFormData.startDate) : null,
        endDate: createFormData.endDate ? new Date(createFormData.endDate) : null,
      });
      alert('Project created successfully!');
      setCreateFormData({
        name: '',
        description: '',
        clientName: '',
        budgetHours: 0,
        isBillable: true,
        isArchived: false,
        startDate: '',
        endDate: '',
      });
      fetchProjects(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Error creating project');
    }
  };

  return (
    <div className="container">
      <h1>CREATE PROJECT FORM</h1>
      <form onSubmit={handleSubmit} className="create-project-form">
        <input name="name" placeholder="Name" value={createFormData.name} onChange={handleCreateChange} required className="form-input" />
        <textarea name="description" placeholder="Description" value={createFormData.description} onChange={handleCreateChange} className="form-textarea" />
        <input name="clientName" placeholder="Client Name" value={createFormData.clientName} onChange={handleCreateChange} className="form-input" />
        <label htmlFor="create-budgetHours" className="form-label">Budget Hours:</label>
        <input type="number" id="create-budgetHours" name="budgetHours" placeholder="Budget Hours" value={createFormData.budgetHours} onChange={handleCreateChange} className="form-input" />
        <label className="form-label checkbox-group">
          Billable:
          <input type="checkbox" name="isBillable" checked={createFormData.isBillable} onChange={handleCreateChange} />
        </label>
        <label className="form-label checkbox-group">
          Archived:
          <input type="checkbox" name="isArchived" checked={createFormData.isArchived} onChange={handleCreateChange} />
        </label>
        <label htmlFor="create-startDate" className="form-label">Start Date:</label>
        <input type="date" id="create-startDate" name="startDate" value={createFormData.startDate} onChange={handleCreateChange} className="form-input" />
        <label htmlFor="create-endDate" className="form-label">End Date:</label>
        <input type="date" id="create-endDate" name="endDate" value={createFormData.endDate} onChange={handleCreateChange} className="form-input" />
        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>

      <hr className="divider" />

      {/* <ProjectList projects={projects} refreshProjects={fetchProjects} /> */}
    </div>
  );
};

export default ProjectForm;
