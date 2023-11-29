<script setup>
import Navbar from './layout/Navbar.vue';
import MainLayout from './layout/MainLayout.vue';
import useTopAnime from '../repository/getTopAnime'
import useSeasonNow from '../repository/getSeasonsNow'
import useRecentRecomendation from '../repository/getRecentRecomendation'
import { watch } from 'vue';

const { data, isFinished, isLoading } = useSeasonNow({ page: 2, limit: 25 })
// const { data: dataRecomend, isFinished: isFinishedRecomend, isLoading: isLoadingRecomend } = useRecentRecomendation()
const animeData = data
watch(data, (newValue, oldValue) => {
    console.log(newValue)
})

const colors = [
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
]
const slides = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
]


</script>
<template>
    <div>
        <MainLayout>
            <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                    <v-sheet :color="colors[i]" height="100%">
                        <div class="d-flex fill-height justify-center align-center">
                            <div class="text-h2">
                                {{ slide }} Slide
                            </div>
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <v-row v-if="!isLoading" align-content="space-between">
                <v-col cols="3" v-for="items in animeData?.data" :key="items.mal_id">

                    <v-img height="318" width="100%" cover :src='items.images.jpg.large_image_url' class="text-white">

                    </v-img>
                    <h1>{{ items.title }}</h1>
                </v-col>
            </v-row>

            <v-row v-else>
                <v-col v-for="i in 10" :key="i" cols="4">
                    <v-skeleton-loader :elevation="10" color="accent" type="card"></v-skeleton-loader>
                </v-col>
            </v-row>
        </MainLayout>
    </div>
</template>