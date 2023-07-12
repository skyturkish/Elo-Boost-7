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
import OrderInformations from '@/components/panel/OrderInformations.vue'
import Chat from '@/components/panel/Chat.vue'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const router = useRouter()

const validationRules = {
      "userName":  [
        value => {
          if (value) return true

          return 'User-name is requred.'
        },
        value => {
          if (value?.length >= 4) return true

          return 'Name must be at least 4 characters.'
        },
        value => {
          if (value?.length < 25) return true

          return 'Name must be less than 25 characters.'
        },
      ],
      "password": [
          value => {
            if (value) return true

            return 'Password is requred.'
          },
          value => {
            if (value?.length >= 8) return true

            return 'Password must be at least 8 characters.'
          },
          value => {
            if (value?.length < 100) return true

            return 'Password must be less than 100 characters.'
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
  console.log('is ready to publish function trigger')
  return userName.value.length > 3 &&  userName.value.length < 25 && password.value.length > 7 && password.value.length < 100
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

    const newAccountInformation = await axios.patch(`/account-information/${order.value._id}`, {
        object: {
          order: order._id,
          userName: userName.value,
          password: password.value,
        }
      }
    )
    console.log(newAccountInformation)

    accountInformation.value = newAccountInformation.data
    userName.value = newAccountInformation.data.userName
    password.value = newAccountInformation.data.password

    const updatedOrder = await axios.patch(`/order`, {
      orderId: order.value._id,
      object:{
        note: note.value,
        flash: flash.value,
        state: 'active',
        autoPublish: autoPublish.value,
        booster: currentLeagueOfLegendsOrder.booster?._id || null
     }
    })


    // boosterin seçilip seçilmemesine göre patch at handle et

    order.value = updatedOrder.data

    userName.value = ''
    password.value = ''

    backendSuccess.value = 'you successfully saved your account information'
  } catch (error) {
    console.log(error)
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const orderInfo = await axios.get(`order/${orderId}`)
  order.value = orderInfo.data
  currentLeagueOfLegendsOrder.booster = null

  const accountInfo = await axios.get(`/account-information/${order.value._id}`)

  accountInformation.value = accountInfo.data
})

</script>

<template lang="pug">
.edit-order(v-if="order != null" )
  .row.first-row
    .row
      .arrow.center-child(@click="router.go(-1)")
        img.arrow-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/arrow-left.webp" alt="arrow-left")
      .need-help.row.center-child(v-if="!useAccountStore.isBooster")
        img.need-help-icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/need-help.webp' alt="need-help")
        h3.black-text NEED HELP
    .buttons-or-state
      .state.center-child(v-if="!useAccountStore.isBooster" :style="{backgroundColor: findStateColor(order.state)}") {{ order.state.toUpperCase() }}
      .first-row-buttons(v-else)
        .abandon-button ABANDON
        .complete-button COMPETE
  .background-template
    .order-and-chat(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .row
        img.game-background(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/${order.game}.webp`' alt="game")
        .order-name {{ order.orderType.toUpperCase() }} BOOST ORDER
      PreviewOrder(:order='order')
      Chat(:order='order')
    .order-detail(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .information-row
         .big-black-text ORDER DETAILS
         .black-id-text {{ '#' + order._id.substring(0,10) }}
      .default-border
        OrderInformations(:order='order')
        .publish-state
          .only-paid(v-if="order.state == 'paid' && !isReadyToPublish")
            div.please-edit-order(v-if="!isReadyToPublish")
              p PLEASE EDIT YOUR ORDER AND ADD LOGIN INFO
                br
                | AS SOON AS POSSIBLE
          .active(v-else-if="isReadyToPublish && accountInformation != null  && (order.state == 'active' || order.state == 'pending' || order.state == 'assigned' || order.state == 'paused')" @click="publish")
            v-btn.active-button EDIT INFORMATIONS
          .active(v-else-if="!isReadyToPublish && accountInformation != null")
            v-btn.active-button PUBLISHED
          v-btn.publish-button(v-else-if="isReadyToPublish" :loading="loading" @click="publish" ) PUBLIsH
        .last-row
          v-btn.edit-order-button(v-if="!useAccountStore.isBooster")
            img.little-icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/edit-order.webp' alt="edit-order")
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
                    v-btn.save-button(@click="dialog = false") CANCEL
                    v-btn.save-button(@click="save()") SAVE
          .price(v-else)
            .price-text 170.30€
            .percentage-text (%65)
          SelectBooster(v-if="!useAccountStore.isBooster")
          v-tooltip(v-else location="left" :text='order.note' )
            template(v-slot:activator='{ props }')
              v-btn.edit-order-button(v-if="order.note" v-bind='props')
                img.medium-icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/read-note.webp' alt="read-note")
                .edit-order-text READ NOTE
      ChampionsOrAgents(:order='order')
      .little-divider
      div(v-if="accountInformation != null")
        div.account-text ID: {{ accountInformation.userName }}
        div.account-text PW: {{ accountInformation.password }}

      //- AccountInformation(v-if="order.booster != null" :order='order')
</template>

<style scoped>
.little-divider {
  height: 1px;
  background-color: #eee;
  margin: 2rem -3rem 1rem -3rem;
}
.account-text {
  font-size: 32px;
  font-weight: 500;
  color: #bbb;
}
.medium-icon {
  width: 26.25px;
  height: 26.25px;
  margin-right: 20px;
}
.price {
  display: flex;
  align-items: center;
  gap: px;
}
.price-text {
  font-size: 48px;
  font-weight: bold;
  color: #222;
}
.percentage-text {
  font-size: 36px;
  font-weight: bold;
  color: #444;
}
.publish-state {
  align-self: center;
}
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
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  background-color: green;
}
.active-button {
  width: 300px;
  height: 50px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  background-color: rgb(45, 128, 151);
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
  align-items: center;
}
.little-icon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.default-border {
  border-radius: 10px;
  border: solid 1px #eee;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  cursor: pointer;
}
.arrow:hover {
  transform: rotateY(10deg) rotateX(10deg) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
  cursor: pointer;
}
.need-help-icon {
  height: 30px;
  width: 30px;
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

  font-size: 40px;
  font-weight: bold;
  color: #222;
  padding-left: 2rem;
}
.information-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
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
  font-size: 32px;
  font-weight: bold;
  color: #555;
}
.please-edit-order {

  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #f66;
}
.edit-order {

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
