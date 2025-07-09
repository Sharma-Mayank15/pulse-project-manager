import React, { useEffect, useState } from 'react';
import { useAddProjectRequest } from '../../api/projects/project-api';
import './add-project-modal.css';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../api/base-api';

const dateFormatter = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Format the date as dd-mm-yyyy
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const AddProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    estimated_end_date: '',
  });
  const [error, setError] = useState({ status: false, message: '' });

  const { mutate, isSuccess, data } = useAddProjectRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      queryClient.invalidateQueries({ queryKey: ['projectList'] });

      const projectId = data.data.id;
      navigate(`/projects/${projectId}`);
      onClose();
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.estimated_end_date);
    if (endDate < startDate) {
      setError({
        status: true,
        message: 'You cannot end the project before you begin!',
      });
    }
    mutate({
      ...formData,
      start_date: dateFormatter(startDate),
      estimated_end_date: dateFormatter(endDate),
    });
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h2>Add Project!</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="start_date">Start Date:</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estimated_end_date">Estimated End Date:</label>
                <input
                  type="date"
                  id="estimated_end_date"
                  name="estimated_end_date"
                  value={formData.estimated_end_date}
                  onChange={handleChange}
                />
              </div>
              {error.status && <p>{error.message}</p>}
              <button type="submit" className="add-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
