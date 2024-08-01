// src/api/systemApi.ts
import axiosInstance from '../axiosConfig'; // Asegúrate de que la ruta sea correcta

const API_BASE_URL = 'http://localhost:8082/system';

export const turnOnSystem = async (id: number, onTime: string, offTime: string) => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/${id}/turnOn`, null, {
            params: { onTime, offTime },
        });
        return response.data;
    } catch (error) {
        console.error('Error turning on system:', error);
        throw error;
    }
};

export const turnOffSystem = async (id: number) => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/${id}/turnOff`);
        return response.data;
    } catch (error) {
        console.error('Error turning off system:', error);
        throw error;
    }
};
