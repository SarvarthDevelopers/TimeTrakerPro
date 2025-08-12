import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ProjectCards.css';
import './CreateProjectForm.css';

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

const ProjectCards: React.FC = () => {
      const [editFormData, setEditFormData] = useState({
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
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project', error);
      alert('Error deleting project');
    }
  };
const handleEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setEditFormData({
      name: project.name,
      description: project.description || '',
      clientName: project.clientName || '',
      budgetHours: project.budgetHours ?? 0,
      isBillable: project.isBillable,
      isArchived: project.isArchived,
      startDate: project.startDate ? project.startDate.split('T')[0] : '',
      endDate: project.endDate ? project.endDate.split('T')[0] : '',
    });
    setShowUpdatePopup(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      const { name, type } = target;
      const value =
        type === 'checkbox' && target instanceof HTMLInputElement
          ? target.checked
          : target.value;
      setEditFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    };

  const handleUpdate = async () => {
    if (!editingProjectId) return;
    try {
      await axios.patch(`http://localhost:3000/projects/${editingProjectId}`, {
        name: editFormData.name,
        description: editFormData.description || null,
        clientName: editFormData.clientName || null,
        budgetHours: Number(editFormData.budgetHours),
        isBillable: !!editFormData.isBillable,
        isArchived: !!editFormData.isArchived,
        startDate: editFormData.startDate ? new Date(editFormData.startDate) : null,
        endDate: editFormData.endDate ? new Date(editFormData.endDate) : null,
      });
      alert('Project updated successfully!');
      setShowUpdatePopup(false);
      setEditingProjectId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    }
  };
  return (
    <div className="project-container">
      {/* <h2>Project List</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p><strong>Description:</strong> {project.description || 'N/A'}</p>
              <p><strong>Client:</strong> {project.clientName || 'N/A'}</p>
              <p><strong>Budget Hours:</strong> {project.budgetHours ?? 'N/A'}</p>
              <p><strong>Billable:</strong> {project.isBillable ? 'Yes' : 'No'}</p>
              <p><strong>Archived:</strong> {project.isArchived ? 'Yes' : 'No'}</p>
              <p><strong>Start Date:</strong> {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>End Date:</strong> {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</p>
              <div className="actions">
                <button onClick={() => handleDelete(project.id)} className="btn btn-danger">Delete</button>
                <button onClick={() => handleUpdate(project)} className="btn btn-secondary">Update</button>
              </div>
            </div>
          ))}
        </div>
      )} */}
      <h2>Project List</h2>
      {projects.length === 0 ? (
        <p className="no-projects-message">No projects found.</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p><strong>Description:</strong> {project.description || 'N/A'}</p>
              <p><strong>Client:</strong> {project.clientName || 'N/A'}</p>
              <p><strong>Budget Hours:</strong> {project.budgetHours ?? 'N/A'}</p>
              <p><strong>Billable:</strong> {project.isBillable ? 'Yes' : 'No'}</p>
              <p><strong>Archived:</strong> {project.isArchived ? 'Yes' : 'No'}</p>
              <p><strong>Start Date:</strong> {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>End Date:</strong> {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</p>
              <div className="actions">
                <button onClick={() => handleDelete(project.id)} className="btn btn-danger">Delete</button>
                <button onClick={() => handleEdit(project)} className="btn btn-secondary">Update</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUpdatePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Project</h3>
            <form className="edit-project-form">
              <input name="name" placeholder="Name" value={editFormData.name} onChange={handleEditChange} required className="form-input" />
              <textarea name="description" placeholder="Description" value={editFormData.description} onChange={handleEditChange} className="form-textarea" />
              <input name="clientName" placeholder="Client Name" value={editFormData.clientName} onChange={handleEditChange} className="form-input" />
              <label htmlFor="edit-budgetHours" className="form-label">Budget Hours:</label>
              <input type="number" id="edit-budgetHours" name="budgetHours" placeholder="Budget Hours" value={editFormData.budgetHours} onChange={handleEditChange} className="form-input" />
              <label className="form-label checkbox-group">
                Billable:
                <input type="checkbox" name="isBillable" checked={editFormData.isBillable} onChange={handleEditChange} />
              </label>
              <label className="form-label checkbox-group">
                Archived:
                <input type="checkbox" name="isArchived" checked={editFormData.isArchived} onChange={handleEditChange} />
              </label>
              <label htmlFor="edit-startDate" className="form-label">Start Date:</label>
              <input type="date" id="edit-startDate" name="startDate" value={editFormData.startDate} onChange={handleEditChange} className="form-input" />
              <label htmlFor="edit-endDate" className="form-label">End Date:</label>
              <input type="date" id="edit-endDate" name="endDate" value={editFormData.endDate} onChange={handleEditChange} className="form-input" />
              <div className="button-group">
                <button onClick={handleUpdate} className="btn btn-success">Update</button>
                <button onClick={() => setShowUpdatePopup(false)} className="btn btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCards;
