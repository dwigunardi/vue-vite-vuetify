<script setup>
import Navbar from './layout/Navbar.vue';
import MainLayout from './layout/MainLayout.vue';
import useTopAnime from '../repository/getTopAnime'
import useSeasonNow from '../repository/getSeasonsNow'
import useRecentRecomendation from '../repository/getRecentRecomendation'
import { watch } from 'vue';
import { ref } from 'vue';

const { data, isFinished, isLoading } = useSeasonNow({ page: 2, limit: 12 })
// const { data: dataRecomend, isFinished: isFinishedRecomend, isLoading: isLoadingRecomend } = useRecentRecomendation()
const animeData = data
const snackbar = ref(false)
watch(data, (newValue, oldValue) => {
    console.log(newValue?.data?.map((item) => item.genres));
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
const items = [
    {
        src: '/banner-1.png',
    },
    {
        src: '/banner-2.jpg',
    },
    {
        src: '/banner-3.jpg',
    },
    {
        src: '/banner-4.jpg',
    },
]
function truncate(str, n) {
    return (str == null ? 0 : str?.length > n) ? str.slice(0, n - 1) + '...;' : str;
};

</script>
<template>
    <div>
        <MainLayout>
            <v-carousel v-if="!isLoading" cycle height="600" hide-delimiter-background show-arrows="hover" progress="info">
                <v-carousel-item v-for="(slide, i) in animeData?.data?.slice(1, 10)" :key="i">
                    <v-img :src="slide.trailer.images.maximum_image_url" cover>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template>
                        <div class="bg-primary h-100 w-fill" style="opacity: 0.5; position: relative;"></div>
                        <div class="h-fill w-fill" style="position: absolute; top: 50%; left: 5%;">
                            <div class="d-flex align-center justify-start fill-height flex-wrap">
                                <v-btn variant="flat" v-for="(genre, index) in slide.genres" :key="index" class="me-3 mb-3"
                                    color="info">
                                    <p class="text-white">{{ genre?.name }}</p>
                                </v-btn>
                            </div>
                            <div class="d-flex align-center justify-start fill-height flex-wrap">
                                <v-btn variant="flat" v-for="(genre, index) in slide.genres" :key="index" class="me-3 mb-3"
                                    color="info">
                                    <p class="text-white">{{ genre?.name }}</p>
                                </v-btn>
                            </div>
                            <div>
                                <h1>{{ slide.title }}</h1>
                            </div>
                            <div class="w-50">
                                <p>{{ truncate(slide?.synopsis, 200) }}</p>
                            </div>
                            <div class="mt-10">
                                <v-btn variant="flat" color="info" append-icon="mdi-arrow-right-box"
                                    @click="snackbar = !snackbar">Lihat Lebih
                                    Lanjut</v-btn>
                                <v-snackbar v-model="snackbar" location="bottom" color="info">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis
                                    est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque
                                    veniam neque porro libero rerum unde voluptatem!

                                    <template v-slot:actions>
                                        <v-btn @click="snackbar = false">Close</v-btn>
                                    </template>
                                </v-snackbar>
                            </div>
                        </div>
                    </v-img>
                </v-carousel-item>
            </v-carousel>
            <v-skeleton-loader v-else type="image">
                <div v-for="i in 4" :key="i">
                    <v-img :src="items[i]?.src" cover></v-img>
                </div>
            </v-skeleton-loader>
            <v-row v-if="!isLoading" align-content="space-between" class="mt-5">
                <v-col cols="3" v-for="items in animeData?.data" :key="items.mal_id">

                    <v-img height="318" width="100%" cover :src='items.images.jpg.large_image_url' class="text-white">

                    </v-img>
                    <div class="d-flex align-center justify-start">
                        <v-btn variant="tonal" color="info" size="small" class="mt-2 me-2" rounded="xl">{{ items?.type
                        }}</v-btn>
                        <v-btn variant="tonal" color="info" size="small" class="mt-2 me-2" rounded="xl">{{
                            items?.source }}</v-btn>
                    </div>
                    <h3>{{ items.title }}</h3>
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