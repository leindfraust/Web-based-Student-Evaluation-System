<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
import CatchErr from '@/components/CatchErr.vue';
import { useCredentialsStore } from '@/stores/CredentialInformation';

const store = useCredentialsStore()

const handlerInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const handlerID = ref(handlerInfo.value._id)

const logs = ref()
const searchBar = ref('')

const errMsg = ref('')
const errCode = ref('')

const logSearchable = computed(() => {
    return logs.value ? logs.value.filter((log: Record<string, string>) => log.handlerID.toLowerCase().includes(searchBar.value.toLowerCase()) || log.handlerName.toLowerCase().includes(searchBar.value.toLowerCase()) || log.activity.toLowerCase().includes(searchBar.value.toLowerCase())) : []
})
onBeforeMount(async () => {
    await axios.get('/api/logs').then(response => logs.value = response.data).catch(err => {
        errMsg.value = err.message
        errCode.value = err.code
    })
})

</script>
<template>
    <div class="main-wrapper">
        <div class="columns">
            <div class="column is-2">
                <NavPanel />
            </div>
            <div class="column">
                <section class="section">
                    <CatchErr :err-code="errCode" :err-message="errMsg" />
                    <div class="field header-control">
                        <div class="control has-icons-right">
                            <input type="text" class="input is-rounded is-medium" placeholder="Search..."
                                v-model="searchBar" />
                            <span class="icon is-right">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                    <div class="container">
                        <div class="notification" v-for="log in logSearchable.reverse()" :key="log._id"
                            :class="{ 'is-info': log.type == 'EDIT', 'is-success': log.type == 'ADD', 'is-danger': log.type == 'DELETE' }">
                            <b>{{ handlerID == log.handlerID ? log.handlerName + '(You)' : log.handlerName }}</b>:
                            {{ log.activity }}
                            <span class="is-pulled-right">{{ new Date(log.time).toLocaleString() }}</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>