<template>
    <nav>
        <div class="nav-wrapper">
            <!-- <a href="#" class="brand-logo">Logo</a> -->
            <router-link to="/" class="brand-logo" tag="a">Home</router-link>

            <ul id="nav-mobile" class="right">
                <li v-show="!user">
                    <router-link to="/login">Login</router-link>
                </li>
                <li v-show="user">
                    <router-link to="/submission">Submissions</router-link>
                </li>
                <li v-show="user">
                    <router-link to="/profile">Profile</router-link>
                </li>
                <li v-show="user">
                    <a @click="signoutButtonPressed">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import firebaseApp from "../firebaseInit.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    data() {
        return {
            user: null
        };
    },
    created() {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, user => {
            this.user = user;
        });
    },
    methods: {
        signoutButtonPressed(e) {
            const auth = getAuth(firebaseApp);
            e.stopPropagation();
            auth().signOut();
            this.$router.push({ name: "Login" });
        }
    }
};
</script>

