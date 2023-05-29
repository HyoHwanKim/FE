import React, { useState } from 'react';
import ProjectModal from '@src/components/ProjectDetail';
import AutoSearch from '@src/components/AutoSearch';
import Project from '@src/components/CreateProject';

const Test: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <>
      test
      <button onClick={() => setShowModal(true)}>Details</button>
      <button onClick={() => setShowModal1(true)}>Project</button>
      <ProjectModal showModal={showModal} setShowModal={setShowModal} />
      <Project showModal1={showModal1} setShowModal1={setShowModal1} />
      <AutoSearch />
    </>
  );
};

export default Test;
