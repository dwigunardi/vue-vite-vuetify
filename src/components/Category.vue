<script setup>
import { ref, onMounted, reactive } from 'vue'
import useGenres from '../repository/getGenres';
import MainLayout from './layout/MainLayout.vue';

const filter = ref('genres')
const { data, isLoading, error, execute } = useGenres();
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

</script>

<template>
    <MainLayout>
        <v-parallax src="/banner-category.jpeg" height="300" scale="1">
            <div class="bg-primary h-100 w-fill" style="opacity: 0.5; position: relative"></div>
            <div class="text-center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <h1 class="text-h4 font-weight-bold mb-4 text-center text-light-blue-5">
                    Category Anime
                </h1>
                <h4 class="subheading text-center text-light-blue-5">
                    Choose Your Own Poison!
                </h4>
            </div>
        </v-parallax>
        <div class="d-flex justify-start align-center w-100">
            <div class=" text-h3 my-3 mr-3 text-red">|</div>
            <div class="text-h4 my-3 text-capitalize font-weight-bold w-100 d-flex align-center justify-space-between"
                style="color: var(--v-primary-base);">
                <p>{{ filter == 'genres' ? 'Semua Genres' : 'Status' }}</p>
                <div class="text-center">
                    <span class="text-h6">Tipe : </span>
                    <v-select v-model="filter"  :items="filterList"
                                item-title="label" item-value="name" label="Select" persistent-hint return-object
                                single-line></v-select>
                </div>

            </div>
        </div>
    </MainLayout>
</template>