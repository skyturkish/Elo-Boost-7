<script setup>
import PanelBanner from '@/components/PanelBanner'
import { computed } from 'vue'
import { useAccount } from '@/store/account'
import { useRouter } from 'vue-router'

const router = useRouter()
const useAccountStore = useAccount()

const dynamicColor = computed(() => {
  return useAccountStore.user.themePreference.color
})
</script>

<template lang="pug">
PanelBanner
v-divider.border-opacity-100(thickness="1rem" v-bind:style="{ borderColor: useAccountStore.user.themePreference.color }")
.panel
  .routers-select
    v-list(:active-color="dynamicColor")
      v-list-item(to='/panel/dashboard')
        template(v-slot:prepend='')
          v-icon(icon='mdi-monitor-dashboard')
        v-list-item-title(v-text='`Dashboard`')
      v-list-group(v-if="useAccountStore.isBooster()" value="booster")
        template(v-slot:activator="{ props }")
          v-list-item(v-bind="props" prepend-icon="mdi-gamepad-variant-outline" title="Boosting" )
        .selections(v-bind:style="{ borderTop: `solid 1px ${dynamicColor}` , borderBottom: `solid 1px ${dynamicColor}` }")
          .selection(@click="router.push('/panel/boosting-available-offers')") AVAILABLE OFFERS
          .selection(@click="router.push('/panel/boosting-current-offers')") CURRENT ORDERS
      v-list-item(v-else to='/panel/your-eloboost-orders')
        template(v-slot:prepend='')
          v-icon(icon='mdi-gamepad-variant-outline')
        v-list-item-title(v-text='`Boosting`')
      v-list-group(v-if="useAccountStore.isBooster()" value="coaching")
        template(v-slot:activator="{ props }")
          v-list-item(v-bind="props" prepend-icon="mdi-human-male-board-poll" title="Coaching" )
        .selections(v-bind:style="{ borderTop: `solid 1px ${dynamicColor}` , borderBottom: `solid 1px ${dynamicColor}` }")
          .selection(@click="router.push('/panel/coaching-available-offers')") AVAILABLE OFFERS
          .selection(@click="router.push('/panel/coaching-current-offers')") CURRENT ORDERS
      v-list-item(v-else to='/panel/your-coaching-orders')
        template(v-slot:prepend='')
          v-icon(icon='mdi-human-male-board-poll')
        v-list-item-title(v-text='`Coaching`')
      v-list-item(to='/panel/account-market')
        template(v-slot:prepend='')
          v-icon(icon='mdi-shopping-outline')
        v-list-item-title(v-text='`Account-Market`')
      v-list-item(to='/panel/hub')
        template(v-slot:prepend='')
          v-icon(icon="mdi-account-box-outline")
        v-list-item-title(v-text='`Hub`')
  router-view()
  .empty
</template>

<style scoped>

.panel {
  display: flex;
  justify-content: space-between;
}
.routers-select {
  background-color: #f9f9f9;
  max-height: 125rem;
  min-width: 212px;
}
.v-list-item {
  height: 4.4rem;

}
.v-list-item {
  font-size: 16px;
  font-weight: bold;
}
.selections {
  height: 119px;
  background-color: #f9f9f9;
  font-size: 10px;
  font-weight: 600;
  color: #676767;
  display:flex;
  flex-direction: column;
  padding: 1.9rem;
  gap: 1.75rem;
}
.selection {
  cursor: pointer;
}
</style>
