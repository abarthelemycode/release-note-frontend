<template>
    <v-card class="feature">
      <v-card-title class="pa-0" >
        <v-layout justify-end>
          <v-progress-circular indeterminate color="primary" v-if="pending && !enableEdit"></v-progress-circular>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-show="!enableEdit" @click="onEdit" flat icon v-on="on" ><v-icon>edit</v-icon></v-btn>
              <v-btn v-show="enableEdit"  @click="onEdit" flat icon v-on="on" ><v-icon>undo</v-icon></v-btn>
            </template>
            <span v-show="!enableEdit" >Edit</span>
            <span v-show="enableEdit" >Cancel</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn @click="onDelete" flat icon color="red" v-on="on"><v-icon>close</v-icon></v-btn>
            </template>
            <span>Delete Feature</span>
          </v-tooltip>
        </v-layout>
      </v-card-title>
      <v-card-text class="pt-0" v-if="!enableEdit">
        <h1>{{ getCategory(feature.category) }} : <span v-html="setTextHighlight(feature.name)"></span></h1>
        <h3>version : {{ feature.version }}</h3>
        <h4 v-html="setTextHighlight(getListTags(feature.tags))"></h4>

        <p v-html="setTextHighlight(setTextToBr(feature.text))"></p>
        <v-layout justify-center v-if="feature.link !== ''">
          <img width="800" v-if="feature.is_image === '1'" :src="getUrl(feature.link)" />
          <iframe  v-if="feature.is_image === '0'" :src="feature.link" width="800" height="449" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </v-layout>
      </v-card-text>

      <v-card-text v-if="enableEdit">
        <FeatureForm :feature="featureEdit" :validate="onValidateUpdate" :finish="onFinishUpdate"  />
      </v-card-text>
    </v-card>
</template>

<script>
import FeatureForm from '@/components/FeatureForm.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FeatureBlock',
  components: {
    FeatureForm,
  },
  props: {
    feature: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data: () => ({
    featureEdit: {},
    pending: false,
    enableEdit: false,
  }),
  computed: {
    ...mapState('featureModule', ['textHighlight']),
  },
  methods: {
    ...mapActions('featureModule', ['updateFeature', 'deleteFeature']),

    getUrl(link) {
      return `${process.env.VUE_APP_IMG_URL}/${link}`;
    },

    getCategory(category) {
      return (category === null) ? '' : (category.name).toUpperCase();
    },

    getListTags(tags) {
      let list = '';
      tags.forEach((item) => {
        const name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        list += ` #${name},`;
      });
      list = list.substring(0, list.length - 1);
      return list;
    },

    setTextToBr(str) {
      if (typeof str === 'undefined' || str === null) return '';
      const breakTag = '<br>';
      return (`${str}`).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`);
    },

    setTextHighlight(htmlText) {
      if (this.textHighlight.length < 4) return htmlText;

      const regex = new RegExp(this.textHighlight, 'gi');
      htmlText = htmlText.replace(regex, match => `<span class="highlighting" v-html="rawHtml">${match}</span>`);
      return htmlText;
    },

    onEdit() {
      this.featureEdit = Object.assign({}, this.feature);
      this.enableEdit = !this.enableEdit;
    },

    onValidateUpdate(feature) {
      this.pending = true;
      return this.updateFeature(feature).then((e) => {
        this.pending = false;
        return e;
      });
    },

    onFinishUpdate() {
      this.enableEdit = false;
    },

    onDelete() {
      this.pending = true;
      return this.deleteFeature(this.feature).then((e) => {
        this.pending = false;
        return e;
      });
    },
  },
};
</script>

<style scoped lang="scss">
    .no-pad {
      padding-bottom:0;
    }
    .feature {
      width:70em;
      padding:1rem;
      margin: 0 auto;
      margin-bottom:5rem;
    }
</style>
