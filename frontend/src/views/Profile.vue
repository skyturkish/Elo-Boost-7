<script setup>
import { ref, onMounted } from 'vue'
import { useAccount } from '@/store/account'
import dayjs from 'dayjs'

import axios from 'axios'

const useAccountStore = useAccount()

const formattedDatetime = dayjs(useAccountStore.user.createdAt).format('MMMM DD, YYYY h:mm:ss A')

const name = ref('')
const email = ref('')
const phoneNumber = ref('')
const country = ref('')
const discord = ref('')

function takeInformationsFromStore() {
  const { user } = useAccountStore

  name.value = user.name || 'N/A'
  email.value = user.email || 'N/A'
  phoneNumber.value = user.phoneNumber || 'N/A'
  country.value = user.country || 'N/A'
  discord.value = user.discord || 'N/A'
}

onMounted(() => {
  takeInformationsFromStore()
})

const allowEditTextFields = ref(false)

const informations = [
  {
    title: 'Name',
    ref: name,
  },
  {
    title: 'Email',
    ref: email,
  },
  {
    title: 'Phone Number',
    ref: phoneNumber,
  },
  {
    title: 'Country',
    ref: country,
  },
  {
    title: 'Discord',
    ref: discord,
  },
]

async function saveChanges() {
  await axios.patch(`/user/${useAccountStore.user._id}`, {
    name: name.value,
    phoneNumber: phoneNumber.value,
    country: country.value,
    discord: discord.value,
  })
  await useAccountStore.fetchSession()

  allowEditTextFields.value = false
}
</script>

<template lang="pug">
.body
  .profile
    h1 Profile
    .profile-card.rounded-xl.background-color-cola
      v-avatar.mb-4(image="https://i.pinimg.com/474x/9d/49/96/9d4996efe343c725e2bbd39c3d79bb23.jpg" color='grey-darken-1' size='128')
      h1 {{ useAccountStore.user.name }}
      h2 {{ useAccountStore.user.email }}
      .account-id.info
        .flex-row
          v-icon(icon="mdi-account-box")
          h3 Account ID:
        h3 {{ useAccountStore.user._id }}
      h3 ---------------------------------------
      h3 member since {{ formattedDatetime }}
  .personal-details
    h1 Profile Details
      v-btn(variant="tonal" @click="allowEditTextFields = !allowEditTextFields") Edit Profile
      v-btn(v-if="allowEditTextFields" @click="saveChanges()") Save Changes
      .personal-details-card.rounded-xl.background.background-color-cola
        div(v-for="information in informations")
          h4 {{ information.title }}
          v-text-field(:disabled="!allowEditTextFields || information.title == 'Email'" v-model="information.ref.value" :label="information.title")
</template>

<style scoped>
.body {
  padding: 10rem 5rem ;
  display: flex;
  gap: 2rem;
}
.background-color-cola {
  background-color: rgb(63, 47, 36);
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 50rem;
  min-width: 30rem;
  justify-content: space-between;
  padding: 2.5rem;
  height: 33rem;
}
.flex-row {
  display :flex;
}
.info {
  display: flex;
  justify-content: space-between;
}
.personal-details-card {
  padding: 2.5rem;
  width: 75rem;
  height: 33rem;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto ;
  grid-gap: 1rem;

}
</style>
