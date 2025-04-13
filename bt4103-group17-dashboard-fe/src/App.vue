<template>
  <v-app>
    <SideBar />

    <v-main>
      <!-- Receive loading events from child pages -->
      <router-view @loading="setLoading" />
    </v-main>

    <!-- Global loading overlay -->
    <LoadingOverlay :show="isLoading" />
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'

export default {
  name: 'App',
  components: {
    SideBar,
    LoadingOverlay
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    setLoading(value) {
      this.isLoading = value
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
