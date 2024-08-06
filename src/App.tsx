import React, { useState, useEffect } from 'react';
import './App.css';
import TimePicker from './components/TimePicker';
import TurnOnButton from './components/TurnOnButton';
import TurnOffButton from './components/TurnOffButton';
import AcceptButton from './components/AcceptButton';
import axios from 'axios';

const API_URL = 'http://localhost:8082/system/1';

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        const data = response.data;
        setIsOn(data.stated);
        setIntensity(data.intensity);
        setStartTime(data.ontime || '');
        setEndTime(data.offtime || '');
        console.log('Conexión exitosa', response.data);
      })
      .catch(error => {
        console.error('Error al conectar con el backend', error);
      });
  }, []);

  const formatTime = (time: string) => {
    const timeParts = time.split(':').map(Number);
  
    if (timeParts.length === 2) {
      // If the time format is HH:mm, add seconds
      timeParts.push(0);
    }
  
    if (timeParts.length !== 3) {
      throw new Error('Invalid time format');
    }
  
    const [hours, minutes, seconds] = timeParts;
  
    if (
      isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
      hours < 0 || hours >= 24 ||
      minutes < 0 || minutes >= 60 ||
      seconds < 0 || seconds >= 60
    ) {
      throw new Error('Invalid time value');
    }
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTurnOn = () => {
    setIsOn(true);
    axios.put(`${API_URL}/turnOn`, { 
      onTime: formatTime(startTime),
      offTime: formatTime(endTime) 
    })
      .then(response => {
        console.log('Sistema encendido', response.data);
      })
      .catch(error => {
        console.error('Error al encender el sistema', error);
      });
  };

  const handleTurnOff = () => {
    setIsOn(false);
    axios.put(`${API_URL}/turnOff`)
      .then(response => {
        console.log('Sistema apagado', response.data);
      })
      .catch(error => {
        console.error('Error al apagar el sistema', error);
      });
  };
  

  const handleAccept = () => {
    try {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
  
      axios.put(`${API_URL}`, {
        ontime: formattedStartTime,
        offtime: formattedEndTime
      })
      .then(response => {
        console.log('Horarios actualizados', response.data);
      })
      .catch(error => {
        console.error('Error al actualizar los horarios', error);
      });
    } catch (error) {
      console.error('Invalid time format', error);
    }
  };

  // Nota: `handleIntensityChange` ya no se usa y puede eliminarse si no se necesita más

  return (
    <div className="App">
      <header className="App-header">
        <h1>Control de Iluminación</h1>
        <div className="button-group">
          <TurnOnButton onTurnOn={handleTurnOn} />
          <TurnOffButton onTurnOff={handleTurnOff} />
        </div>
        {isOn && (
          <div>
            <TimePicker
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={setStartTime}
              onEndTimeChange={setEndTime}
            />
            <AcceptButton onAccept={handleAccept} />
          </div>
        )}
        {/* El componente IntensitySlider ha sido eliminado */}
      </header>
    </div>
  );
};

export default App;
