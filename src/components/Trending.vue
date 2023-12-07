<template>
    <div>
        <MainLayout>

            <v-parallax src="/banner-3.jpg" height="300">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h1 class="text-h4 font-weight-thin mb-4">
                        Trending Anime
                    </h1>
                    <h4 class="subheading">
                        Seputar Anime!
                    </h4>
                </div>
            </v-parallax>
            <HomeCardTayang :data="animeRecom?.data" :isLoading="isLoading" :title="'Popular Anime'"
                :showIsLihatSemua="false" />
            <v-pagination v-model="page" :length="animeRecom?.pagination?.last_visible_page" rounded="circle"
                total-visible="7" @update:model-value="handlePageChange"></v-pagination>
        </MainLayout>
    </div>
</template>

<script setup>
import MainLayout from './layout/MainLayout.vue';
import { ref, onMounted } from 'vue';
import useTopAnime from '../repository/getTopAnime';
import HomeCardTayang from './section/HomeCardTayang.vue';
const { data, error, isLoading, execute, isFinished } = useTopAnime();
onMounted(() => {
    execute({ params: { page: 1, limit: 12, filter: 'airing', type: 'tv' } })
})
let animeRecom = data
const page = ref(1)
const handlePageChange = async (newValue) => {
    page.value = await newValue
    await execute({ params: { page: newValue, limit: 12, filter: 'airing', type: 'tv' } });
    animeRecom = await data;
}



</script>