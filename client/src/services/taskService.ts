import api from "./api";

export const getTasks = async (projectId: string) => {
  const response = await api.get(`/tasks/${projectId}`);
  return response.data;
};

export const createTask = async (data: {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
}) => {
  const response = await api.post("/tasks", data);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: any
) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};