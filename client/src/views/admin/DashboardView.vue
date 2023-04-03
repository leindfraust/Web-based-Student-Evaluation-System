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
                    <div class="columns">
                        <div class="column">
                            <iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="500" height="480" src="https://charts.mongodb.com/charts-project-0-brhno/embed/charts?id=642a3c6f-540b-4e17-8231-bcada0cd0e62&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                        </div>
                        <div class="column">
                            <iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="500" height="480" src="https://charts.mongodb.com/charts-project-0-brhno/embed/charts?id=642a3cd1-440a-4a2d-8b4a-5d4a1b69b639&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                        </div>
                    </div>
                    <p class="subtitle has-text-info has-text-centered">The data of the chart above refreshes every 1 hour.</p>
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