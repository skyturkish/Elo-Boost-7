<script setup>
import { ref } from 'vue'
import { useAccount } from '@/store/account'

import { defineEmits } from 'vue';

const emit = defineEmits(['close-dialog']);

const closeDialog = function(){
  emit('close-dialog');
}

const useAccountStore = useAccount()

const isRegister = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')

const form =  ref(false)
const loading = ref(false)

const backendError = ref(null)
const backendSuccess = ref(null)

const validationRules = {
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
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true

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

async function fetchUser() {
  await useAccountStore.fetchSession()
}

function changeSignType() {
  isRegister.value = !isRegister.value
  backendError.value = null
}

async function validate()   {
  const { valid } = await form.value.validate()
  return await valid
}

async function register() {
  backendError.value = null
  backendSuccess.value = null

  const valid = await validate()

  if (!valid) return

  try {
    loading.value = true
    await useAccountStore.register({
      user: {
        name: name.value,
        email: email.value,
        password: password.value,
        mainGame: 'League Of Legends'
      }
    })
    backendSuccess.value = 'You are now registered! Now Login'
    isRegister.value = !isRegister.value
  } catch (error) {
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}

async function login() {
  backendError.value = null
  backendSuccess.value = null

  const valid = await validate()

  if (!valid) return

  try {
    loading.value = true
    const user = await useAccountStore.login({
      user: {
        email: email.value,
        password: password.value
      }
    })
    form.value.reset()
    backendSuccess.value = null
    await fetchUser()
    console.log('everthing is fine')
  } catch (error) {
    console.log('a error appeared', error)
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}
</script>

<template lang="pug">
v-form(
  ref="form"
  )
  v-btn.close(
    icon="mdi-close-circle-outline"
    color="transparent"
    size="x-large"
    @click="closeDialog()"
    )
  .register(v-if="isRegister")
    .title Sign in
    v-btn(
        @click="changeSignType()"
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
      :loading="loading"
    ) Create Account
  .login(v-else)
    .dialog Login
    v-btn(
        @click="changeSignType()"
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
  v-alert.erroralert(
    closable
    title="A error appear"
    text="..."
    variant="outlined"
    v-if="backendError"
  ) {{ backendError }}
  v-alert.successalert(
    closable
    title="Success  "
    text="..."
    variant="outlined"
    v-if="backendSuccess"
  ) {{ backendSuccess }}
</template>

<style scoped>
.erroralert {
  color: red;
}
.successalert {
  color: green;
}
.dialog {
    display:flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 800;
    color: #968484;
    color: rgb(194, 167, 167);
}
.close {
    margin-left: auto;
}
</style>
