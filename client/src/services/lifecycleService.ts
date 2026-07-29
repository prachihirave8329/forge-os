import api from "./api";

export const getLifecycle = async (projectId: string) => {
  const response = await api.get(`/lifecycle/${projectId}`);
  return response.data;
};

export const updateStep = async (
  stepId: string,
  completed: boolean
) => {
  const response = await api.patch(`/lifecycle/step/${stepId}`, {
    completed,
  });

  return response.data;
};

export const advancePhase = async (projectId: string) => {
  const response = await api.patch(
    `/lifecycle/advance/${projectId}`
  );

  return response.data;
};
