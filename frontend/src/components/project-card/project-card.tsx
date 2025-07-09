import React, { useState } from 'react';
import './project-card.css';
import { useNavigate } from 'react-router-dom';
import { AddProjectModal } from '../add-project-modal/add-project-modal';

export const ProjectCard = ({ projectDetails, createProject = false }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  const onClick = () => {
    if (!createProject && projectDetails.id) {
      navigate(`/projects/${projectDetails.id}/`);
    }
    if (createProject) {
      setShowAddModal(true);
    }
  };

  return (
    <>
      <div className="card" onClick={onClick}>
        {createProject ? (
          <>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#11eaf2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            <h4>{'Add Project?'}</h4>
            <p>{'Click here to add project'}</p>
            <div className="shine-brighter"></div>
          </>
        ) : (
          <>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </span>
            <h4>{projectDetails.title}</h4>
            <p>{projectDetails.description}</p>
            <div className="shine"></div>
          </>
        )}
      </div>
      {showAddModal && (
        <AddProjectModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};
