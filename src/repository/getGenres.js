import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
// import { importMetaEnv } from "vue";

export default function useGenres() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  });

  const { data, error, isFinished, isLoading, execute } = useAxios(
    `/genres/anime`,
    { params: { filter: "", limit: 10 } },
    instance,
    { immediate: false }
  );

  return {
    data,
    isFinished,
    isLoading,
    error,
    execute,
  };
}
