<template>
  <div class="card" style="width: 18rem">
    <div class="card-header bg-transparent">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <div class="icon"><i class="bi bi-person"></i></div>
          <div class="ms-2 c-details">
            <h6 class="mb-0">{{ dog.request.creator.name }}</h6>
            <span>{{ requestTimeAgo }}</span>
          </div>
        </div>
      </div>
    </div>
    <img
      class="card-img-top"
      :src="`/api/image/${dog.images[0].location}`"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title m-0">{{ dog.breed || dog.color }}</h5>
      <p class="card-text m-0">
        {{ dog.description }}
      </p>
      <strong>₹{{ dog.price }}/-</strong>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DogCard',
  props: {
    dog: { type: Object, default: null },
  },
  computed: {
    requestTimeAgo() {
      return moment(this.dog.createdAt).fromNow();
    },
  },
};
</script>
