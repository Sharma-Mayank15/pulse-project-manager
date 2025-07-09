import React from 'react';
import { useProjectListRequest } from '../../api/projects/project-api';
import { ProjectCard } from '../project-card/project-card';
import './project-list.css';

export const ProjectList: React.FC = () => {
  const { isSuccess, isLoading, isError, error, data } =
    useProjectListRequest();
  const projectListApiResponse = data?.data;

  if (isError) {
    console.error(error);
  }

  return (
    <div className="list">
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {isSuccess &&
            projectListApiResponse &&
            projectListApiResponse.length > 0 &&
            projectListApiResponse.map((project, key) => (
              <ProjectCard projectDetails={project} />
            ))}
          <ProjectCard projectDetails={null} createProject />
        </>
      )}
    </div>
  );
};
