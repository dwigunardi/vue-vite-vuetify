import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
// import { importMetaEnv } from "vue";

export default function useUpcomingAnime() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  });

  const { data, error, isFinished, isLoading, execute } = useAxios(
    `/seasons/upcoming`,
    { params: { page: 1, limit: 12, filter: "tv" } },
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
