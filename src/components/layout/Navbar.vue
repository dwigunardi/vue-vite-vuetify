<template>
    <v-app-bar app color="primary">
        <v-container>
            <v-row align="center" justify="start">
                <v-col cols="4" class="grow">
                    <v-text-field v-model="search" label="Search...." density="compact" variant="outlined" clearable
                        append-inner-icon="mdi-magnify" @keydown.enter="searchFunction" bg-color="#1E202C" single-line
                        hide-details hint="Enter to search" persistent-clear></v-text-field>
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
                        {{ isDarkTheme ? 'Dark' : 'Light' }}
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script setup>
import { ref, onMounted, defineEmits, watch } from 'vue';
import { useTheme } from "vuetify";
import Footer from './Footer.vue';
import useSearchAnime from '../../repository/getSearchAnime';
import { useSearchValue } from '../../store/searchValue';
import { useDebounceFn } from '@vueuse/core'
const { searchValue, setSearchValue, isSearch } = useSearchValue();
const { data, isFinished, isLoading, execute, error } = useSearchAnime(searchValue);
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
        // execute({ params: { page: 1, limit: 10, q: search.value, status: "airing" } });
        setSearchValue(data)
    } else if (search.value == '' || search.value == null) {
        isSearch.value = false;
        console.log('null kan?')
        setSearchValue(null)
    }
}, 2000);

watch(search, (newValue, oldValue) => {
    console.log(newValue, oldValue, 'here')
    search.value = newValue
});
</script>