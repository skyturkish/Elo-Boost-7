<script setup>
import { onMounted, ref} from 'vue'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

const dialog = ref(false)
const isRegister = ref(true)

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

onMounted(() => {
  fetchUser()
})

function changeSignType() {
  isRegister.value = !isRegister.value
  backendError.value = null
}

async function validate()   {
  const { valid } = await form.value.validate()
  return await valid
}

async function fetchUser() {
  await useAccountStore.fetchSession()
}

async function register() {
  backendError.value = null

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
  } catch (error) {
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}

async function logout() {
  await useAccountStore.logout()
  await fetchUser()
}
</script>

<template lang="pug">
v-btn.client-area(
        rounded="lg"
        variant="tonal"
    )
    .logout-text(v-if="useAccountStore.user" @click="logout")
      v-icon.mdi-logout-variant
      | Hello {{ useAccountStore.user.name }}
    .client-area-text(v-else) Client Area
      v-dialog.dialog(
          v-model='dialog'
          persistent
          activator='parent'
          width="1024"
          color="primary"
          overlay-color="black"
        )
        v-form(
          ref="form"
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
