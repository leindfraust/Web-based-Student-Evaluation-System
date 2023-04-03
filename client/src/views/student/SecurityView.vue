<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useCredentialsStore } from '@/stores/CredentialInformation';
import CatchErr from '@/components/CatchErr.vue';

const store = useCredentialsStore()

const errCode = ref('')
const errMsg = ref('')

const handlerInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const handlerDocID = ref(handlerInfo.value._id)

const newHandlerInfo = ref()
const oldPassword = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')
const wrongOldPassword = ref(false)
const passwordChanged = ref(false)

onMounted(async () => {
    await axios.post('/api/account/inquire', {
        id: handlerDocID.value
    }).then(response => newHandlerInfo.value = response.data).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
})

const comparePassword = computed(() => {
    if (newPassword.value == repeatNewPassword.value) {
        return true
    } else {
        return false
    }
})

async function changePassword() {
    wrongOldPassword.value = false
    passwordChanged.value = false
    if (oldPassword.value == newHandlerInfo.value.password && comparePassword.value) {
        await axios.put(`/api/account/${handlerDocID.value}`, {
            password: newPassword.value
        }).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        oldPassword.value = ''
        newPassword.value = ''
        repeatNewPassword.value = ''
        passwordChanged.value = true
    } else {
        if (comparePassword.value) wrongOldPassword.value = true
    }
}

</script>
<template>
    <div class="">
        <div class="columns">
            <div class="column is-2">
                <NavPanel />
            </div>
            <div class="column">
                <section class="section is-medium">
                    <div class="container is-fluid">
                        <CatchErr :err-code="errCode" :err-message="errMsg" />
                        <div class="box">
                            <div class="field">
                                <label class="label">Old Password</label>
                                <div class="control">
                                    <input type="password" class="input" v-model="oldPassword" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">New Password</label>
                                <div class="control">
                                    <input type="password" class="input" v-model="newPassword" />
                                </div>
                                <div class="help is-danger" v-if="!comparePassword">Password not matched.</div>
                            </div>
                            <div class="field">
                                <label class="label">Repeat New Password</label>
                                <div class="control">
                                    <input type="password" class="input" v-model="repeatNewPassword" />
                                </div>
                                <div class="help is-danger" v-if="!comparePassword">Password not matched.</div>
                            </div>
                            <div class="notification is-warning" v-if="wrongOldPassword">Your old password is incorrect.
                                Please try again or contact your school administrator to have your password changed in case
                                if you forgot your old password.</div>
                            <div class="notification is-success" v-if="passwordChanged">You have successfuly changed your
                                password.</div>
                            <div class="buttons">
                                <button class="button is-success" @click="changePassword"
                                    :disabled="oldPassword == '' || newPassword == '' || repeatNewPassword == ''">Confirm</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>