 <script setup>
import axios from 'axios'
import { ref ,computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAccount } from '@/store/account'
import { useOrders } from '@/store/orders'
import CustomSwitch from '@/components/CustomSwitch'
import SelectBooster from '@/components/boosting/league-of-legends/SelectBooster'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { findStateColor } from '@/functions/get-colors'
import PreviewOrder from '@/components/panel/PreviewOrder.vue'
import ChampionsOrAgents from '@/components/panel/ChampionsOrAgents.vue'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const router = useRouter()

const validationRules = {
      "userName":  [
        value => {
          if (value) return true

          return 'User-name is requred.'
        },
        value => {
          if (value?.length > 2) return true

          return 'Name must be at least 3 characters.'
        },
        value => {
          if (value?.length < 64) return true

          return 'Name must be less than 64 characters.'
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
          value => {
            if (value?.length < 32) return true

            return 'Password must be less than 32 characters.'
          },
      ],
      "note": [
          value => {
            if (value?.length < 250) return true

            return 'Password must be less than 250 characters.'
          },
      ]
}
const dialog = ref(false)

const userName = ref('')
const password = ref('')
const note = ref('')

const form =  ref(false)
const loading = ref(false)

const backendError = ref(null)
const backendSuccess = ref(null)

const flash = ref('D')

const useAccountStore = useAccount()
const useOrdersStore = useOrders()

const route = useRoute()
const orderId = route.params.orderId

const order = ref(null)
const accountInformation = ref(null)

const autoPublish = ref(true)

const isReadyToPublish = computed(() => {
  return userName.value != '' && password.value != ''
})

function isSelectedFlash(flashName) {
  return flash.value === flashName
}

async function fetchAccountInformation() {
  const adana = await axios.get(`/account-information/${order._id}`)
  userName.value = adana.data.userName
  password.value = adana.data.password
}

async function validate()   {
  const { valid } = await form.value.validate()
  return await valid
}

async function isAccountInformationExists() {
  const adana = await axios.get(`/account-information/is-exist/${order.value._id}`)
  return adana.data
}

async function save() {
  const valid = await validate()

  if (!valid) return

  dialog.value = false
}

async function publish() {
  backendError.value = null
  backendSuccess.value = null

  const valid = await validate()

  if (!valid) return

  try {
    loading.value = true

    const isExist = await isAccountInformationExists()

    if (isExist) {
      await axios.patch(`/account-information/${order.value._id}`, {
        userName: userName.value,
        password: password.value,
      })

    }else {
      await axios.post(`/account-information`, {
        order: order.value._id,
        userName: userName.value,
        password: password.value,
      })
    }

    await axios.patch(`/order`, {
      orderId: order.value._id,
      object:{
        note: note.value,
        flash: flash.value,
        state: 'active',
        autoPublish: autoPublish.value,
        booster: currentLeagueOfLegendsOrder.booster?._id || null
     }
    })
    // booster'I handle et

    dialog.value = false
    order.value.state = 'active'
    backendSuccess.value = 'you successfully saved your account information'
  } catch (error) {
    console.log(error)
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}


onMounted(async () => {
  const adana = await axios.get(`order/${orderId}`)
  order.value = adana.data
  currentLeagueOfLegendsOrder.booster = null
})

const orderInformations = computed(() => {
  if (order.value == null) return null
  return {
  'TYPE': order.value.orderType,
  'CURRENT DIVISION': `${order.value.currentRank.division} ${order.value.currentRank.milestone} ${order.value.currentRank.currentLP}`,
  'DESIRED DIVISIOIN': !order.value.desiredRank ? null :`${order.value.desiredRank.division} ${order.value.desiredRank.milestone}`,
  'QUEUE': order.value.queue,
  'SERVER': order.value.server,
  'DUO':  order.value.isSolo ? 'TRUE' : 'FALSE',
  'SOLO ONLY': order.value.isSolo ? 'TRUE' : 'FALSE',
  'PREMIUM': order.value.premium,
  'FLASH': 'DEFAULT',
  'ACCOUNT INFO': 'UNVERIFIED'
  }
})

const champions = computed(() => {
  return Object.values(order.value.champions).flat().slice(0, 3)
})

</script>

<template lang="pug">
.edit-order(v-if="order != null" )
  .row.first-row
    .row
      .arrow.center-child(@click="router.go(-1)")
        img.arrow-image(src="../../../src/assets/icons/arrow-left.png")
      .need-help.row.center-child(v-if="!useAccountStore.isBooster()")
        img.need-help-icon(src='@/assets/icons/need-help.png')
        .black-text NEED HELP
    .buttons-or-state
      .state.center-child(v-if="!useAccountStore.isBooster()" :style="{backgroundColor: findStateColor(order.state)}") {{ order.state.toUpperCase() }}
      .first-row-buttons(v-else)
        .abandon-button ABANDON
        .complete-button COMPETE
  .background-template
    .order-and-chat(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .row
        img.game-background(:src='`../../../src/assets/icons/${order.game}.png`')
        .order-name {{ order.orderType.toUpperCase() }} BOOST ORDER
      .chat
        //- OrderChat(orderId=order._id)
      PreviewOrder(:order='order')
    .order-detail(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .information-row
         .big-black-text ORDER DETAILS
         .black-id-text {{ '#' + order._id.substring(0,10) }}
      .default-border
        .order-informations(v-for="(a,b) in orderInformations")
          .information-row
            .normal-black-text {{ b }}
            .grey-text {{ a }}
        .only-paid(v-if="order.state == 'paid'")
          .please-edit-order(v-if="!isReadyToPublish") PLEASE EDIT YOUR ORDER AND ADD LOGIN INFO
          v-btn.publish-button(v-else :loading="loading" @click="publish" ) PUBLIsH
        .active(v-else)
          .active-button ACTIVE
        .last-row
          v-btn.edit-order-button
            img.little-icon(src='@/assets/icons/edit-order.png')
            .edit-order-text EDIT ORDER
          v-dialog.dialog(v-model='dialog' activator='parent' width="1024" color="primary" overlay-color="black" eager persistent)
            v-form(ref="form")
              .account-information
                .title EDIT ORDER
                v-text-field(v-model="userName" :rules="validationRules.userName" label="UserName" variant="outlined" required append-inner-icon='mdi-pencil')
                v-text-field(v-model="password" :rules="validationRules.password" label="password" variant="outlined" required append-inner-icon='mdi-pencil')
                v-text-field.your-note(v-model="note" :rules="validationRules.note" label="your note" variant="outlined" required)
                .flash
                  .title FLASH
                  .flash-buttons
                    .d(v-bind:style="isSelectedFlash('D') ? `border: solid 1px #444444` : `border: 1px solid #DDDDDD`  " @click="flash = 'D'") D
                    .f(v-bind:style="isSelectedFlash('F') ? 'border: solid 1px #444444'  : 'border: 1px solid #DDDDDD'  " @click="flash = 'F'") F
                .flash
                  .title AUTO PUBLİSH
                  CustomSwitch(v-model="autoPublish")
                .buttons
                  .save-button(@click="dialog = false") CANCEL
                  .save-button(@click="save()") SAVE
          SelectBooster
      ChampionsOrAgents(:order='order')
</template>

<style scoped>
.first-row-buttons {
  display: flex;
  margin-right: 15rem;
  gap: 2rem;
}
.abandon-button,
.complete-button {
  width: 200px;
  height: 68px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.abandon-button:hover,
.complete-button:hover,
.need-help:hover {
  transform: rotateY(10deg) rotateX(10deg) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.complete-button {
  background-color: #54bf00;
}
.abandon-button {
  background-color: #e52900;
}
.arrow-image {
  width: 26px;
  height: 25px;
}
.buttons {
  display: flex;
  gap: 1rem;
  margin-left: 700px;
}
.publish-button {
  width: 300px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  background-color: green;
  margin: 0 auto;
  margin-left: 35%
}
.active-button {
  width: 300px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  background-color: rgb(45, 128, 151);
  margin: 0 auto;
  margin-left: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(189, 177, 177);
}
.your-note {
  height: 300px;
  margin-bottom: -130px;
}
.champions-text-and-select-lane {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.champions-text {
  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.any-lane-text,
.any-champion-text{
  font-size: 24px;
  font-weight: 600;
  color: #222;
}
.last-row {
  display: flex;
  justify-content: space-between;
}
.little-icon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.default-border {
  border-radius: 10px;
  border: solid 1px #eee;
  width: 850px;
  height: 700px;
  margin: 0 auto;
  padding: 2rem;
}
.center-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.first-row {
  margin:  0 auto;
  height: 126px;
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #f9f9f9;
  padding: 20px 50px 30px 20px;
  align-items:center;
  justify-content: space-between;
  width: 100vw;

}
.row {
  display: flex;
  align-items: center;
}
.arrow {
  width: 75px;
  height: 75px;
  border-radius: 9px;
  border: solid 1px #eee;
  background-color: #fff;
}
.need-help {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #eee;
  background-color: #fff;
  justify-content: space-around;
  margin-left:25px;
}
.need-help-icon {
  height: 30px;
  width: 30px;
}
.black-text {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  color: #222;
}
.normal-black-text {
  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.state {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(160, 83, 12, 0.25);
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-right: 15rem;
}
.background-template {
  display: flex;
  max-width: 2243px;
  border-radius: 7px;
  border: solid 1px #eee;
  background-color: #fff;
  flex-wrap: wrap;
  padding: 42px 50px 0 39px;
  margin: 42px 50px 70px 39px;
  gap: 4rem;
  margin-right: 20rem;
}
.order-and-chat,
.order-detail {
  width: 950px;
  height: 1546px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 3rem;
  margin: 0 auto;
}
.game-background {
  width: 75px;
  height: 75px;
  border-radius: 9px;
  border: solid 1px #eee;
}
.order-name {
  font-family: Inter;
  font-size: 40px;
  font-weight: bold;
  color: #222;
  padding-left: 2rem;
}
.information-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.grey-text {
  font-size: 20px;
  font-weight: 600;
  color: #bbb;
}
.normal-black-text {
  font-size: 20px;
  font-weight: 600;
  color: #222;
}
.big-black-text {

  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.black-id-text {
  font-size: 40px;
  font-weight: bold;
  color: #555;
}
.please-edit-order {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #f66;
}
.edit-order {
  font-family: Inter;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.edit-order-button {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
}
.save-button {
  width: 140px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  color: #222222;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.account-information {
  height: 580px;
  background-color: #FFFFFF;
  padding: 2rem;
}
.title {
  font-size: 24px;
  font-weight: bold;
}

.flash {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
}
.d,
.f {
  height: 45px;
  width: 45px;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 15px;
}
.flash-buttons {
  display: flex;
  gap: 13px;
}
</style>
