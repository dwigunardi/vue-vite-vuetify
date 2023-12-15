<script setup>
import { ref, watch } from 'vue';

const drawer = ref(true);
const rail = ref(false);
watch(rail, () => {
  console.log(rail.value)
})
</script>
<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="primary"  style="height: 100vh;position: fixed;">
    <v-list-item nav @click.stop="rail = !rail">
    <div class="d-flex align-center justify-center"> 
  <v-img src="/animeBox.png"   />
  <!-- <v-list-item-content>
    <v-list-item-title>
      John Leider
    </v-list-item-title>
  </v-list-item-content> -->

  <!-- <template #append>
    <v-btn variant="text" icon="mdi-menu"></v-btn>
  </template> -->
</div>
</v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav color="bg-accent" class="d-flex flex-column justify-space-between" v-bind:height="!rail ? `70vh` : `90vh`">
      <v-list-item to="/" prepend-icon="mdi-home-city" title="Home" value="home" rounded="xl"></v-list-item>
      <v-list-item to="/trending" prepend-icon="mdi-star" title="Trending" value="trending"></v-list-item>
      <v-list-item to="/suggestions" prepend-icon="mdi-robot-outline" title="Suggestions" value="suggestions"></v-list-item>
      <v-list-item to="/category" prepend-icon="mdi-file-table-box-multiple-outline" title="Category" value="category"></v-list-item>
      <v-list-item to="/discover" prepend-icon="mdi-compass-outline" title="Discover" value="discover"></v-list-item>
      <v-list-item to="/schedule" prepend-icon="mdi-clipboard-text-clock-outline" title="Schedule" value="schedule"></v-list-item>
      <v-list-item to="/settings" prepend-icon="mdi-cog-outline" title="Settings" value="settings"></v-list-item>
      <v-list-item to="/logout" prepend-icon="mdi-logout" title="logout" value="logout" class="mt-auto"></v-list-item>
    </v-list>
      
    
  </v-navigation-drawer>
</template>