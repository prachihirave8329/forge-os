import api from "./api";

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const getProject = async (id: string) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data: {
  name: string;
  description: string;
}) => {
  const response = await api.post("/projects", data);
  return response.data;
};

export const updateProject = async (
  id: string,
  data: {
    name: string;
    description: string;
  }
) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/projects/users/all");
  return response.data;
};

export const assignMember = async (
  projectId: string,
  userId: string
) => {
  const response = await api.post(
    `/projects/${projectId}/members`,
    { userId }
  );

  return response.data;
};

export const removeMember = async (
  projectId: string,
  userId: string
) => {
  const response = await api.delete(
    `/projects/${projectId}/members/${userId}`
  );

  return response.data;
};