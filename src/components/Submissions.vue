<template>
    <section>
        <navigation></navigation>
        <h5 class="center-align">Submissions</h5>
        <ul class="collection with-header">
            <li class="collection-header">
                <div class="row">
                    <div class="input-field col s10">
                        <input placeholder="Title" type="text" class="validate" v-model="submission.title" />
                        <input placeholder="Dimensions" type="text" class="validate" v-model="submission.dimensions" />
                        <input placeholder="Height" type="text" class="validate" v-model="submission.dimensions_height" />
                        <input placeholder="Width" type="text" class="validate" v-model="submission.dimensions_width" />
                        <input placeholder="Depth" type="text" class="validate" v-model="submission.dimensions_depth" />
                        <input placeholder="Medium" type="text" class="validate" v-model="submission.medium" />
                        <input placeholder="Year" type="text" class="validate" v-model="submission.year" />
                        <input placeholder="Description" type="text" class="validate" v-model="submission.description" />
                        <input placeholder="Math Category" type="text" class="validate" v-model="submission.math_category" />
                        <input placeholder="More Information URL" type="text" class="validate" v-model="submission.more_information_url" />
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
            >
                {{submission.title}}
            </li>
        </ul>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebaseApp from "../firebaseInit.js";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, doc, getDocs, addDoc, updateDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            submissions: [],
            submission: {
                image: "",
                title: "",
                dimensions: "",
                dimensions_height: 0,
                dimensions_width: 0,
                dimensions_depth: 0,
                medium: "",
                year: "",
                description: "",
                math_category: "",
                math_category_icerm: "",
                other_math_category: "",
                more_information_url: ""
            }
        };
    },
    created() {
        this.getSubmissions();
    },
    components: { navigation },
    methods: {
        addSubmission() {
            addDoc(collection(db, "users", auth.currentUser.uid, "submissions"), {
                image: this.submission.image,
                title: this.submission.title,
                dimensions: this.submission.dimensions,
                dimensions_height: this.submission.dimensions_height,
                dimensions_width: this.submission.dimensions_width,
                dimensions_depth: this.submission.dimensions_depth,
                medium: this.submission.medium,
                year: this.submission.year,
                description: this.submission.description,
                math_category: this.submission.math_category,
                math_category_icerm: this.submission.math_category_icerm,
                other_math_category: this.submission.other_math_category,
                more_information_url: this.submission.more_information_url,
                createdAt: new Date(),
            });
        },
        async getSubmissions() {
            const q = query(collection(db, "users", auth.currentUser.uid, "submissions"));
            const querySnapshot = await getDocs(q);

            this.submissions = [];
            querySnapshot.forEach(doc => {
                var submission = doc.data();
                submission.id = doc.id;
                this.submissions.push(submission);
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

