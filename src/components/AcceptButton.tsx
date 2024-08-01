import React from 'react';

interface AcceptButtonProps {
  onAccept: () => void;
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ onAccept }) => {
  return (
    <button className="accept-button" onClick={onAccept}>
      Aceptar
    </button>
  );
};

export default AcceptButton;
