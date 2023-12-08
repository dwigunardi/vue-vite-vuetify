<script setup>
import { useRouter } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';
import useGetAnimeId from '../../repository/getAnimeById'
import { ref } from 'vue';

const route = useRouter();

const animeId = route?.currentRoute?.value?.params?.id; // Access the anime ID from the route params
const { data, error, execute, isFinished, isLoading } = useGetAnimeId(animeId);
let dataDetail = data
const hover = ref(false);
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
              <v-img :src="dataDetail?.data.images.webp.large_image_url" height="350" width="350" class="rounded"></v-img>
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
      <div class="mt-5 d-flex flex-column" style="gap: 20px;">
        <h1><span class="text-red">| </span>Detail Anime</h1>
        <v-hover> <template v-slot:default="{ isHovering, props }">
            <v-alert border="start" :border-color="isHovering ? 'error' : 'info'" v-bind="props"
              style="transition: all 0.9s;" v-bind:elevation="isHovering ? 10 : 0" title="Background" color="accent">
              <p style="text-align: justify;">{{ dataDetail?.data?.background }}</p>
            </v-alert>
          </template></v-hover>
        <v-hover> <template v-slot:default="{ isHovering, props }">
            <v-alert border="start" :border-color="isHovering ? 'error' : 'info'" v-bind="props"
              v-bind:elevation="isHovering ? 10 : 0" title="Aired" color="accent" style="transition: all 0.9s;">
              <p style="text-align: justify;">{{ dataDetail?.data?.aired.string }}</p>
              <p>Broad Cast: {{ dataDetail?.data?.broadcast.string }} / {{ dataDetail?.data?.broadcast.timezone }}</p>
            </v-alert>
          </template></v-hover>
        <v-hover> <template v-slot:default="{ isHovering, props }">
            <v-alert border="start" :border-color="isHovering ? 'error' : 'info'" v-bind="props"
              v-bind:elevation="isHovering ? 10 : 0" title="Rating" color="accent" style="transition: all 0.9s;">
              <p style="text-align: justify;">{{ dataDetail?.data?.rating }}</p>
            </v-alert>
          </template></v-hover>
        <v-hover> <template v-slot:default="{ isHovering, props }">
            <v-alert border="start" :border-color="isHovering ? 'error' : 'info'" v-bind="props"
              v-bind:elevation="isHovering ? 10 : 0" title="Popularity" color="accent" style="transition: all 0.9s;">
              <p style="text-align: justify;">Rank : {{ dataDetail?.data?.rank }}</p>
              <p style="text-align: justify;">Popularity : <i class="mdi mdi-star text-yellow"></i>{{
                dataDetail?.data?.popularity }}</p>
              <p style="text-align: justify;">Members : {{ dataDetail?.data?.members }}</p>
              <p style="text-align: justify;">Favorites : {{ dataDetail?.data?.favorites }}</p>
              <p style="text-align: justify;">Score : {{ dataDetail?.data?.score }}</p>
              <p style="text-align: justify;">Score By Users : {{ dataDetail?.data?.scored_by }}</p>
            </v-alert>
          </template></v-hover>
        <h1><span class="text-red">| </span>Episodes</h1>
        <v-hover> <template v-slot:default="{ isHovering, props }">
            <v-alert border="start" :border-color="isHovering ? 'error' : 'info'" v-bind="props"
              v-bind:elevation="isHovering ? 10 : 0" title="" color="accent" style="transition: all 0.9s;">
              <p style="text-align: justify;">Episodes : {{ dataDetail?.data?.episodes }}</p>
              <p style="text-align: justify;">Status : {{ dataDetail?.data?.status }}</p>
              <p style="text-align: justify;">Duration : {{ dataDetail?.data?.duration }}</p>
              <p style="text-align: justify;">Genre : {{ dataDetail?.data?.genres.map(x => x.name).join(', ') }}</p>
            </v-alert>
          </template></v-hover>
        <v-hover> <template v-slot:default="{ isHovering, props }">
            <v-alert border="start" :border-color="isHovering ? 'error' : 'info'" v-bind="props"
              v-bind:elevation="isHovering ? 10 : 0" title="Producers" color="accent" style="transition: all 0.9s;">
              <div v-for="items in dataDetail?.data?.producers" :key="items.mal_id" class="d-flex align-center mt-2"
                style="gap: 10px;">
                <p>Type :{{ items.type }}</p>
                <p>{{ items.name }}</p>
                <p>Url : {{ items.url }}</p>
              </div>
            </v-alert>
          </template></v-hover>
        <div>
          <h1><span class="text-red">| </span>Trailer</h1>
          <v-divider></v-divider>
          <iframe :src="dataDetail?.data?.trailer.embed_url" frameborder="0" height="500"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
            class="w-100"></iframe>
        </div>
      </div>
    </v-container>
  </MainLayout>
</template>