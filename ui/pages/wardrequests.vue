<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between mb-5 mt-2">
      <h3>Your Ward Requests</h3>
    </div>

    <div class="dog-list d-inline-flex justify-content-left">
      <NuxtLink
        v-for="dog in dogs"
        :key="dog.id"
        :to="`/details/${dog.id}`"
        tag="div"
      >
        <DogCard :dog="dog" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import DogCard from '../components/DogCard.vue';

export default {
  components: { DogCard },
  layout: 'home',
  data() {
    return {
      dogs: [],
    };
  },
  async mounted() {
    const result = await this.$axios.get('dogs/wardrequests');
    this.dogs = result.data.data;
  },
};
</script>

<style scoped lang="scss">
.dog-list {
  flex-wrap: wrap;

  > div {
    margin-right: 24px;
    margin-bottom: 24px;
  }
}

.search-container .form {
  position: relative;
}

.form .bi-search {
  position: absolute;
  top: 12px;
  left: 20px;
  color: #9ca3af;
  font-size: 24px;
}

.form span {
  position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;
}

.left-pan {
  padding-left: 7px;
}

.left-pan i {
  padding-left: 10px;
}

.form-input {
  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
  padding-left: 20px;
}

.form-input:focus {
  box-shadow: none;
  border: none;
}
</style>
