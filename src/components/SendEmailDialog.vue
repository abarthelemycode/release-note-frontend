<template>
  <v-dialog class="sendemail-dialog" persistent v-model="dialog" width="800" >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="onOpen" >Send Release Note</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <h4>Send Release note</h4>
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
        <SendEmailForm ref="emailForm" :postData="postData" :validate="sendReleaseNote" :finish="onFinish" />
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import SendEmailForm from '@/components/SendEmailForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SendEmailDialog',
  components: {
    SendEmailForm,
  },
  data: () => ({
    dialog: false,
    postDataNew: {
      versionFrom: '',
      versionTo: '',
      object: '',
      emailFrom: '',
      emailsTo: [],
    },
    postData: {},
  }),
  methods: {
    ...mapActions('sendEmailModule', ['sendReleaseNote']),

    onOpen() {
      this.postData = Object.assign({}, this.postDataNew);
      this.$refs.emailForm.resetForm();
    },

    onFinish() {
      // this.dialog = false;
    },

  },
};
</script>
