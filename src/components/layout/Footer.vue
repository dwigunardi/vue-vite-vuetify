<template>
    <v-footer class="d-flex flex-column">
      <div class="px-4 bg-accent text-center w-100">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>

  </template>

<script setup>
const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
]
</script>