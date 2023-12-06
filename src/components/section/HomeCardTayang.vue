<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// Define props using defineProps()
const props = defineProps({
    // Prop name: Prop type (optional)
    title: String,
    subtitle: String,
    description: String,
    data: Object || Array,
    isLoading: Boolean
});

</script>

<template>
    <div class="d-flex justify-start align-center w-100">
        <div class=" text-h3 my-3 mr-3 text-red">|</div>
        <div
            class="text-h4 my-3 text-white text-capitalize font-weight-bold w-100 d-flex align-center justify-space-between">
            <p>{{ props.title }}</p>
            <v-btn variant="tonal" color="info" size="small" class="mt-2 me-2" rounded="xl">Lihat Semua</v-btn>
        </div>
    </div>
    <v-row v-if="!props.isLoading" align-content="space-between" class="mt-5">
        <v-col cols="3" v-for="items in props.data" :key="items.mal_id">
            <v-hover> <template v-slot:default="{ isHovering, props }">
                    <v-img height="318" width="100%" cover :src="items.images.jpg.large_image_url"
                        @click="router.push(`/anime/${items.mal_id}`)" v-bind="props" style="cursor: pointer;"
                        class="text-white">
                        <v-overlay :model-value="isHovering" contained scrim="secondary"
                            class="align-center justify-center">
                            <v-btn variant="flat">See more info</v-btn>
                        </v-overlay>
                    </v-img>
                </template></v-hover>


            <div class="d-flex align-center justify-start">
                <v-btn variant="tonal" color="info" size="small" class="mt-2 me-2" rounded="xl">{{ items?.type
                }}</v-btn>
                <v-btn variant="tonal" color="info" size="small" class="mt-2 me-2" rounded="xl">{{ items?.source
                }}</v-btn>
                <v-btn variant="tonal" color="info" size="small" class="mt-2 me-2" prepend-icon="mdi-star" rounded="xl">{{
                    items?.score }}</v-btn>
            </div>
            <h3>{{ items.title }}</h3>
        </v-col>
    </v-row>

    <v-row v-else>
        <v-col v-for="i in 12" :key="i" cols="4">
            <v-skeleton-loader :elevation="10" color="accent" type="card" height="318"></v-skeleton-loader>
        </v-col>
    </v-row>
</template>