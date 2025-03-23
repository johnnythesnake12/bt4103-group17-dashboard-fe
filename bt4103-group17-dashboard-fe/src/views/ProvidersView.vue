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
export default {
  name: "ProvidersView",
  data() {
    return {
      search: "",
      providers: [
        {
          provider_id: 1,
          provider_name: "Siloam Hospitals Jakarta",
          provider_type: "Hospital",
          address: "Jl. MH Thamrin No. 10",
          city: "Jakarta",
          state_region: "DKI Jakarta",
          country: "Indonesia",
          longitude: "106.84513",
          latitude: "-6.20876"
        },
        {
          provider_id: 2,
          provider_name: "Cipto Mangunkusumo Hospital",
          provider_type: "Hospital",
          address: "Jl. Diponegoro No. 12",
          city: "Jakarta",
          state_region: "DKI Jakarta",
          country: "Indonesia",
          longitude: "106.84513",
          latitude: "-6.20876"
        },
        {
          provider_id: 3,
          provider_name: "Bach Mai Hospital",
          provider_type: "Hospital",
          address: "No.78 Giang Vo, Hai Ba Trung",
          city: "Hanoi",
          state_region: "Hanoi",
          country: "Vietnam",
          longitude: "105.83416",
          latitude: "21.02776"
        },
        {
          provider_id: 4,
          provider_name: "FV Hospital Ho Chi Minh City",
          provider_type: "Hospital",
          address: "1 Phan Van Tri, District 7",
          city: "Ho Chi Minh City",
          state_region: "HCMC",
          country: "Vietnam",
          longitude: "106.69365",
          latitude: "10.76263"
        },
        {
          provider_id: 5,
          provider_name: "Singapore General Hospital",
          provider_type: "Hospital",
          address: "Outram Rd, Singapore 169608",
          city: "Singapore",
          state_region: "Singapore",
          country: "Singapore",
          longitude: "103.83244",
          latitude: "1.27835"
        },
        {
          provider_id: 6,
          provider_name: "Raffles Medical Clinic",
          provider_type: "Clinic",
          address: "1 Raffles Place, Singapore 048616",
          city: "Singapore",
          state_region: "Singapore",
          country: "Singapore",
          longitude: "103.85196",
          latitude: "1.28424"
        },
        {
          provider_id: 7,
          provider_name: "Bumrungrad International Hospital",
          provider_type: "Hospital",
          address: "33 Sukhumvit 3, Wattana",
          city: "Bangkok",
          state_region: "Bangkok",
          country: "Thailand",
          longitude: "100.56933",
          latitude: "13.73730"
        },
        {
          provider_id: 8,
          provider_name: "BNH Hospital",
          provider_type: "Hospital",
          address: "9 South Sathorn Road, Bang Rak",
          city: "Bangkok",
          state_region: "Bangkok",
          country: "Thailand",
          longitude: "100.52318",
          latitude: "13.72357"
        },
        {
          provider_id: 9,
          provider_name: "Prince Court Medical Centre",
          provider_type: "Hospital",
          address: "7 Jalan Kia Peng, Kuala Lumpur",
          city: "Kuala Lumpur",
          state_region: "Kuala Lumpur",
          country: "Malaysia",
          longitude: "101.68685",
          latitude: "3.15236"
        },
        {
          provider_id: 10,
          provider_name: "Pantai Hospital Kuala Lumpur",
          provider_type: "Hospital",
          address: "No.8, Jalan 5/109, Bandar Utama, Petaling Jaya",
          city: "Petaling Jaya",
          state_region: "Selangor",
          country: "Malaysia",
          longitude: "101.64454",
          latitude: "3.10731"
        }
      ],
      headers: [
        { text: "ID", value: "provider_id" },
        { text: "Name", value: "provider_name" },
        { text: "Type", value: "provider_type" },
        { text: "Address", value: "address" },
        { text: "City", value: "city" },
        { text: "State/Region", value: "state_region" },
        { text: "Country", value: "country" },
        { text: "Longitude", value: "longitude" },
        { text: "Latitude", value: "latitude" }
      ]
    };
  }
};
</script>

<style scoped>
</style>
