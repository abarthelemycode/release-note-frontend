<template>
  <v-app>
    <AppMenu />
    <router-view />
    <ErrorDialog />
  </v-app>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';

export default {
  name: 'app',
  components: {
    AppMenu,
    ErrorDialog,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
