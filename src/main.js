// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: "AIzaSyAdL49vVquHmI0-640qf6Z0lqOgC0yrUv4",
  authDomain: "mathart-aa4c0.firebaseapp.com",
  projectId: "mathart-aa4c0",
  storageBucket: "mathart-aa4c0.appspot.com",
  messagingSenderId: "850999976253",
  appId: "1:850999976253:web:bffed19e96ffc5e6a0a554"
};

firebase.initializeApp(firebaseConfig);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },

  template: '<App/>'
})
