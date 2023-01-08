<template>
  <div class="container-fluid">
    <div
      class="search-container row height d-flex justify-content-center align-items-center mb-5"
    >
      <div class="col-md-6">
        <div class="form">
          <i class="bi bi-search"></i>
          <input
            v-model="search"
            type="text"
            class="form-control form-input"
            placeholder="Search for a dog"
          />
        </div>
      </div>
    </div>

    <div class="dog-list d-inline-flex justify-content-left">
      <NuxtLink
        v-for="dog in filteredDogs"
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
import DogCard from './../components/DogCard.vue';

export default {
  components: { DogCard },
  layout: 'home',
  data() {
    return {
      dogs: [],
      search: '',
    };
  },
  computed: {
    filteredDogs() {
      if (this.search) {
        const query = this.search.toLowerCase();
        return this.dogs.filter((dog) => {
          return (
            dog.registerationId +
            ':' +
            dog.gender +
            ':' +
            dog.age +
            ':' +
            dog.color +
            ':' +
            dog.description +
            ':' +
            dog.type +
            ':' +
            dog.breed +
            ':' +
            dog.price
          )
            .toLowerCase()
            .includes(query);
        });
      }
      return this.dogs;
    },
  },
  async mounted() {
    const result = await this.$axios.get('dogs');
    this.dogs = result.data.data;
  },
};
</script>

<style scoped lang="scss">
.dog-list {
  flex-wrap: wrap;

  > * {
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
