<template>
  <div>
    <h1>Healthcare Providers</h1>
    <v-text-field
      v-model="search"
      label="Search Providers"
      class="mx-4"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="providers"
      class="elevation-1"
      :search="search"
    >
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ProvidersView",
  data() {
    return {
      search: "",
      providers: [],
      headers: [
        { title: "ID", key: "provider_id" },
        { title: "Name", key: "provider_name" },
        { title: "Type", key: "provider_type" },
        { title: "Address", key: "address" },
        { title: "City", key: "city" },
        { title: "State/Region", key: "state_region" },
        { title: "Country", key: "country" },
        { title: "Longitude", key: "longitude" },
        { title: "Latitude", key: "latitude" }
      ]
    };
  },
  mounted() {
    this.fetchProviders();
  },
  methods: {
    async fetchProviders() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/providers");
        this.providers = response.data; // Update the providers array with fetched data
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    }
  }
};
</script>

<style scoped>
</style>
