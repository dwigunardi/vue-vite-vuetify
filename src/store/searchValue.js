// store.js
import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useSearchValue = createGlobalState(() => {
  // state
  const isSearch = ref(false);

  // getters
  const searchValue = ref("");

  // actions
  function setSearchValue(params) {
    searchValue.value = params;
  }

  return { isSearch, searchValue, setSearchValue };
});
