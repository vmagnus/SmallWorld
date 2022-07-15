import Axios, { AxiosResponse } from 'axios';
import { IForm } from 'hooks/useForm';

const API_URL = process.env.REACT_APP_API_URL; // MAYBE WE CAN IMPORT IT FROM ENV

export const getJobFunctions = (): Promise<AxiosResponse> => {
  return Axios.get(`${API_URL}/jobFunctions`);
};

export const getStates = (): Promise<AxiosResponse> => {
  return Axios.get(`${API_URL}/states`);
};

export const submitForm = (formData: IForm): Promise<AxiosResponse> => {
  return Axios.post(`${API_URL}/submit`, formData);
};
