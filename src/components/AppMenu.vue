<template>
  <v-toolbar dark class="appMenu">
      <v-toolbar-title>Release Note</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
          <v-btn flat v-if="isLogged" @click="onClickLogout">Logout</v-btn>
      </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'appMenu',
  components: {

  },
  computed: {
    ...mapState('authenticationModule', ['isLogged']),
  },
  methods: {
    ...mapActions('authenticationModule', ['logout']),

    onClickLogout() {
      this.logout();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
<style scoped lang="scss">
  .appMenu {
    margin-bottom:2rem;
  }
</style>
