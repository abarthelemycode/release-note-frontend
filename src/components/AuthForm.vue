<template>
  <v-form class="auth-dialog" ref="form" v-model="valid" @submit="onValidate" onSubmit="return false;" >
    <v-container>
        <h2>Authentication</h2>

        <v-text-field v-model="user.username" label="Username"
        :rules="[rules.empty]" ></v-text-field>

        <v-text-field v-model="user.password" label="Password" type="password"
        :rules="[rules.empty]" ></v-text-field>

        <p class="txt-error">{{ error }}</p>

        <v-divider></v-divider>
        <v-layout justify-end >
          <v-progress-circular class="pending" indeterminate color="primary" v-if="pending" ></v-progress-circular>
          <v-btn  flat :disabled="!valid" v-if="!pending" color="primary" type="submit" >Login</v-btn>
        </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'authForm',
  props: {
    validate: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
  data: () => ({
    pending: false,
    valid: false,
    user: { username: '', password: '' },
    rules: {
      empty: v => !!v || 'This field is required',
    },
    error: '',
  }),
  updated() {
    this.$refs.form.resetValidation();
  },
  methods: {
    onValidate() {
      if (this.valid === true) {
        this.error = '';
        this.valid = false;
        this.pending = true;

        this.validate(this.user).then((e) => {
          this.valid = true;
          this.pending = false;
          if (e !== undefined && e.error === true) {
            this.error = e.message;
          } else {
            this.$router.push({ name: 'home' });
            this.error = '';
          }
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
  .pending {
    margin: 1rem;
  }
  p {
    min-height:2rem;
  }
</style>
