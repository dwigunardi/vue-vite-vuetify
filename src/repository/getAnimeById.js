import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
// import { importMetaEnv } from "vue";

export default function useGetAnimeId(id) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  });

  const { data, error, isFinished, isLoading, execute } = useAxios(
    `/anime/${id}/full`,
    instance,
    { immediate: true }
  );

  return {
    data,
    isFinished,
    isLoading,
    error,
    execute,
  };
}
