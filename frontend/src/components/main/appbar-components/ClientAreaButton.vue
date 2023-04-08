<script setup>
import { ref} from 'vue'

const dialog = ref(false)
const isRegister = ref(true)

const name = ref('')
const email = ref('')
const password = ref('')



const valid =  ref(false)

const loading = ref(false)

const validationRules =
    {
      "name":  [
        value => {
          if (value) return true

          return 'Name is requred.'
        },
        value => {
          if (value?.length > 2) return true

          return 'Name must be at least 3 characters.'
        },
      ],
      "email": [
          value => {
            if (value) return true

            return 'E-mail is requred.'
          },
          value => {
            if (/.+@.+\..+/.test(value)) return true

            return 'E-mail must be valid.'
          },
        ],
      "password": [
          value => {
            if (value) return true

            return 'Password is requred.'
          },
          value => {
            if (value?.length >= 6) return true

            return 'Password must be at least 6 characters.'
          },
      ]
    }

function register() {
  console.log('register moruk' + name.value + ' ' + email.value + ' ' + password.value + ' ' + valid.value)
}

function login() {
  console.log('login moruk' + ' ' + email.value + ' ' + password.value + ' ' + valid.value)
}

</script>

<template lang="pug">
v-btn.client-area(
        rounded="lg"
        variant="tonal"
    )
    .client-area-text Client Area
      v-dialog.dialog(
          v-model='dialog'
          persistent
          activator='parent'
          width="1024"
          color="primary"
          overlay-color="black"
        )
        v-form(
          v-model="valid"
          )
          v-btn.close(
            icon="mdi-close-circle-outline"
            color="transparent"
            size="x-large"
            @click="dialog = false"
            )
          .register(v-if="isRegister")
            .title Sign in
            v-btn(
                @click="isRegister = false"
            ) Already have an account ? Sign in
            v-text-field(
              v-model="email"
              :rules="validationRules.email"
              label="email"
              required
            )
            v-text-field(
              v-model="name"
              :rules="validationRules.name"
              label="Name"
              required
            )
            v-text-field(
              v-model="password"
              :rules="validationRules.password"
              label="Password"
              required
            )
            v-btn(
              @click="register"
            ) Create Account
          .login(v-else)
            .dialog Login
            v-btn(
                @click="isRegister = true"
            ) New user ? Create an account
            v-text-field(
              v-model="email"
              :rules="validationRules.email"
              label="Email"
              required
            )
            v-text-field(
              v-model="password"
              :rules="validationRules.password"
              label="Password"
              required
            )
            v-btn(
              @click="login"
            ) Login

</template>

<style scoped>

.dialog {
    display:flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 800;
    color: #968484;
}

.close {
    margin-left: auto;
}
.client-area {
    margin-right: 1rem;
    height: 3.5rem;
    border-radius: 1rem;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #174e82;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: normal;
}
.client-area-text {
    color: #fff;
}


</style>
