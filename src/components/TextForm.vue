<template>
  <form>
    <div class="flex items-center justify-center">
      <div
        class="items-center w-5/6 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
      >
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            v-model="text"
            id="comment"
            rows="7"
            class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write your Text to store in Couch DB..."
            required
          ></textarea>
        </div>
        <div
          class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600"
        >
          <button
            @click="saveText"
            type="button"
            class="py-2.5 px-4 text-md font-medium text-center text-white bg-sky-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-pink-500 hover:bg-blue-800"
          >
            Submit Text
          </button>
          <div class="flex pl-0 space-x-1 sm:pl-2"></div>
        </div>
      </div>
    </div>
  </form>

  <div class="h-screen bg-gradient-to-b from-gray-800 to-pink-500">
    <div class="flex items-center justify-center">
      <div
        class="items-center w-5/6 mb-4 py-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h3
          class="px-4 mb-2 text-sm tracking-tight text-gray-500 dark:text-white"
        >
          Submitted Text :
        </h3>
        <div class="flex items-center justify-center">
          <p
            class="flex text-center font-normal text-gray-700 dark:text-gray-400"
          >
            {{ savedText }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center">
      <div
        class="items-center w-5/6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h3
          class="text-center px-4 mb-2 text-sm tracking-tight text-gray-500 dark:text-white"
        >
          All Text data from Database
        </h3>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-pink-500 dark:bg-gray-700"
          >
            <tr>
              <th scope="col" class="px-6 py-3">ID</th>
              <th scope="col" class="px-6 py-3">Text</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="doc in documents"
              :key="doc._id"
            >
              <td scope="col" class="px-6 py-3">{{ doc._id }}</td>
              <td scope="col" class="px-6 py-3">{{ doc.text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import authentication from "pouchdb-authentication";
import { saveText, fetchAllDocuments } from "../pouchdb";

PouchDB.plugin(authentication);
export default {
  data() {
    return {
      text: "",
      savedText: "",
      documents: [],
    };
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async saveText() {
      if (!this.text) {
        return; // If text is empty or null, exit the method without submitting
      }
      try {
        const success = await saveText(this.text);
        if (success) {
          this.savedText = this.text;
          this.text = "";
        }

        // Fetch all documents after saving
        this.fetchData();
      } catch (error) {
        console.error(error);
      }
    },
    async fetchData() {
      try {
        this.documents = await fetchAllDocuments();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
textarea,
button {
  @apply block w-full;
}
</style>