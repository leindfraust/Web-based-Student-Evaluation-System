<script lang="ts" setup>
import { useCredentialsStore } from '@/stores/CredentialInformation';
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useCredentialsStore()

const handlerInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const handlerName = ref(handlerInfo.value.name)
const handlerType = ref(handlerInfo.value.handler)
const isActiveNavMobile = ref(false)

async function logout() {
    await axios.delete('/session')
    store.$reset()
    router.push('/')
}
</script>
<template>
    <nav class="navbar is-hidden-desktop">
        <div class="navbar-brand">
            <a class="navbar-item">
                <label class="label">{{ handlerName }} ({{ handlerType }})</label>
            </a>
            <a role="button" class="navbar-burger" :class="{ 'is-active': isActiveNavMobile }" aria-label="menu"
                aria-expanded="false" data-target="navbar" @click="isActiveNavMobile = !isActiveNavMobile">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    </nav>

    <aside class="menu box"
        :class="{ 'is-hidden-mobile': !isActiveNavMobile, 'is-menu-fullheight-fullwidth': isActiveNavMobile }">
        <figure class="image is-128x128" style="margin: auto">
            <img src="../assets/logos/CASlogo.png" />
        </figure>
        <h2 class="title is-2 has-text-centered has-text-white is-hidden-mobile">{{ handlerName }}</h2>
        <p class="subtitle has-text-centered has-text-white is-hidden-mobile">({{ handlerType }})</p>
        <hr />
        <br />
        <ul class="menu-list has-text-centered" v-if="handlerType === 'admin'">
            <li><router-link :to="{ name: 'adminStudentRecords' }">STUDENT RECORDS</router-link></li>
            <li><router-link :to="{ name: 'adminSubjectRecords' }">SUBJECT RECORDS</router-link></li>
            <li><router-link :to="{ name: 'adminAccounts' }">ACCOUNTS</router-link></li>
            <li><router-link :to="{ name: 'adminSecurity' }">SECURITY</router-link></li>
            <li><a @click="logout">LOGOUT</a></li>
        </ul>
        <ul class="menu-list has-text-centered" v-else>
            <li><router-link :to="{ name: 'studentGrades' }">GRADES</router-link></li>
            <li><router-link :to="{ name: 'studentSecurity' }">SECURITY</router-link></li>
            <li><a @click="logout">LOGOUT</a></li>
        </ul>
    </aside>
</template>
<style scoped>
.menu {
    background: url('../assets/background/nav-background.svg') no-repeat center;
    background-size: cover;
    width: 204.5px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
}

.is-menu-fullheight-fullwidth {
    height: 100% !important;
    width: 100% !important;
    position: static !important;
}

.box {
    border-radius: 0 !important;
}

li>a {
    color: white !important;
    margin-bottom: 15%
}

li>a:hover {
    background-color: rgb(31, 31, 31) !important;
    border-radius: 25px
}

@media (max-width: 991.98px) {
    .menu {
        width: 100% !important
    }
}
</style>