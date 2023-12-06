import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
// import { importMetaEnv } from "vue";

export default function useSeasonNow() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  });

  const { data, error, isFinished, isLoading, execute } = useAxios(
    `/seasons/now`,
    { params: { page: 1, limit: 12, filter: "tv" } },
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
