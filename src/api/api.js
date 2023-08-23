import axiosClient from "./axiosClient";

// api call for login user
export const loginApi=(data)=>{
    const url = `/login?email=${data.email}&password=${data.password}`;
    console.log('url', url)
    return axiosClient().get(url);
}

// api call for get all tasks
export const getTasksApi=()=>{
    const url = `/tasksList`;
    return axiosClient().get(url);
  };

// ap call for add tasks
export const addTaskApi=(data)=>{
    const url = `/tasksList`;
    return axiosClient().post(url, data.payload);
  }

// api call for update task stauts 
export const updateTaskApi=(data)=>{
    const url = `/tasksList/${data.payload.id}`;
   return axiosClient().patch(`${url}`, JSON.stringify(data.payload));
  }

// api call for delete  task 
export const deleteTaskApi=(data)=>{
    const url = `/tasksList/${data.payload}`;
    return axiosClient().delete(url);
  }