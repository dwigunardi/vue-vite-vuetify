<script setup>
import { ref } from 'vue';

const drawer = ref(true);
const rail = ref(false);
</script>
<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="primary">
    <v-list-item nav @click.stop="rail = !rail">
  <img src="../../assets/AnimeBoX.png" alt="User Avatar" class="v-list-item__avatar">
  <!-- <v-list-item-content>
    <v-list-item-title>
      John Leider
    </v-list-item-title>
  </v-list-item-content> -->

  <template #append>
    <v-btn variant="text" icon="mdi-menu"></v-btn>
  </template>
</v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav color="bg-accent">
      <v-list-item to="/" prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
      <v-list-item to="/trending" prepend-icon="mdi-star" title="Trending" value="trending"></v-list-item>
      <v-list-item to="/suggestions" prepend-icon="mdi-robot-outline" title="Suggestions" value="suggestions"></v-list-item>
      <v-list-item to="/categoty" prepend-icon="mdi-file-table-box-multiple-outline" title="Category" value="categoty"></v-list-item>
      <v-list-item to="/discover" prepend-icon="mdi-compass-outline" title="Discover" value="discover"></v-list-item>
      <v-list-item to="/schedule" prepend-icon="mdi-clipboard-text-clock-outline" title="Schedule" value="schedule"></v-list-item>
      <v-list-item to="/settings" prepend-icon="mdi-cog-outline" title="Settings" value="settings"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>