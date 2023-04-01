<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';

</script>
<template>
    <div class="main-wrapper">
        <div class="columns">
            <div class="column is-2">
                <NavPanel />
            </div>
            <div class="column">
                <section class="section">
                    <h1 class="title is-1 notification is-link">This section is still in development</h1>
                </section>
            </div>
        </div>
    </div>
</template>
<style>
.main-wrapper::-webkit-scrollbar {
    display: none
}
</style>