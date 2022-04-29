<template>
    <section>
        <navigation></navigation>
        <h5 class="center-align">Submissions</h5>
        <ul class="collection with-header">
            <li class="collection-header">
                <div class="row">
                    <div class="input-field col s10">
                        <input placeholder="First Name" type="text" class="validate" v-model="submission.firstname" />
                        <input placeholder="Last Name" type="text" class="validate" v-model="submission.lastname" />
                        <input placeholder="Extended Name" type="text" class="validate" v-model="submission.extendedname" />
                        <input placeholder="Position" type="text" class="validate" v-model="submission.position" />
                        <input placeholder="Affiliation" type="text" class="validate" v-model="submission.affiliation" />
                        <input placeholder="Location" type="text" class="validate" v-model="submission.location" />
                        <input placeholder="Email" type="text" class="validate" v-model="submission.email" />
                        <input placeholder="ICERM Dates" type="text" class="validate" v-model="submission.icerm_dates" />
                        <input placeholder="Website" type="text" class="validate" v-model="submission.website" />
                        <input placeholder="Statement" type="text" class="validate" v-model="submission.statement" />
                        <input placeholder="Artwork Info" type="text" class="validate" v-model="submission.artwork_info" />
                        <input placeholder="Timeframe" type="text" class="validate" v-model="submission.timeframe" />
                        <input placeholder="License" type="text" class="validate" v-model="submission.license" />
                    </div>
                    <div class="input-field col s2">
                        <button class="btn" @click="addSubmission">Add</button>
                    </div>
                </div>
            </li>
            <li
                class="collection-item"
                v-for="submission in submissions"
                :key="submission.id"
                :class="{ fade: submission.isCompleted }"
            >
                {{submission.artwork_info}}
                <span class="secondary-content">
                    <label>
                        <input
                            type="checkbox"
                            class="filled-in"
                            :checked="submission.isCompleted"
                            @change="updateSubmission(submission.id, $event)"
                        />
                        <span></span>
                    </label>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebaseApp from "../firebaseInit.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            submissions: [],
            submission: {
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
    created() {
        this.getSubmissions();
    },
    components: { navigation },
    methods: {
        addSubmission() {
            db
                .collection("users")
                .doc(auth().currentUser.uid)
                .collection("submissions")
                .add({
                    firstname: this.submission.firstname,
                    lastname: this.submission.lastname,
                    extendedname: this.submission.extendedname,
                    position: this.submission.position,
                    affiliation: this.submission.affiliation,
                    location: this.submission.location,
                    email: this.submission.email,
                    icerm_dates: this.submission.icerm_dates,
                    website: this.submission.website,
                    statement: this.submission.statement,
                    artwork_info: this.submission.artwork_info,
                    timeframe: this.submission.timeframe,
                    license: this.submission.license,
                    createdAt: new Date(),
                    isCompleted: false
                });
        },
        async getSubmissions() {
            var submissionRef = await db
                .collection("users")
                .doc(auth().currentUser.uid)
                .collection("submissions");
            submissionRef.onSnapshot(snap => {
                this.submissions = [];
                snap.forEach(doc => {
                    var submission = doc.data();
                    submission.id = doc.id;
                    this.submissions.push(submission);
                });
            });
        },
        updateSubmission(docId, e) {
            var isChecked = e.target.checked;
            db
                .collection("users")
                .doc(auth().currentUser.uid)
                .collection("submissions")
                .doc(docId)
                .update({
                    isCompleted: isChecked
                });
        }
    }
};
</script>

<style>
.fade {
    opacity: 0.4 !important;
}
li {
    font-size: 1.3em;
}
.collection.with-header {
    max-width: 500px;
    margin: 0 auto;
}
</style>

