<template>
    <section>
        <navigation></navigation>
        <h5 class="center-align">Login</h5>
        <section id="firebaseui-auth-container"></section>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebaseApp from "../firebaseInit.js";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
    name: "Login",
    data() {
        return {};
    },
    components: {
        navigation
    },
    mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            const auth = getAuth(firebaseApp);
            ui = new firebaseui.auth.AuthUI(auth);
        }
        var uiConfig = {
            signInSuccessUrl: "/profile", // This redirect can be achived by route using callback.
            signInFlow: "popup",

            signInOptions: [
                FacebookAuthProvider.PROVIDER_ID,
                GoogleAuthProvider.PROVIDER_ID,
                EmailAuthProvider.PROVIDER_ID
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
};
</script>

<style>
</style>
