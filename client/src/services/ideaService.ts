import api from "./api";

export const getIdeas = async (projectId: string) => {
  const response = await api.get(`/ideas/${projectId}`);
  return response.data;
};

export const createIdea = async (formData: FormData) => {
  const response = await api.post("/ideas", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateIdea = async (
  id: string,
  data: {
    title: string;
    content: string;
  }
) => {
  const response = await api.put(`/ideas/${id}`, data);
  return response.data;
};

export const deleteIdea = async (id: string) => {
  const response = await api.delete(`/ideas/${id}`);
  return response.data;
};