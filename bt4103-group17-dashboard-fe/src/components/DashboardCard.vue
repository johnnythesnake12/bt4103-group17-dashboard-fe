<template>
    <div class="dashboard-card">
        <div class="icon">{{ icon }}</div>
        <div class="details">
        <h2 class="value">{{ value }}</h2>
        <p class="title">{{ title }}</p>
        </div>
    </div>
</template>
  
<script setup>
defineProps({
icon: String,
title: String,
value: String
})
</script>
  
<style scoped>
.dashboard-card {
display: flex;
align-items: center;
padding: 16px;
background-color: white;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
font-size: 32px;
margin-right: 16px;
}

.value {
margin: 0;
font-size: 20px;
font-weight: bold;
}

.title {
margin: 0;
color: #555;
font-size: 14px;
}
</style>
