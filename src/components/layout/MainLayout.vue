<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import DrawerRight from './DrawerRight.vue';
import DrawerLeft from './DrawerLeft.vue';
import { ref, watch } from 'vue';
import { useSearchValue } from '../../store/searchValue';
const { isSearch, searchValue, } = useSearchValue();
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
                <v-container>
                    <slot></slot>
                </v-container>
            </v-main>
            <Footer />
        </v-app>

    </v-layout>
</template>