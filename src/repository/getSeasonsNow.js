import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
// import { importMetaEnv } from "vue";

export default function useSeasonNow({ page = 1, limit = 8 }) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  });

  const { data, error, isFinished, isLoading, execute } = useAxios(
    `/seasons/now?page=${page}&limit=${limit}`,
    instance
  );

  return {
    data,
    isFinished,
    isLoading,
    error,
    execute,
  };
}
