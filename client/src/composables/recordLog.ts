import axios from 'axios'
import { ref } from 'vue'
import { useCredentialsStore } from '@/stores/CredentialInformation'

const store = useCredentialsStore()

const handlerInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const handlerID = ref(handlerInfo.value._id)
const handlerName = ref(handlerInfo.value.name)

export function recordLog() {
    async function updateLog(activity: string, type: string) {
        try {
            await axios.post('/api/logs', {
                handlerID: handlerID.value,
                handlerName: handlerName.value,
                type: type, //3 types: ADD, EDIT, DELETE
                activity: activity,
                time: new Date()
            })
        } catch (err) {
            return err
        }
    }
    return {
        updateLog
    }
}