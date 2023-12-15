<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import DrawerRight from './DrawerRight.vue';
import DrawerLeft from './DrawerLeft.vue';
import { ref, watch } from 'vue';
import { useSearchValue } from '../../store/searchValue';
import { useRouter } from 'vue-router';
const { isSearch, searchValue, } = useSearchValue();
const router = useRouter();
const isDetail = ref(false);
const updateIsSearch = (newValue) => {
    isSearch.value = newValue;
    console.log(newValue, 'ew')
};

</script>
<template>
    <v-layout class="rounded rounded-md">
        <v-app>
            <DrawerLeft />
            <DrawerRight />
            <Navbar :isSearch="isSearch" @update:isSearch="updateIsSearch" />
            <v-main class="bg-accent">
                <v-container :fluid="router.currentRoute.value.path.includes('/anime/') ? true : false">
                    <slot></slot>
                </v-container>
            </v-main>
            <Footer />
        </v-app>

    </v-layout>
</template>

<style>
*::-webkit-scrollbar {
  background-color: transparent; /* Change to your desired color */
}

*::-webkit-scrollbar-thumb {
  background-color: #2196F3;
  border-radius: 10px;
  border: 3px solid transparent;
  background-clip: content-box;
}
</style>