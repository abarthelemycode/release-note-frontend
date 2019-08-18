<template>
  <v-content grid-list-md>
    <v-layout align-end justify-end>
      <SendEmailDialog />
      <AddFeatureDialog />
    </v-layout>
    <v-layout>
      <v-flex xs4 class="left-menu">
        <FeatureFilters />
      </v-flex>
      <v-flex xs8 v-if="pending">
        <v-layout justify-end>
          <v-progress-circular class="ma-4" indeterminate color="primary" ></v-progress-circular>
        </v-layout>
      </v-flex>
      <v-flex xs8 v-if="!pending">
        <FeatureBlock v-for="feature in featuresDisplay"
          :key="feature.id"
          :feature="feature"
        />
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import SendEmailDialog from '@/components/SendEmailDialog.vue';
import AddFeatureDialog from '@/components/AddFeatureDialog.vue';
import FeatureFilters from '@/components/FeatureFilters.vue';
import FeatureBlock from '@/components/FeatureBlock.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    FeatureFilters,
    FeatureBlock,
    AddFeatureDialog,
    SendEmailDialog,
  },
  data: () => ({
    pending: false,
  }),
  computed: {
    ...mapState('featureModule', ['featuresDisplay']),
  },
  created() {
    this.pending = true;

    this.getFeatures().then(() => { this.pending = false; });
    this.getTags();
    this.getCategories();
  },
  methods: {
    ...mapActions('featureModule', ['getFeatures', 'getFeaturesByVersions', 'getTags', 'getCategories']),
  },
};
</script>

<style scoped lang="scss">
  .left-menu {
    min-height: 100vh;
    max-width: 20vw;
    margin-left:5rem;
  }
  .list-version {
    list-style:none;
    a {
      cursor:pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>
