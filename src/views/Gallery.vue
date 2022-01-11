<template>
  <div>
    <b-row>
      <b-col cols="6">
        <b-row class="flex-end">
          <div>
            <b-select v-model="selected" :disabled="addGalleryMode">
              <option
                v-for="gallery in galleries"
                :key="gallery.id"
                :value="{
                  id: gallery.id,
                  name: gallery.name,
                  images: gallery.images,
                  disabled: selected.disabled,
                }"
              >
                {{ gallery.name }}
              </option>
            </b-select>
          </div>
        </b-row>
      </b-col>
      <b-col cols="5">
        <b-row class="flex-end">
          <b-button
            class="btn"
            variant="outline-primary"
            sisze="lg"
            :disabled="this.editMode"
            @click="startAddGalleryMode()"
          >
            <p class="h3">
              <b-icon-x-square-fill
                v-if="addGalleryMode"
                variant="light"
              ></b-icon-x-square-fill>
              <b-icon-plus-square v-else variant="light"></b-icon-plus-square>
            </p>
          </b-button>
          <b-button
            class="btn"
            :variant="variant"
            sisze="lg"
            :disabled="addGalleryMode"
            @click="startEdit(selected)"
          >
            <p class="h3">
              <b-icon-pencil-fill variant="light"></b-icon-pencil-fill>
            </p>
          </b-button>
          <b-button
            variant="outline-primary"
            class="btn"
            sisze="lg"
            :disabled="addGalleryMode || editMode"
            @click="deleteGallery(selected)"
          >
            <p class="h3">
              <b-icon-trash-fill variant="light"></b-icon-trash-fill>
            </p>
          </b-button>
        </b-row>
      </b-col>
    </b-row>
    <div v-if="!addGalleryMode">
      <b-row>
        <b-col cols="3" inline>
          <b-form>
            <b-input :value="selected.name" :disabled="selected.disabled" />
          </b-form>
        </b-col>
      </b-row>
      <b-row class="reverse-row">
        <b-col cols="5" inline>
          <b-form>
            <b-input
              v-for="image in selected.images"
              :key="image.id"
              :value="image"
              :disabled="selected.disabled"
            />
          </b-form>
        </b-col>
      </b-row>
    </div>
    <div v-if="addGalleryMode">
      <b-row>
        <b-col cols="3">
          <b-input
            tpye="text"
            placeholder="Galéria neve"
            v-model="newGallery.name"
            :value="newGallery.name"
          />
          <form inline>
            <b-input
              type="text"
              placeholder="Kép URL-je"
              v-for="link in links"
              :key="link.id"
              v-model="link.link"
              :value="link.link"
            />
          </form>
        </b-col>
        <b-col cols="4">
          <button type="button" class="btn" @click="newLinkInput">
            Új Link mező
          </button>
          <button type="button" class="btn" @click="addGallery">Mentés</button>
        </b-col>
      </b-row>
    </div>
    <b-toast
      auto-hide-delay="1000"
      id="galleryFullToast"
      variant="warning"
      solid
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Hahó!</strong>
        </div>
      </template>
      Többet nem tudsz beletenni!!!
    </b-toast>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      variant: "outline-primary",
      newGallery: {
        name: "",
      },
      links: [
        {
          link: "",
        },
      ],
      galleries: [],
      selected: {
        id: "",
        name: "",
        images: {},
        disabled: true,
      },
      addGalleryMode: false,
      editMode: false,
    };
  },
  computed: {
    firstItem: {
      get() {
        return this.galleries[0].name;
      },
      set(value) {
        this.selected.name = value;
      },
    },
  },
  mounted() {
    this.getGalleries();
  },
  methods: {
    newLinkInput() {
      if (this.links.length < 10) {
        this.links.push({ url: "" });
      } else {
        this.$bvToast.show("galleryFullToast");
      }
      console.log(this.links);
    },
    startAddGalleryMode() {
      this.addGalleryMode = !this.addGalleryMode;
      console.log(this.addGalleryMode);
    },
    setDefault() {
      this.selected.id = this.galleries[0].id;
      this.selected.name = this.galleries[0].name;
      this.selected.images = this.galleries[0].images;
    },
    getGalleries() {
      fetch("https://localhost:6001/gallery")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            element.disabled = true;
          });
          this.galleries = data;
          console.log(data);
        })
        .then(() => this.setDefault())
        .catch((error) => console.log(error));
    },
    addGallery() {
      fetch("https://localhost:6001/gallery", {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: this.newGallery.name,
          galleryimages: this.links,
        }),
      })
        .then(() => console.log(this.newGallery))
        .then(() => this.startAddGalleryMode())
        .then(() => this.getGalleries())
        .catch((error) => console.log(error));
    },
    deleteGallery(gallery) {
      console.log(gallery);
      fetch("https://localhost:6001/gallery", {
        headers: {
          "Content-type": "Application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id: gallery.id }),
      }).catch((err) => console.log(err));
    },
    startEdit(gallery) {
      this.editMode = !this.editMode;
      this.setVariant(!gallery.disabled);
      gallery.disabled = !gallery.disabled;
    },
    setVariant(state) {
      if (state) {
        this.variant = "outline-primary";
      } else {
        this.variant = "danger";
      }
    },
  },
};
</script>

<style>
.flex-end {
  place-content: flex-end;
}
.select {
  margin: 0 auto;
}
.reverse-row {
  flex-flow: row-reverse;
}
.btn-outline-primary {
  border: none;
}
.btn-danger {
  border: none;
}
</style>
