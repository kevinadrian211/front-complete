import React from 'react';

interface TurnOnButtonProps {
  onTurnOn: () => void;
}

const TurnOnButton: React.FC<TurnOnButtonProps> = ({ onTurnOn }) => (
  <button className="turn-on-button" onClick={onTurnOn}>Encender</button>
);

export default TurnOnButton;
