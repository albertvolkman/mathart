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
        <div class="collection with-header">
            <div class="row">
                <input placeholder="First Name" type="text" class="validate" v-model="profile.firstname" />
                <input placeholder="Last Name" type="text" class="validate" v-model="profile.lastname" />
                <input placeholder="Extended Name" type="text" class="validate" v-model="profile.extendedname" />
                <input placeholder="Position" type="text" class="validate" v-model="profile.position" />
                <input placeholder="Affiliation" type="text" class="validate" v-model="profile.affiliation" />
                <input placeholder="Location" type="text" class="validate" v-model="profile.location" />
                <input placeholder="Email" type="text" class="validate" v-model="profile.email" />
                <input placeholder="ICERM Dates" type="text" class="validate" v-model="profile.icerm_dates" />
                <input placeholder="Website" type="text" class="validate" v-model="profile.website" />
                <input placeholder="Statement" type="text" class="validate" v-model="profile.statement" />
                <input placeholder="Artwork Info" type="text" class="validate" v-model="profile.artwork_info" />
                <input placeholder="Timeframe" type="text" class="validate" v-model="profile.timeframe" />
                <input placeholder="License" type="text" class="validate" v-model="profile.license" />
            </div>
            <div class="input-field col s2">
                <button class="btn" @click="updateProfile">Update</button>
            </div>
        </div>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebaseApp from "../firebaseInit.js";
import { getFirestore, collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
    data() {
        return {
            user: null,
            profile: {
                firstname: "",
                lastname: "",
                extendedname: "",
                position: "",
                affiliation: "",
                location: "",
                email: "",
                icerm_dates: "",
                website: "",
                statement: "",
                artwork_info: "",
                timeframe: "",
                license: ""
            }
        };
    },
    components: { navigation },
    methods: {
        addProfile() {
            addDoc(collection(db, "users", auth.currentUser.uid, "profile"), {
                firstname: this.profile.firstname,
                lastname: this.profile.lastname,
                extendedname: this.profile.extendedname,
                position: this.profile.position,
                affiliation: this.profile.affiliation,
                location: this.profile.location,
                email: this.profile.email,
                icerm_dates: this.profile.icerm_dates,
                website: this.profile.website,
                statement: this.profile.statement,
                artwork_info: this.profile.artwork_info,
                timeframe: this.profile.timeframe,
                license: this.profile.license,
                createdAt: new Date(),
                isCompleted: false
            });
        },
        async getProfile() {
            const profileRef = doc(db, "users", auth.currentUser.uid, "profile", "main");
            const profileSnap = await getDoc(profileRef);

            if (profileSnap.exists()) {
                this.profile = profileSnap.data();
            }
        },
        updateProfile(e) {
            const profileRef = doc(db, "users", auth.currentUser.uid, "profile", "main");
            setDoc(profileRef, this.profile);
        }
    },
    created() {
        onAuthStateChanged(auth, user => {
            if (user) {
                this.user = user;
            }
        });
        this.getProfile();
    }
};
</script>
