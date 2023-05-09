<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import CatchErr from '@/components/CatchErr.vue';
import { useCredentialsStore } from '@/stores/CredentialInformation';
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { recordLog } from '@/composables/recordLog';

const { updateLog } = recordLog()

const store = useCredentialsStore()
const storeInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const accountHandlerType = ref(storeInfo.value.accountType)

const accounts = ref()

const errCode = ref('')
const errMsg = ref('')
const searchBar = ref('')

const accountName = ref('')
const accountUsername = ref('')
const accountPassword = ref('')
const accountType = ref('Admin')

const accountControl = ref(false)
const editAccountControl = ref('')

const accountsFiltered = computed(() => accounts.value.filter((account: Record<string, string>) => account.name.toLowerCase().includes(searchBar.value.toLowerCase())))

onMounted(async () => {
    await axios.get('/api/account').then(response => accounts.value = response.data).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
})

async function accountAdd() {
    if (accountHandlerType.value == 'Admin' && accountName.value !== '' && accountUsername.value !== '' && accountPassword.value !== '') {
        await axios.post('/api/account', {
            name: accountName.value,
            username: accountUsername.value,
            password: accountPassword.value,
            accountType: accountType.value,
            handler: accountType.value == 'Student' ? 'student' : 'admin'
        }).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        await axios.get('/api/account').then(response => accounts.value = response.data).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        updateLog(`Added account named: ${accountName.value}`, 'ADD').catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        clearFields()
        accountControl.value = false
    }
}

function accountEditModal(account: Record<string, string>) {
    if (accountHandlerType.value == 'Admin') {
        editAccountControl.value = account._id
        accountControl.value = true
        accountName.value = account.name
        accountUsername.value = account.username
        accountPassword.value = account.password
        accountType.value = account.accountType
    }
}

async function accountEdit() {
    if (accountHandlerType.value == 'Admin' && accountName.value !== '' && accountUsername.value !== '' && accountPassword.value !== '') {
        await axios.put(`/api/account/${editAccountControl.value}`, {
            name: accountName.value,
            username: accountUsername.value,
            password: accountPassword.value,
            accountType: accountType.value
        }).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        await axios.get('/api/account').then(response => accounts.value = response.data).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        updateLog(`Edited account of ${accountName.value}`, 'EDIT').catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        clearFields()
        editAccountControl.value = ''
        accountControl.value = false
    }
}

async function accountDelete() {
    await axios.delete(`/api/account/${editAccountControl.value}`).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
    await axios.get('/api/account').then(response => accounts.value = response.data).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
    updateLog(`Deleted account named: ${accountName.value}`, 'DELETE').catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
    clearFields()
    editAccountControl.value = ''
    accountControl.value = false
}

function clearFields() {
    editAccountControl.value = ''
    accountName.value = ''
    accountUsername.value = ''
    accountPassword.value = ''
    accountType.value = 'Admin'
}
</script>
<template>
    <div class="main-wrapper">
        <div class="columns">
            <div class="column is-2">
                <NavPanel />
            </div>
            <div class="column">
                <section class="section">

                    <div class="notification is-warning" v-if="accountHandlerType !== 'Admin'">As your account is not of the
                        <b>Admin</b> type, certain features will be restricted for you.
                    </div>

                    <div class="modal" :class="{ 'is-active': accountControl }">
                        <div class="modal-background"></div>
                        <div class="modal-content">
                            <div class="container is-fluid box">
                                <button class="button is-danger is-small" v-if="editAccountControl"
                                    @click="accountDelete">Delete account</button>
                                <h3 class="title is-3">{{ editAccountControl ? 'Update Account' : 'New account' }}</h3>
                                <div class="field">
                                    <label class="label">
                                        Account Type
                                    </label>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="accountType">
                                                <option value="Admin">Admin</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Student">Student</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">
                                        {{ accountType == 'Student' ? 'Student ID Number' : accountType == 'Teacher' ? 'Teacher Full Name' : 'Account Name' }}
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="accountName" />
                                        <div class="help" v-if="accountType == 'Teacher'">LAST NAME, FIRST NAME, MIDDLE INITIAL</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">
                                        Account Username
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="accountUsername" />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">
                                        Account Password
                                    </label>
                                    <div class="control">
                                        <input class="input" type="password" v-model="accountPassword" />
                                    </div>
                                </div>
                                <div class="buttons is-centered">
                                    <button class="button is-danger"
                                        @click="accountControl = false, clearFields()">Cancel</button>
                                    <button class="button is-success" @click="accountAdd()"
                                        v-if="!editAccountControl">Confirm</button>
                                    <button class="button is-info" v-else @click="accountEdit">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CatchErr :err-code="errCode" :err-message="errMsg" />
                    <div class="container">
                        <div class="columns has-text-centered">
                            <div class="column">
                                <div class="field header-control">
                                    <div class="control has-icons-right">
                                        <input type="text" class="input is-rounded is-medium" placeholder="Search..."
                                            v-model="searchBar" />
                                        <span class="icon is-right">
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control has-icons-right">
                                        <button class="button is-medium is-rounded" @click="accountControl = true"
                                            :disabled="accountHandlerType !== 'Admin'">Add
                                            Account &nbsp; <i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table-container" v-if="accounts">
                            <table class="table is-fullwidth is-hoverable" v-if="Object.keys(accounts).length !== 0">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="account, index in accountsFiltered" :key="account._id"
                                        @click="accountEditModal(account)">
                                        <th>{{ index + 1 }}</th>
                                        <td>{{ account.name }}</td>
                                        <td>{{ account.username }}</td>
                                        <td>{{ account.accountType }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="container" v-else>
                                <div class="notification is-info">Empty accounts</div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    </div>
</template>