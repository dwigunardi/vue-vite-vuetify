<script setup>
import MainLayout from './layout/MainLayout.vue';
import { ref, onMounted } from 'vue';
import useRecentRecomendation from '../repository/getRecentRecomendation';
import HomeCardTayang from './section/HomeCardTayang.vue';
import { useRouter } from 'vue-router';
const { data, error, execute, isFinished, isLoading } = useRecentRecomendation()
const router = useRouter();
onMounted(() => {
    execute({ params: { page: 1, limit: 8 } })
})
let animeSuggestion = data
const page = ref(1)
const handlePageChange = async (newValue) => {
    page.value = await newValue
    await execute({ params: { page: newValue } });
    animeSuggestion = await data;
}
</script>


<template>
    <MainLayout>
        <v-parallax src="/suggestion-banner.jpeg" height="300" scale="0.8">
            <div class="d-flex flex-column fill-height justify-center align-center text-white">
                <h1 class="text-h4 font-weight-bold mb-4 text-center text-blue">
                    Suggestions Anime
                </h1>
                <h4 class="subheading text-center text-blue">
                    From User!
                </h4>
            </div>
        </v-parallax>
        <v-expansion-panels variant="inset" class="mt-5" v-if="!isLoading">
            <v-expansion-panel v-for="item in animeSuggestion?.data" :key="item.mal_id" bg-color="primary">
                <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                From : {{ item.user.username }}
                            </v-col>
                            <v-col cols="8" class="text-grey">
                                <v-fade-transition leave-absolute>
                                    <span v-if="expanded" key="0">
                                        {{ item.date.split('T')[0] }}
                                    </span>
                                    <span v-else key="1">
                                        {{ null }}
                                    </span>
                                </v-fade-transition>
                            </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>

                    <v-row no-gutters align-content="center" justify="space-evenly">
                        <v-col cols="3" v-for="anime in item.entry" :key="item.mal_id">
                            <a :href="anime.url" target="_blank"
                                class="text-decoration-none text-white text-h6 font-weight-bold hover">{{ anime.title }}</a>
                            <v-hover>
                                <template v-slot:default="{ isHovering, props }">
                                    <v-img height="80%" width="100%" :src="anime.images.jpg.image_url"
                                        @click="router.push(`/anime/${anime.mal_id}`)" v-bind="props"
                                        style="cursor: pointer;" class="text-white">
                                        <v-overlay :model-value="isHovering" contained scrim="secondary"
                                            class="align-center justify-center">
                                            <v-btn variant="flat">See more info</v-btn>
                                        </v-overlay>
                                        <template v-slot:error>
                                            <v-img class="mx-auto" height="300" max-width="500"
                                                src="https://picsum.photos/500/300?image=232"></v-img>
                                        </template>
                                    </v-img>
                                </template>
                            </v-hover>


                        </v-col>
                    </v-row>
                    <div class="mt-5">
                        {{ item.content }}
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-row v-else>
            <v-col v-for="i in 12" :key="i" cols="4">
                <v-skeleton-loader :elevation="10" color="accent" type="list-item-two-line"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-pagination v-model="page" :length="animeSuggestion?.pagination?.last_visible_page" rounded="circle"
            total-visible="7" @update:model-value="handlePageChange"></v-pagination>
    </MainLayout>
</template>