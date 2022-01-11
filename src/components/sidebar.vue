<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h6>menü</h6>
    </div>
    <div class="sidebar-body">
      <nav class="navbar navbar-light" id="nav">
        <ul class="navbar-nav">
          <b-nav-item>
            <router-link class="nav-item nav-link" to="/dashboard"
              >Dashboard</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-item nav-link" to="/hunts"
              >Vadászatok</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-item nav-link" to="/gallery"
              >Galéria</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-item nav-link" to="/contacts"
              >Kapcsolatok</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-item nav-link" to="/books"
              >Foglalások</router-link
            >
          </b-nav-item>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
};
</script>

<style>
.sidebar {
  background-color: rgba(255, 255, 255, 0.2);
  height: 100%;
}
.sidebar-header {
  padding-top: 15%;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold !important;
  border-bottom: 1px solid white;
}
.navbar {
  place-content: center !important;
}
</style>