<template>
  <v-dialog class="auth-dialog" persistent v-model="dialog" width="800" >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="onOpen" >Add Feature</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <h4>Add Feature</h4>
        <v-layout align-end justify-end>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn @click="dialog = false" flat icon v-on="on"><v-icon>close</v-icon></v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <FeatureForm :feature="featureEdit" :validate="addFeature" :finish="onFinish" />
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import FeatureForm from '@/components/FeatureForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'addFeatureDialog',
  components: {
    FeatureForm,
  },
  data: () => ({
    dialog: false,
    featureNew: {
      name: '',
      text: '',
      link: '',
      category: {},
      version: '',
      order: '1',
      is_image: '1',
      tags: [],
    },
    featureEdit: {},
  }),
  methods: {
    ...mapActions('featureModule', ['addFeature']),

    onOpen() {
      this.featureEdit = Object.assign({}, this.featureNew);
    },

    onFinish() {
      this.dialog = false;
    },

  },
};
</script>
