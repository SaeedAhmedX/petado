<template>
  <UserForm :is-new="false" />
</template>

<script>
import UserForm from './../components/UserForm.vue';

export default {
  components: {
    UserForm,
  },
  layout: 'home',
};
</script>
