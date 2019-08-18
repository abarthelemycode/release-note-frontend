<template>
  <v-form class="feature-form" ref='form' v-model="valid">

    <v-text-field v-model="postData.object" label="Object of Email" >
    </v-text-field>

    <v-text-field v-model="postData.emailFrom" label="From :" >
    </v-text-field>

    <v-combobox  label="To :"
      v-model="postData.emailsTo"
      multiple
      append-icon
      chips
      deletable-chips
      :rules="[rules.empty, rules.email]"
    >
    </v-combobox>

    <h4>Select versions :</h4>
    <v-layout>
      <v-select
          :items="versions" v-model="postData.versionFrom" label="From "
          class="mr-4"
          item-text="name"
          item-value="id"
          :rules="[rules.empty]"
      >
      </v-select>
        <v-select
          :items="versions" v-model="postData.versionTo" label="To "
          item-text="name"
          item-value="id"
          :rules="[rules.empty]"
      >
      </v-select>
    </v-layout>

    <p class="txt-error">{{ error }}</p>

    <v-divider></v-divider>
    <v-layout class="mt-4" align-end justify-end>
      <v-progress-circular indeterminate color="primary" v-if="pending"></v-progress-circular>
      <v-btn :disabled="!valid" v-if="!pending && !sending" @click="onValidate" >Send</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SendEmailForm',
  props: {
    postData: {
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
    ...mapState('featureModule', ['versions']),
    ...mapState('sendEmailModule', ['message']),
  },

  data: () => ({
    error: '',
    pending: false,
    sending: false,
    valid: true,
    rules: {
      empty: v => !!v || 'This field is required',
      email: v => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v) || 'Emails must be valid',
    },
  }),
  methods: {
    resetForm() {
      this.$refs.form.resetValidation();
      this.error = '';
      this.sending = false;
    },
    onValidate() {
      if (this.valid === true) {
        this.pending = true;
        this.error = '';
        this.validate(this.postData).then(e => this.onFinish(e));
      }
    },
    onFinish(e) {
      this.pending = false;
      if (e !== undefined && e.error === true) {
        this.error = e.message;
      } else {
        this.error = this.message;
        this.sending = true;
        this.finish();
      }
    },
  },
};
</script>
