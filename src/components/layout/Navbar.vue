<template>
    <v-app-bar app color="primary">
        <v-container>
            <v-row align="center" justify="start">
                <v-col cols="4" class="grow">
                    <v-text-field v-if="router.currentRoute.value.path === '/'" v-model="search" label="Search...."
                        density="compact" variant="outlined" clearable append-inner-icon="mdi-magnify"
                        @update:model-value="searchFunction" bg-color="#1E202C" single-line hide-details
                        hint="Enter to search" persistent-clear></v-text-field>
                    <h1 v-else>
                        {{ router.currentRoute.value.path.split('/')[1].toUpperCase() }}
                    </h1>
                </v-col>
                <v-col cols="2" offset="1">
                    <v-btn icon>
                        <v-icon>mdi-bell-outline</v-icon>
                        <v-tooltip activator="parent" location="top">Notifications</v-tooltip>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-chat-outline</v-icon>
                        <v-tooltip activator="parent" location="top">Chat</v-tooltip>
                    </v-btn>
                </v-col>
                <v-col cols="2" offset="1">
                    <v-btn :prepend-icon="'mdi-filmstrip'" variant="outlined" color="bg-accent">Watch List</v-btn>
                </v-col>
                <v-col cols="2">
                    <!-- Add any additional buttons or elements on the right side -->
                    <div class="d-flex align-center">
                        Theme :
                        <v-btn icon @click="toggleTheme">
                            <v-icon>mdi-theme-light-dark</v-icon>
                        </v-btn>
                        {{ themeState ? 'Dark' : 'Light' }}
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script setup>
import { ref, onMounted, defineEmits, watch } from 'vue';
import { useTheme } from "vuetify";
import useSearchAnime from '../../repository/getSearchAnime';
import useSeasonNow from '../../repository/getSeasonsNow';
import { useSearchValue } from '../../store/searchValue';
import { useDebounceFn, useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router';
const router = useRouter();
const { searchValue, setSearchValue, isSearch, searchData } = useSearchValue();
const { data, isFinished, isLoading, execute, error } = useSearchAnime(searchValue);
const { data: now, isFinished: nowFinished, isLoading: nowLoading, execute: nowExecute, error: nowError } = useSeasonNow();
const theme = useTheme();
const isDarkTheme = ref(true);
const props = defineProps({
    isSearch: Boolean,
})
const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    theme.global.name.value = isDarkTheme.value ? "dark" : "light";
    // Optional: Get value of current theme
    console.log(`Current theme is dark? ${theme.global.current.value.dark}`);
};
const search = ref('');
const emit = defineEmits(['update:isSearch']);

const searchFunction = useDebounceFn(() => {
    if (search.value?.length > 1) {
        console.log('kok ini')
        isSearch.value = true;
        execute({ params: { page: 1, limit: 10, q: search.value, status: "airing" } });
        setSearchValue(search.value)
    } else if (search.value == '' || search.value == null) {
        isSearch.value = false;
        console.log('null kan?')
        nowExecute({ params: { page: 1, limit: 12, filter: "tv" } });
        setSearchValue(null)
    }
}, 1000);

watch(search, (newValue, oldValue) => {
    search.value = newValue
});
watch(data, (newValue, oldValue) => {
    searchData.value = newValue
})
const themeState = useStorage('theme', isDarkTheme) // returns Ref<boolean>
</script>