import React from 'react';

interface TimePickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStartTimeChange(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEndTimeChange(event.target.value);
  };

  return (
    <div className="time-picker-container">
      <div className="time-picker">
        <label htmlFor="start-time">Hora de inicio:</label>
        <input
          id="start-time"
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          className="time-picker-input"
        />
      </div>
      <div className="time-picker">
        <label htmlFor="end-time">Hora de fin:</label>
        <input
          id="end-time"
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
          className="time-picker-input"
        />
      </div>
    </div>
  );
};

export default TimePicker;
