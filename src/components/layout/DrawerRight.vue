<script setup>
import { ref } from 'vue';

const drawer = ref(true);
const rail = ref(false);
</script>
<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" location="right" color="primary">
    <v-list nav @click.stop="rail = !rail" class="cursor-pointer">

      <v-list-item v-if="!rail" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"></v-list-item>

      <v-list-item v-else prepend-icon="mdi-menu" title="Menu" class="cursor-pointer">
        <!-- Your content for rail being true -->
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>