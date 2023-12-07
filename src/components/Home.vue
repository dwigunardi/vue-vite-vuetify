<script setup>
import Navbar from "./layout/Navbar.vue";
import MainLayout from "./layout/MainLayout.vue";
import useTopAnime from "../repository/getTopAnime";
import useSeasonNow from "../repository/getSeasonsNow";
import useUpcomingAnime from "../repository/getUpcomingAnime";
import useSearchAnime from '../repository/getSearchAnime';
import { watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HomeCardTayang from "./section/HomeCardTayang.vue";
import { useSearchValue } from '../store/searchValue';
const page = ref(1)
const pageUp = ref(1)
const snackbar = ref(false);
const showOverlay = ref(false);
const dialog = ref(false);
const router = useRouter();

const items = [
    {
        src: "/banner-1.png",
    },
    {
        src: "/banner-2.jpg",
    },
    {
        src: "/banner-3.jpg",
    },
    {
        src: "/banner-4.jpg",
    },
];
function truncate(str, n) {
    return (str == null ? 0 : str?.length > n)
        ? str.slice(0, n - 1) + "...;"
        : str;
}
const handlePageChange = async (newValue) => {
    page.value = await newValue
    await execute({ params: { page: newValue, limit: 12, filter: 'tv' } });
    animeData = await data;
}

const handlePageChangeUp = async (newValue) => {
    pageUp.value = await newValue
    await executeUp({ params: { page: newValue, limit: 12, filter: "tv" } });
    animeUp = await upcoming
}

const { data, isFinished, isLoading, execute, error } = useSeasonNow();
const { data: upcoming, isFinished: upcomingFinished, isLoading: upcomingLoading, execute: executeUp, error: errorUp } = useUpcomingAnime();
const { data: dataRecomend, isFinished: isFinishedRecomend, isLoading: isLoadingRecomend, error: errorRecomend, execute: executeRecom } = useTopAnime()
const { isSearch, searchValue, searchData } = useSearchValue();
const { data: dataSearch, isFinished: isFinishedSearch, isLoading: isLoadingSearch, execute: executeSearch, error: errorSearch } = useSearchAnime(searchValue);
let animeData = data;
let animeRecom = dataRecomend
let animeUp = upcoming
let animeSearch = dataSearch

onMounted(() => {
    execute({ params: { page: 1, limit: 12, filter: 'tv' } })
    executeRecom({ params: { page: 1, limit: 8, filter: "airing", type: "tv" } })
})

watch(error, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        dialog.value = true
    } else {
        dialog.value = false
    }
})

watch(error, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        dialog.value = true
    } else {
        dialog.value = false
    }
})

const handleCloseDialog = () => {
    dialog.value = false
    window.location.reload()
}

</script>
<template>
    <div>
        <MainLayout>
            <v-dialog v-model="dialog" activator="parent" width="auto" v-if="error">
                <v-card color="info">
                    <v-card-text>
                        Terjadi Kesalahan Pada Server Mohon untuk Refresh Halaman ini.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" block @click="handleCloseDialog">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div v-else>
                <v-carousel v-if="!isLoadingRecomend" cycle height="600" hide-delimiter-background show-arrows="hover"
                    progress="info">
                    <v-carousel-item v-for="(slide, i) in animeRecom?.data" :key="i">
                        <v-img :src="slide.trailer.images.maximum_image_url" cover>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template>
                            <div class="bg-primary h-100 w-fill" style="opacity: 0.5; position: relative"></div>
                            <div class="h-fill w-fill" style="position: absolute; top: 40%; left: 5%">
                                <div class="d-flex align-center justify-start fill-height flex-wrap">
                                    <v-btn variant="flat" v-for="(genre, index) in slide.genres" :key="index"
                                        class="me-3 mb-3" color="info">
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
                                        @click="router.push(`/anime/${slide.mal_id}`)">Lihat Lebih Lanjut</v-btn>
                                </div>
                            </div>
                        </v-img>
                    </v-carousel-item>
                </v-carousel>
                <v-carousel v-else cycle height="600" hide-delimiter-background show-arrows="hover" progress="info">
                    <div v-for="i in 4" :key="i">
                        <v-img :src="items[i]?.src" cover></v-img>
                    </div>
                </v-carousel>
                <div v-if="isSearch">
                    <div v-if="errorSearch">
                        <h1>Error</h1>
                    </div>
                    <div v-else>
                        <HomeCardTayang :data="searchData?.data" :isLoading="isLoading"
                            :title="'Hasil Penelusuran Sedang Tayang'" />
                    </div>
                </div>
                <div v-else="!isSearch">
                    <HomeCardTayang :data="animeData?.data" :isLoading="isLoading" :title="'Sedang Tayang'" />
                </div>

                <div class="text-center my-5">
                    <div v-if="isSearch">
                        <v-pagination v-model="page" :length="animeSearch?.pagination?.last_visible_page" rounded="circle"
                            total-visible="7" @update:model-value="handlePageChange"></v-pagination>
                    </div>
                    <div v-else>
                        <v-pagination v-model="page" :length="animeData?.pagination?.last_visible_page" rounded="circle"
                            total-visible="7" @update:model-value="handlePageChange"></v-pagination>
                    </div>
                </div>
                <HomeCardTayang :data="animeUp?.data" :isLoading="upcomingLoading" :title="'Akan Datang'" />
                <div class="text-center my-5">
                    <v-pagination v-model="pageUp" :length="animeUp?.pagination?.last_visible_page" rounded="circle"
                        total-visible="7" @update:model-value="handlePageChangeUp"></v-pagination>
                </div>
            </div>

        </MainLayout>
    </div>
</template>

<style scoped>
.v-img:hover .hover-overlay {
    opacity: 1;
}
</style>
