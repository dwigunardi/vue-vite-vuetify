<template>
    <v-switch inset color="info" v-model="isDarkTheme" @change="toggleTheme()"
        :label="`It's ${isDarkTheme ? 'Dark' : 'Light'}!`"></v-switch>
</template>
  
<script setup>
import { ref } from 'vue';
import { vuetify } from '../vuetify'
import { useTheme } from "vuetify";

const theme = useTheme();
const isDarkTheme = ref(false);

const toggleTheme = () => {
    theme.global.name.value = isDarkTheme.value ? "dark" : "light";
    // Optional: Get value of current theme
    console.log(`Current theme is dark? ${theme.global.current.value.dark}`);
};
</script>