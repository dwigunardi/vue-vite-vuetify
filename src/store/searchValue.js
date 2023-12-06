// store.js
import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useSearchValue = createGlobalState(() => {
  // state
  const isSearch = ref(false);

  // getters
  const searchValue = ref("");
  const searchData = ref([
    {
      title: "test",
    },
  ]);
  // actions
  function setSearchValue(params) {
    searchValue.value = params;
  }

  return { isSearch, searchValue, setSearchValue, searchData };
});
