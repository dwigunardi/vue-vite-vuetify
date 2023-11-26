<template>
    <v-app-bar app color="primary">
        <v-container>
            <v-row align="center" justify="start">
                <v-col cols="4" class="grow">
                    <v-text-field v-model="search" label="Search...." density="compact" variant="outlined" clearable
                        append-inner-icon="mdi-magnify" @keydown.enter="searchFunction" bg-color="#1E202C" single-line
                        hide-details hint="Enter to search"></v-text-field>
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
import { ref } from 'vue';
import { useTheme } from "vuetify";
import Footer from './Footer.vue';
const theme = useTheme();
const isDarkTheme = ref(true);

const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    theme.global.name.value = isDarkTheme.value ? "dark" : "light";
    // Optional: Get value of current theme
    console.log(`Current theme is dark? ${theme.global.current.value.dark}`);
};
const search = ref('');

const searchFunction = () => {
    // Implement your search logic here using the "search" variable
    console.log('Searching for:', search.value);
};
</script>