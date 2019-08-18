<template>
  <v-card class="jumbotron">
    <AuthForm :validate="login" />
  </v-card>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'login',
  components: {
    AuthForm,
  },
  computed: {

  },
  methods: {
    ...mapActions('authenticationModule', ['login']),
  },
};
</script>
