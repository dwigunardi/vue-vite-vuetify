import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
// import { importMetaEnv } from "vue";

export default function useSearchAnime(searchValue) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  });

  const { data, error, isFinished, isLoading, execute } = useAxios(
    `/anime`,
    { params: { page: 1, limit: 10, q: searchValue, status: "airing" } },
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
