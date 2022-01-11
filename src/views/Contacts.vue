<template>
  <div id="contacts">
    <h3>Kontakok</h3>
    <b-overlay :show="!contacts.length" opacity="0.4" rounded="sm">
      <b-row>
        <b-col
          cols="12"
          class="contact-container"
          v-for="contact in contacts"
          :key="contact.id"
        >
          <b-form inline>
            <b-input
              type="text"
              :value="contact.name"
              :disabled="contact.disabled"
              v-model="contact.name"
            />
            <b-input
              type="tel"
              :value="contact.phoneNumber"
              :disabled="contact.disabled"
              v-model="contact.phoneNumber"
            />

            <b-input
              type="email"
              :value="contact.email"
              :disabled="contact.disabled"
              v-model="contact.email"
            />
            <b-select
              type="text"
              :value="contact.title"
              v-model="contact.title"
              :disabled="contact.disabled"
            >
              <option v-for="(title, index) in titles" :key="index">
                {{ title }}
              </option>
            </b-select>
            <b-button-group>
              <button
                type="button"
                size="lg"
                class="btn"
                @click="removeContact(contact)"
              >
                <b-icon-x-circle-fill variant="danger"></b-icon-x-circle-fill>
              </button>
              <button type="button" class="btn" @click="startEdit(contact)">
                <b-icon-pencil-fill variant="primary"></b-icon-pencil-fill>
              </button>
              <button
                v-if="!contact.disabled"
                type="button"
                class="btn"
                @click="saveChanges(contact)"
              >
                <b-icon-arrow-right-square-fill
                  variant="success"
                ></b-icon-arrow-right-square-fill>
              </button>
            </b-button-group>
          </b-form>
        </b-col>
      </b-row>
      <b-row v-if="addOne">
        <b-col cols="12">
          <b-form inline>
            <b-input
              type="text"
              placeholder="Név"
              :value="newContact.name"
              v-model="newContact.name"
            />
            <b-input
              type="tel"
              placeholder="Telefonszám"
              v-model="newContact.phoneNumber"
              :value="newContact.phoneNumber"
            />

            <b-input
              type="email"
              placeholder="Email"
              v-model="newContact.email"
              :value="newContact.email"
            />
            <b-select type="text" v-model="newContact.title">
              <option v-for="(title, index) in titles" :key="index">
                {{ title }}
              </option>
            </b-select>

            <b-button-group>
              <button
                type="button"
                class="btn btn-success"
                @click="AddContact(newContact)"
              >
                Mentés
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="showContactAddForm"
              >
                Mégse
              </button>
            </b-button-group>
          </b-form>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="1">
          <button
            type="button"
            size="lg"
            class="btn"
            @click="showContactAddForm"
          >
            <p class="h3">
              <b-icon-plus-square variant="dark"></b-icon-plus-square>
            </p>
          </button>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  data() {
    return {
      contacts: [],
      titles: [],
      disabled: true,
      addOne: false,
      newContact: {
        name: "",
        phoneNumber: "",
        email: "",
        title: "Tulajdonos",
        disabled: true,
      },
    };
  },
  mounted() {
    this.getContactsProm();
    this.getTitles();
  },
  methods: {
    async getContactsProm() {
      await fetch("https://localhost:6001/contact", {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      })
        .then((response) => response.json())
        .then((contacts) => {
          contacts.forEach((element) => {
            element.disabled = true;
          });
          this.contacts = contacts;
        })
        .catch((error) => {
          console.log(error);
        })
        .catch((response) => {
          if (response.status == 401) {
            console.log("NINCS BEJELENTKEZVE BAZDMEG");
          }
        });
    },
    async getTitles() {
      const request = await fetch("https://localhost:6001/contact/gettitles");
      var data = await request.json();
      this.titles = data;
    },
    async removeContact(contact) {
      await fetch("https://localhost:6001/contact", {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "DELETE",
        body: JSON.stringify(contact),
      })
        .then(() => this.contacts.pop(contact))
        .catch((error) => console.log(error));
    },
    async saveChanges(contact) {
      await fetch("https://localhost:6001/contact/" + contact.id, {
        headers: {
          "Content-Type": "Application/json-patch+json",
        },
        method: "PATCH",
        body: JSON.stringify([
          {
            op: "replace",
            path: "Name",
            value: contact.name,
          },
          {
            op: "replace",
            path: "Email",
            value: contact.email,
          },
          {
            op: "replace",
            path: "phoneNumber",
            value: contact.phoneNumber,
          },
          {
            op: "replace",
            path: "title",
            value: contact.title,
          },
        ]),
      });
      contact.disabled = !contact.disabled;
    },
    async AddContact(contact) {
      console.log(contact);
      await fetch("https://localhost:6001/contact", {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "POST",
        body: JSON.stringify(contact),
      });
      this.contacts.push(this.newContact);
      this.showContactAddForm();
    },
    startEdit(contact) {
      contact.disabled = !contact.disabled;
    },
    showContactAddForm() {
      this.addOne = !this.addOne;
    },
  },
};
</script>

<style>
.form-control:disabled {
  background-color: rgba(239, 239, 239, 0.3) !important;
}
input {
  margin: 10px;
}
#contacts {
  padding-top: 30px;
}
</style>