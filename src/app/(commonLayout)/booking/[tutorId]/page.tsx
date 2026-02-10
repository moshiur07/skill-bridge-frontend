import React from "react";

const Tutor = ({ params }: { params: { tutorId: string } }) => {
  const tutorId = params.tutorId;
  console.log(tutorId);
  return <div>Tutor ID: {tutorId}</div>;
};

export default Tutor;
