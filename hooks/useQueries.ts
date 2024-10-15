import { useQuery } from "@tanstack/react-query";

const fetchTasks = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const res = await fetch(apiUrl);
  return res.json();
};

export const useGetVehicle = () => {
  return useQuery({
    queryKey: ["get vehicle "],
    queryFn: fetchTasks,
  });
};
