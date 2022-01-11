<template>
  <b-container class="h-100">
    <b-row class="h-100" align-h="center" align-v="center">
      <b-col md="4" sm="7" cols="7">
        <form autocomplete="off" action="" @submit="onSubmit">
          <b-form-group>
            <h3>Üdvözöljük Istenünket!</h3>
            <h5>Kérjük jelentkezzen be</h5>
          </b-form-group>
          <b-form-group>
            <b-input
              v-model="form.email"
              placeholder="Felhasználónév"
              class="username"
            >
            </b-input>
          </b-form-group>
          <b-form-group>
            <b-input
              v-model="form.password"
              placeholder="Jelszó"
              class="password"
              type="password"
            >
            </b-input>
          </b-form-group>
          <b-form-group>
            <b-button
              class="login-button"
              type="button"
              @click="login()"
              variant="success"
              >Bejelentkezés</b-button
            >
          </b-form-group>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-auth";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      user: "",
    };
  },
  created() {},
  methods: {
    async login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password);
      const user = await firebase.auth().currentUser.getIdToken();
      console.log(user);
      this.$store.commit("setToken", user);
    },

    async onSubmit() {
      // const resp = await fetch("https://localhost:44326/api/account", {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-type": "application/json",
      //   },
      //   method: "post",
      //   body: JSON.stringify(this.form),
      // });
      // // const data = await resp.json();
    },
  },
};
</script>
<style scoped>
input {
  border-radius: 1rem !important;
  background: transparent;

  background-image: url("data:image/svg+xml,%3Csvg data-v-41be6633='' viewBox='0 0 16 16' width='1em' height='1em' focusable='false' role='img' aria-label='person fill' xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi-person-fill mx-auto b-icon bi'%3E%3Cg data-v-41be6633=''%3E%3Cpath d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  padding-left: 30px;
  background-position-x: 90%;
  background-position-y: center;
  color: white !important;
}
::placeholder {
  color: white !important;
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white !important;
}
.username:focus {
  background: transparent;
  background-image: url("data:image/svg+xml,%3Csvg data-v-41be6633='' viewBox='0 0 16 16' width='1em' height='1em' focusable='false' role='img' aria-label='person fill' xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi-person-fill mx-auto b-icon bi'%3E%3Cg data-v-41be6633=''%3E%3Cpath d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  padding-left: 30px;
  background-position-x: 90%;
  background-position-y: center;
}
.password:focus {
  background: transparent;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' width='1em' height='1em' focusable='false' role='img' aria-label='unlock fill' xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi-unlock-fill mx-auto b-icon bi' data-v-41be6633=''%3E%3Cg data-v-41be6633=''%3E%3Cpath d='M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  padding-left: 30px;
  background-position-x: 90%;
  background-position-y: center;
}
.username {
  background-image: url("data:image/svg+xml,%3Csvg data-v-41be6633='' viewBox='0 0 16 16' width='1em' height='1em' focusable='false' role='img' aria-label='person fill' xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi-person-fill mx-auto b-icon bi'%3E%3Cg data-v-41be6633=''%3E%3Cpath d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  padding-left: 30px;
  background-position-x: 90%;
  background-position-y: center;
}
.password {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' width='1em' height='1em' focusable='false' role='img' aria-label='unlock fill' xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='bi-unlock-fill mx-auto b-icon bi' data-v-41be6633=''%3E%3Cg data-v-41be6633=''%3E%3Cpath d='M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
}
</style>