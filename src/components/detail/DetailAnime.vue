<script setup>
import { useRouter } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';
import useGetAnimeId from '../../repository/getAnimeById'
const route = useRouter();

const animeId = route?.currentRoute?.value?.params?.id; // Access the anime ID from the route params
const { data, error, execute, isFinished, isLoading } = useGetAnimeId(animeId);
let dataDetail = data
console.log('Anime ID:', dataDetail);
</script>
<template>
  <MainLayout>
    <v-parallax :src="dataDetail?.data.trailer.images.maximum_image_url" height="600" scale="0.5">
      <div class="bg-primary h-100 w-fill" style="opacity: 0.5; position: relative"></div>
      <div class="h-fill w-fill" style="position: absolute; top: 40%; left: 2%">
        <v-row class="w-100" align-content="start" align="start">
          <v-col cols="3">
            <div class="border border-light py-1">
              <v-img :src="dataDetail?.data.images.webp.large_image_url" height="350" class="rounded"></v-img>
            </div>
          </v-col>
          <v-col cols="9">
            <h1>{{ dataDetail?.data.title }}</h1>
            <p>{{ dataDetail?.data?.synopsis }}</p>
            <h1><span>Rating: </span><v-icon icon="mdi-star" color="yellow" size="small"></v-icon>{{
              dataDetail?.data.score }}</h1>
            <div class="d-flex align-center justify-start w-100">
              <v-btn v-for="items in dataDetail?.data?.genres" :key="items.mal_id" variant="flat" color="info"
                size="small" class="mt-2 me-2" rounded="xl">{{ items.name }}</v-btn>
            </div>
          </v-col>
        </v-row>
        <div>
        </div>
      </div>
    </v-parallax>
    <v-container>
      <div class="mt-5">
        <h1><span class="text-red">| </span>Detail Anime</h1>
      </div>
    </v-container>
  </MainLayout>
</template>