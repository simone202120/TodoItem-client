import axios from 'axios';
const API_BASE_URL = 'https://localhost:44311';

//Istanza Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Abp.TenantId' : 1,
        'Content-Type': 'application/json',
    },
});

export interface ITodoItemDto {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate:string;
  weight: number;
  personId?: number;
  isComplete?: boolean;
}

export interface ICreateTodoItemInput {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  weight: number
}

export interface ICreatePersonInput{
  name: string;
  surname: string;
  birthDate: string;
  tin: string;
  cityCode: string;
}

export interface IPersonDto{
  name: string;
  surname: string;
  birthDate: string;
  tin: string;
  cityCode:string;
  id : number;
}

export interface IupdateTodoItemInput{
  id:number;
  title: string;
  description: string;
  startDate: string;
  endDate : string;
  weight:number;
  personId?:number | null;
  isComplete:boolean;
}

export interface IUpdatePersonInput{
  id :number;
  name :string;
  surname : string;
  birthDate:string;
  tin:string;
  cityCode:string;
}

export const getAllTodoItems = async (): Promise<ITodoItemDto[]> => { //Promise equivalente al Task in C#
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

  export const getAllPerson = async () : Promise<IPersonDto[]>=> {
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

  export const getPerson = async (personId:Number) =>{
    try{
      const response = await api.get(`/api/services/app/Person/Get?Id=${personId}`);
      if (response.data.success) {
        return response.data.result;
      } else {
        throw new Error(response.data.error.details || 'Error: ');
      }
    }catch(error){
      console.error('Errore durante la richiesta: ',error );
    }
  }

  export const createTodoItem = async (todoItem:ICreateTodoItemInput) => {
    try {
      const response = await api.post('/api/services/app/TodoItem/Create', todoItem);
      if (response.data.success) {
        console.log(todoItem);
        return response.data.result;
      } else {
        throw new Error(response.data.error.details || 'Error: ');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
      throw error; 
    }
  }

  export const createPerson = async (person:ICreatePersonInput) => {
    try {
      const response = await api.post('/api/services/app/Person/Create', person);
  
      if (response.data.success) {
        return response.data.result;
      } else {
        throw new Error(response.data.error.details || 'Error: ');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
      throw error; 
    }
  }

  export const deleteTodoItem = async (itemid:number) =>{
    try{
       await api.delete(`/api/services/app/TodoItem/Delete?id=${itemid}`)
    }catch(error){
      console.error('Errore durante la richiesta: ',error );
    }
  }
  export const deletePersons = async (personid:number) =>{
    try{
       await api.delete(`/api/services/app/Person/Delete?id=${personid}`)
    }catch(error){
      console.error('Errore durante la richiesta: ', error);
    }
  }

  export const updateTodoItem = async (item:IupdateTodoItemInput) =>{
    try{
      const response = await api.put('/api/services/app/TodoItem/Update', item);
      if (response.data.success) {
        return response.data.result;
      } else {
        throw new Error(response.data.error.details || 'Error: ');
      }
    }catch(error){
      console.error('Errore durante l\'aggiornamento dell\'item', error)
    }
  }

  export const updatePerson = async (person:IUpdatePersonInput) =>{
    try{
      const response = await api.put('/api/services/app/Person/Update', person);
      if (response.data.success) {
        return response.data.result;
      } else {
        throw new Error(response.data.error.details || 'Error: ');
      }
    }catch(error){
      console.error('Errore durante l\'aggiornamento della Person', error)
    }
  }