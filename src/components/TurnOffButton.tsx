import React from 'react';

interface TurnOffButtonProps {
  onTurnOff: () => void;
}

const TurnOffButton: React.FC<TurnOffButtonProps> = ({ onTurnOff }) => (
  <button className="turn-off-button" onClick={onTurnOff}>Apagar</button>
);

export default TurnOffButton;
