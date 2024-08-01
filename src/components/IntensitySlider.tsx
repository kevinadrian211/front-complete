import React from 'react';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const IntensitySlider: React.FC<IntensitySliderProps> = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};

export default IntensitySlider;
