<template>
  <div>
    <v-navigation-drawer app width="260" class="sidebar">
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.route"
          exact
          tag="router-link"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        items: [
          { text: "Home", icon: "mdi-home", route: "/" },
          { text: "Financial Performance", icon: "mdi-cash", route: "/financial" },
          { text: "Market Analysis", icon: "mdi-chart-bubble", route: "/marketanalysis" },
          { text: "Market Adoption", icon: "mdi-chart-line", route: "/adoptionrate" },
          // { text: "Map", icon: "mdi-map-marker", route: "/map" },
          { text: "Providers", icon: "mdi-hospital-building", route: "/providers" }

        ],
      };
    },
  };
</script>
  
<style scoped>
.sidebar {
  background-color : #1e132f;
  color: white;
}

.sidebar-item {
  color: white;
  transition: background-color 0.3s ease;
}


.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}


.icon {
  margin-right: 12px;
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
  