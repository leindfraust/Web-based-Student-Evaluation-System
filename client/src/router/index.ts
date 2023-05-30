import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
import { useCredentialsStore } from '@/stores/CredentialInformation'

const routes: Array<RouteRecordRaw> = [
  //Base paths
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  //Student paths
  {
    path: '/student/grades',
    name: 'studentGrades',
    component: () => import('../views/student/GradesView.vue'),
    meta: {
      requiresAuthStudent: true
    }
  },
  {
    path: '/student/security',
    name: 'studentSecurity',
    component: () => import('../views/student/SecurityView.vue'),
    meta: {
      requiresAuthStudent: true
    }
  },
  //Admin paths
  {
    path: '/admin/records',
    name: 'adminStudentRecords',
    component: () => import('../views/admin/StudentRecordsView.vue'),
    meta: {
      requiresAuthAdmin: true
    }
  },
  {
    path: '/admin/subjects',
    name: 'adminSubjectRecords',
    component: () => import('../views/admin/SubjectRecordsView.vue'),
    meta: {
      requiresAuthAdmin: true
    }
  },
  {
    path: '/admin/accounts',
    name: 'adminAccounts',
    component: () => import('../views/admin/AccountsView.vue'),
    meta: {
      requiresAuthAdmin: true
    }
  },
  {
    path: '/admin/security',
    name: 'adminSecurity',
    component: () => import('../views/admin/SecurityView.vue'),
    meta: {
      requiresAuthAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Navigation Guards

//Admin Auth
router.beforeEach(async (to, from, next) => {
  const store = useCredentialsStore()
  let authenticated = false
  if (to.matched.some(route => route.meta.requiresAuthAdmin)) {
    await axios.get('/session').then(async response => {
      if (typeof response.data.data !== 'undefined' && response.data.data.handler == 'admin') {
        store.$patch({ credentials: response.data.data })
        authenticated = true
      } else {
        store.$reset()
        await axios.delete('/session')
        authenticated = false
      }
    })
    if (authenticated) {
      return next();
    } else {
      return next('/');
    }
  }
  next();
});

//Student Auth
router.beforeEach(async (to, from, next) => {
  const store = useCredentialsStore()
  let authenticated = false
  if (to.matched.some(route => route.meta.requiresAuthStudent)) {
    await axios.get('/session').then(async response => {
      if (typeof response.data.data !== 'undefined' && response.data.data.handler == 'student') {
        store.$patch({ credentials: response.data.data })
        authenticated = true
      } else {
        store.$reset()
        await axios.delete('/session')
        authenticated = false
      }
    })
    if (authenticated) {
      return next();
    } else {
      return next('/');
    }
  }
  next();
});
export default router
