import { defineStore } from 'pinia'

export const useCredentialsStore = defineStore('CredentialStore', {
    state: () => ({
        credentials: {}
    }),
    persist: true
})
