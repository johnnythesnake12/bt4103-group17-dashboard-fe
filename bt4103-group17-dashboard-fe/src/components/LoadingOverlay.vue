<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
    <div class="spinner"></div>
    <span class="ml-4 text-xl font-semibold text-gray-700">Loading Data...</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.z-50 {
  z-index: 9999;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.8);
}

.bg-opacity-70 {
  background-color: rgba(255, 255, 255, 0.7);
}

/* Spinner styles */
.spinner {
  width: 64px;
  height: 64px;
  border: 6px solid #e0e0e0;
  border-top: 6px solid #3b82f6; /* blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
