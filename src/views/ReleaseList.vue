<template>
  <v-content grid-list-md>
    <v-layout>
      <v-flex v-if="pending">
        <v-progress-circular indeterminate color="primary" ></v-progress-circular>
      </v-flex>
      <v-flex v-if="!pending">
        <FeatureBlock v-for="feature in featuresDisplay" :key="feature.id"
          :isLogged="isLogged"
          :feature="feature"
        />
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import FeatureBlock from '@/components/FeatureBlock.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'release-list',
  components: {
    FeatureBlock,
  },
  data: () => ({
    pending: false,
  }),
  created() {
    const data = {
      version: this.$route.params.version,
      version2: this.$route.params.version2,
    };
    this.pending = true;
    this.getFeaturesByVersion(data).then(() => { this.pending = false; });
  },
  computed: {
    ...mapState('featureModule', ['features']),
  },
  methods: {
    ...mapActions('featureModule', ['getFeaturesByVersion']),
  },
};
</script>
