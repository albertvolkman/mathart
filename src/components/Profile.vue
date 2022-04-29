<template>
    <section>
        <navigation></navigation>
        <h5 class="center-align">Profile</h5>

        <div class="card horizontal" style="max-width:400px;margin:0 auto;" v-if="user">
            <div class="card-image" style="margin-top:25px;margin-left:10px;">
                <img
                    :src="user.photoURL"
                    style="width:75px;height:75px;border-radius:50%;border:4px solid #333"
                />
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        name:
                        <strong>{{user.displayName}}</strong>
                        <br />email:
                        <strong>{{user.email}}</strong>
                        <br />uid:
                        <strong>{{user.uid}}</strong>
                        <br />provider:
                        <strong class="teal-text">{{user.providerData[0].providerId}}</strong>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebaseApp from "../firebaseInit.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    data() {
        return {
            user: null
        };
    },
    components: {
        navigation
    },
    created() {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, user => {
            if (user) {
                this.user = user;
            }
        });
    }
};
</script>
