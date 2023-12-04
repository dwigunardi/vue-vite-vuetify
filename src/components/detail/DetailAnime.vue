<script setup>
import { useRouter } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';

 const route = useRouter();

const animeId = route?.currentRoute?.value?.params?.id; // Access the anime ID from the route params

console.log('Anime ID:', animeId);
</script>
<template>
     <MainLayout>
      <h1>Anime Page for ID: {{ animeId }}</h1>
    </MainLayout>
  </template>