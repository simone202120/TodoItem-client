import axios from 'axios';
import { Console } from 'console';
const API_BASE_URL = 'https://localhost:44311';

//Istanza Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllTodoItems = async () => {
    try {
      const response = await api.get('/api/services/app/TodoItem/GetAll');
  
      if (response.data.success) {
        return response.data.result.items;
      } else {
        throw new Error(response.data.error || 'Error: ');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
      throw error; 
    }
  };

  export const getAllPerson = async () => {
    try {
      const response = await api.get('/api/services/app/Person/GetAll');
  
      if (response.data.success) {
        return response.data.result.items;
      } else {
        throw new Error(response.data.error || 'Error: ');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
      throw error; 
    }
  }

  export const createTodoItem = async (todoItem:any) => {
    try {
      const response = await api.post('/api/services/app/TodoItem/Create', todoItem);
      if (response.data.success) {
        return response.data.result;
      } else {
        throw new Error(response.data.error || 'Error: ');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
      throw error; 
    }
  }

  export const createPerson = async (person:any) => {
    try {
      const response = await api.post('/api/services/app/Person/Create', person);
  
      if (response.data.success) {
        return response.data.result;
      } else {
        throw new Error(response.data.error || 'Error: ');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
      throw error; 
    }
  }