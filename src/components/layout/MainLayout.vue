<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import DrawerRight from './DrawerRight.vue';
import DrawerLeft from './DrawerLeft.vue';
</script>
<template>
    <v-layout class="rounded rounded-md">
        <v-app>
            <DrawerLeft />
            <DrawerRight />
            <Navbar />
            <v-main class="bg-accent">
                <v-container>
                    <slot></slot>
                </v-container>
            </v-main>
            <Footer />
        </v-app>

    </v-layout>
</template>