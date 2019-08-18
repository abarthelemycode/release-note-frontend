<template>
  <v-form class="feature-form" ref='form' v-model="valid">

    <v-layout row>
      <v-flex xs4>
        <v-select
          class="mr-4" :items="categories" v-model="feature.category" label="Category"
          return-object item-text="name" item-value="id">
        </v-select>
      </v-flex>
      <v-flex xs8>
        <v-text-field v-model="feature.name" label="Name"
          :rules="[rules.empty]">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs4>
        <v-text-field class="mr-4" v-model="feature.version" label="Version"
          :rules="[rules.empty, rules.version]">
        </v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-select :items="Array.apply(null, {length: 21}).map(Number.call, Number).map(String).splice(1)"
          label="Order" v-model="feature.order">
        </v-select>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-select
        :items="tags" v-model="feature.tags" label="Tags"
        multiple chips deletable-chips
        return-object item-text="name" item-value="id"
      >
      </v-select>
    </v-layout>

    <v-textarea v-model="feature.text" label="Text"
      multi-line  hint="Hint text"
      :rules="[]"
    ></v-textarea>

    <v-layout>
      <v-flex xs6>
        <v-text-field class="mr-5" v-model="feature.link" label="Media link"
        ></v-text-field>
      </v-flex>
      <v-flex row xs6>
        <v-radio-group v-model="feature.is_image" label="Media type :" row>
          <v-radio :label="'Image'" :value="'1'"></v-radio>
          <v-radio :label="'Video'" :value="'0'"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>

    <p class="txt-error">{{ error }}</p>

    <v-divider></v-divider>
    <v-layout class="mt-4" align-end justify-end>
      <v-progress-circular indeterminate color="primary" v-if="pending"></v-progress-circular>
      <v-btn  v-if="!pending" @click="onValidate" >Validate</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FeatureForm',
  props: {
    feature: {
      type: Object,
      default: () => {},
      required: true,
    },
    validate: {
      type: Function,
      default: () => {},
      required: true,
    },
    finish: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
  computed: {
    ...mapState('featureModule', ['tags', 'categories']),
  },
  updated() {
    this.$refs.form.resetValidation();
  },
  data: () => ({
    error: '',
    pending: false,
    valid: true,
    rules: {
      empty: v => !!v || 'This field is required',
      // link: v => /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/-=]*)/g.test(v) || 'Link must be valid',
      version: v => /^(\d+\.)?(\d+\.)?(\*|\d+)$/g.test(v) || 'Version must be valid',
    },
  }),
  methods: {
    onValidate() {
      if (this.valid === true) {
        this.pending = true;
        this.validate(this.feature).then(e => this.onFinish(e));
      }
    },

    onFinish(e) {
      this.pending = false;
      if (e !== undefined && e.error === true) {
        this.error = e.message;
      } else {
        this.finish();
      }
    },
  },
};
</script>
