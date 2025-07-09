import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjectRequest } from '../../api/projects/project-api';
import { ProjectDetails } from '../../components/project-details/project-details';

export const Project = () => {
  const { projectId } = useParams();

  const { data, isFetching, isError, error } = useProjectRequest({
    id: projectId ?? '',
  });

  if (isError) {
    console.error(error);
  }

  const project = data?.data;

  return (
    
    <div className="projects-section">
      {!isFetching && project && <ProjectDetails project={project} />}
    </div>
  );
};
