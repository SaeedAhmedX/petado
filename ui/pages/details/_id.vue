<template>
  <div v-if="dog" class="container-fluid">
    <div class="d-flex justify-content-between mb-5 mt-2">
      <h3>Details</h3>
    </div>
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(image, index) in dog.images"
          :key="image.id"
          class="carousel-item"
          :class="{ active: activeImageIndex === index }"
        >
          <img
            class="d-block dog-image"
            :src="`/api/image/${image.location}`"
            alt="First slide"
          />
        </div>
      </div>
      <a
        v-if="dog.images.length > 1"
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
        @click="prevImage"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        v-if="dog.images.length > 1"
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
        @click="nextImage"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <table class="table table-sm">
      <tbody>
        <tr>
          <td>Description</td>
          <td>{{ dog.description }}</td>
        </tr>
        <tr>
          <td>Breed</td>
          <td>{{ dog.breed }}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{{ dog.gender }}</td>
        </tr>
        <tr>
          <td>Color</td>
          <td>{{ dog.color ?? 'NA' }}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{{ dog.age ? dog.age + ' Month(s)' : 'NA' }}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>₹{{ dog.price }}/-</td>
        </tr>
        <tr>
          <td>Owner Name</td>
          <td>{{ dog.request.creator.name }}</td>
        </tr>
        <tr>
          <td>Contacts</td>
          <td>
            Mobile: {{ dog.request.creator?.mobile || 'NA' }}, Email:
            {{ dog.request.creator?.email || 'NA' }}
          </td>
        </tr>
        <tr>
          <td>Owner Comments</td>
          <td>{{ dog.request.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      dog: null,
      activeImageIndex: 0,
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    const result = await this.$axios.get(`/dogs/${id}`);
    this.dog = result.data.data;
  },
  methods: {
    nextImage() {
      this.activeImageIndex =
        (this.activeImageIndex + 1) % this.dog.images.length;
    },
    prevImage() {
      if (this.activeImageIndex === 0) {
        this.activeImageIndex = this.dog.images.length;
      }
      this.activeImageIndex = this.activeImageIndex - 1;
    },
  },
};
</script>

<style scoped lang="scss">
#carouselExampleControls {
  background-color: rgb(111, 109, 109);
}
.dog-image {
  max-height: 400px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
