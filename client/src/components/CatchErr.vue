<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
    errMessage: String,
    errCode: String
})

const errCode = computed(() => props.errCode)
const errMessage = computed(() => props.errMessage)
</script>
<template>
    <div class="notification box is-danger" v-if="errCode || errMessage">
        Something went wrong, please try again later or contact your administrator. Error Code: {{ errCode }}. Error
        Message: {{ errMessage }}
    </div>
</template>