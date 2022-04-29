import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Submissions from '@/components/Submissions'

import firebaseApp from "../firebaseInit.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
Vue.use(Router)

let router = new Router({
    mode: 'history',

    routes: [{
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
          auth: true
        }

      },
      {
        path: '/submission',
        name: 'Submissions',
        component: Submissions,
        meta: {
          auth: true
        }
      }, {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          guest: true
        }

      },
      {
        path: '/',
        name: 'Home',
        component: Home,

      }
    ]

  },

)


router.beforeEach((to, from, next) => {
  const auth = getAuth(firebaseApp);

  if (to.matched.some(record => record.meta.auth)) {
    onAuthStateChanged(auth, user => {
      if (user) {
        next()
      } else {
        next({
          path: "/login",
        })
      }
    })
  } else if (to.matched.some(record => record.meta.guest)) {
    onAuthStateChanged(auth, user => {
      if (user) {
        next({
          path: "/profile",
        })
      } else {
        next()
      }
    })

  } else {
    next()
  }

})

export default router
