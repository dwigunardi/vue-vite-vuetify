<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import useGenres from '../repository/getGenres';
import MainLayout from './layout/MainLayout.vue';

const filter = ref('genres')
const { data, isLoading, error, execute } = useGenres();
let animeGenres = data
const obj = reactive({
    fav: true,
    menu: false,
    message: false,
    hints: true,
})
onMounted(() => {
    execute({ params: { filter: filter.value } });
})

const filterList = [
    {
        name: 'genres',
        label: 'Semua',
    },
    {
        name: 'explicit_genres',
        label: 'Explicit Genres',
    },
    {
        name: 'themes',
        label: 'Themes',
    },
    {
        name: 'demographics',
        label: 'Demographics',
    }
]
watch(filter, (newValue, oldValue) => {
    execute({ params: { filter: newValue.name } });
})
</script>

<template>
    <MainLayout>
        <v-container fluid>
        <v-parallax src="/banner-category.jpeg" height="600" scale="0.7">
            <div class="bg-primary h-100 w-fill" style="opacity: 0.2; position: relative"></div>
            <div class="text-center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <h1 class="text-h4 font-weight-bold mb-4 text-center text-light-blue-5">
                    Category Anime
                </h1>
                <h4 class="subheading text-center text-light-blue-5">
                    Choose Your Own Poison!
                </h4>
            </div>
        </v-parallax>
        </v-container>
        <div class="d-flex justify-start align-center w-100">
            <div class=" text-h3 my-3 mr-3 text-red">|</div>
            <div class="text-h4 my-3 text-capitalize font-weight-bold w-100 d-flex align-center justify-space-between"
                style="color: var(--v-primary-base);">
                <p>{{ filter == 'genres' ? 'Semua Genres' : filter.label == 'Semua' ? 'Semua Genres' : filter.label }}</p>
                <div class="text-center mt-2">
                    <v-select v-model="filter" :items="filterList" item-title="label" item-value="name" label="Select"
                        persistent-hint return-object ></v-select>
                </div>

            </div>
        </div>
        <v-divider></v-divider>
        <v-row v-if="!isLoading" justify="start" align-content="space-between" class="mt-5">
            <v-col v-for="items in animeGenres?.data" :key="items.mal_id" cols="3">
                <v-card class="mx-auto" max-width="300" variant="tonal" hover link>
                    <div class="py-4">
                    <h5 class="text-center font-weight-bold">{{ items?.name }}</h5>
                    <p class="text-center">Total: {{ items?.count }}</p>
                </div>
                </v-card>
            </v-col>
        </v-row>
        <div v-else>
            <v-row>
                <v-col v-for="i in 12" :key="i" cols="4">
                    <v-skeleton-loader type="paragraph" :loading="true"></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>
    </MainLayout>
</template>