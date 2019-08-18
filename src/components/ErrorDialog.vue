<template>
  <v-dialog class="error-dialog" persistent v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Error</v-card-title>
      <v-card-text>
        <p> {{ error }}</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout  align-end justify-end>
          <v-btn color="primary" flat @click="onClick">Ok</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'errorDialog',
  data: () => ({
    error: '',
    dialog: false,
  }),
  computed: {
    ...mapState('errorHandlingModule', ['errorApi']),
  },
  watch: {
    errorApi(newValue) {
      this.dialog = newValue !== '';
      this.error = (newValue === '') ? newValue : newValue.data.message;
    },
  },
  methods: {
    ...mapActions('errorHandlingModule', ['getErrorApi']),
    ...mapActions('authenticationModule', ['logout']),
    onClick() {
      this.dialog = false;
      const error = this.$store.state.errorHandlingModule.errorApi;
      const statusCode = error.status;
      if (statusCode === 401) {
        // put redirection to login
        this.logout();
        this.$router.push({ path: '/notFound' });
      }
      this.getErrorApi('');
    },
  },
};

</script>
