<template>
  <div id="app">
    <transition name="fade">
      <div class="aurora-outer">
        <div class="aurora-inner"></div>
        <b-row class="h-100 wrapper">
          <b-col cols="2" class="h-100 wrapper">
            <sidebar></sidebar>
          </b-col>
          <b-col cols="10" class="test">
            <transition name="fade">
              <router-view />
            </transition>
          </b-col>
        </b-row>
      </div>
    </transition>
  </div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
export default {
  name: "App",
  components: { sidebar },
};
</script>

<style>
.test {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: Signika;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
.aurora-outer {
  background: linear-gradient(132deg, #0c5f32, #058639, #020b5f);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0px;
}

.login-button {
  background: linear-gradient(132deg, #020b5f, #009137);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  border: none !important;
}
.aurora-inner {
  background: radial-gradient(rgba(5, 146, 69, 0), rgba(3, 136, 32, 0.2));
  background-size: 200%;
}
.wrapper {
  padding: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  width: 100% !important;
  /*max-width: 100% !important; */
  transition-property: height, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-to {
  position: absolute;
  opacity: 0;
  width: 100% !important;
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@font-face {
  font-family: "Signika";
  src: url(assets/fonts/Signika-Regular.ttf) format("truetype");
}
</style>
