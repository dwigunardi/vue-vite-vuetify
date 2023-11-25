<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col>
          <h1>404 - Not Found</h1>
          <v-img src="./src/assets/notfound.jpg" alt="Not Found" max-width="500"></v-img>
          <v-btn to="/" color="primary">Go to Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
    h1 {
      color: red;
    }
  </style>
  