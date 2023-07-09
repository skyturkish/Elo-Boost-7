<script setup>
import { ref, computed } from 'vue'
import { useAccount } from '@/store/account'
import { useRouter } from 'vue-router';
import UserTags from '@/components/edit-profile/UserTags.vue'
import ChangeThemeAndBanner from '@/components/edit-profile/ChangeThemeAndBanner.vue'
import ChangeAvatar from '@/components/edit-profile/ChangeAvatar.vue'

const router = useRouter();
const useAccountStore = useAccount()

const selectedGame = ref('')

const selectedGamePhoto = computed(() => {
  if(selectedGame.value === '') {
    selectedGame.value = useAccountStore.userGames[0]
  }
  return `../../src/assets/icons/${selectedGame.value}.png`
})

</script>

<template lang="pug">
.background(:style="{ backgroundImage: `url(../../src/assets/banners/${useAccountStore.user.themePreference.path}.png)` }")
  .content
    .save-and-leave(@click="router.back()") SAVE AND LEAVE
v-divider.border-opacity-100(thickness="1rem" v-bind:style="{ borderColor: useAccountStore.user.themePreference.color }")
.informations
  .first-row
    .first-column.column
      .name {{ useAccountStore.user.name || 'No name' }}
      .other-information(v-if="useAccountStore.isBooster()")
        .real-name {{ useAccountStore.user.personalInformation?.name.toUpperCase() || 'No real name' }}  {{ useAccountStore.user.personalInformation?.surName.toUpperCase() || 'No real surname' }}
        .country {{ useAccountStore.user.personalInformation?.country || 'No country' }}
        .birthday {{ useAccountStore.user.personalInformation?.birthDate|| 'No birthday' }}
    .first-second-row.row
      ChangeThemeAndBanner
      ChangeAvatar
  v-divider
  .row
    .second-first-column
      UserTags
    .vertical-divider
    .games-information(v-if="useAccountStore.isBooster()")
      .black-title GAMES
      .game-and-information
        img.game-logo.row(:src='selectedGamePhoto')
        .game-informations
          .game-name {{ selectedGame.split('-').join(' ').toUpperCase() }}
          .other-informations
            span.rank-
              span.rank RANK:
              |   {{ useAccountStore.user.maxRank || 'belirtilmedi' }}
            span.limit-
              span.limit LIMIT:
              |   {{ useAccountStore.userPermissions[useAccountStore.userJobs[0]].games[selectedGame].maxRank }}
            .grade-template.row
              .grade GRADE:
              .grades
                div(v-for="grade in useAccountStore.userGrades") {{ grade }}
      .champion-select
        .champions-title CHAMPIONS
        .champions
          div(v-for="hero in useAccountStore.userNotifications[useAccountStore.userJobs[0]].games[selectedGame].heroes" )
            img.champion(:src='`../src/assets/champions/league-of-legends/${hero}.jpg`')
            div.champion-name {{ hero }}
          v-btn.action-grey-button.center-child EDIT
      .roles-and-serves.row
        .roles.column-and-middle-gap
          .roles-title.grey-text ROLES
          .row-and-middle-gap(v-if="selectedGame === 'league-of-legends'")
            .grey-button.center-child(v-for="role in useAccountStore.userNotifications[useAccountStore.userJobs[0]].games[selectedGame].roles") {{ role.toUpperCase() }}
            v-btn.action-grey-button.center-child EDIT
        .serves.column-and-middle-gap
          .servers-title.grey-text SERVERS
          .row-and-middle-gap
            .grey-button.center-child(v-for="server in useAccountStore.userNotifications[useAccountStore.userJobs[0]].games[selectedGame].servers") {{ server }}
            v-btn.action-grey-button.center-child EDIT
      .range.grey-text RANGE
  v-divider
  .profile-setup(v-if="useAccountStore.isBooster()")
    .black-title PROFILE SETUP
    .text-fields
      .description
      .features
        .feature
        .feature
        .feature
    .column-and-middle-gap(v-if="useAccountStore.userJobs.includes('coach')")
      .grey-text LANGUGES
      .row-and-middle-gap
        .grey-button.center-child(v-for="language in useAccountStore.userNotifications['coach'][selectedGame].languages") {{ language }}
        v-btn.action-grey-button.center-child EDIT
  .reset-password
    .black-title RESET PASSWORD
    .passwords
      .current-password
      .new-password
      .confirm-new-password
    v-btn.action-grey-button.center-child SAVE
</template>

<style scoped>
.informations {
  max-width: 1440px;
  margin: 0 auto;
  font-family: Inter;
}
.game-and-information {
  display:flex
}
.champion-name {
  background-color: #221d1d;
  color: #fff;
  font-size: 14px;
}
.vertical-divider {
  width: 1px;
  height: 716.8px;
  background-color: #ddd;
}
.background {
  padding-top: 270px;
  padding-bottom: 270px;
  background-size: cover;
  background-position-y: 25%;
}
.content {
  padding: 1.5rem;
  margin-top: -17rem;
}
.center-child {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.row {
  display: flex;
}
.row-and-middle-gap {
  display: flex;
  gap: 1.15rem;
  align-items: center;
}
.column-and-middle-gap {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}
.column {
  display:flex;
  flex-direction: column;
}
.save-and-leave {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: right;
  cursor: pointer;
}
.first-row {
  height: 276px;
  padding: 2.5rem;
  display:flex;
  justify-content: space-between;
}
.first-column {
  gap: 1.5rem;
  margin-top: -1rem;
}
.name {
  font-size: 48px;
  font-weight: 500;
  color: #222;
}
.other-information > * {
  font-size: 20px;
  font-weight: 500;
  color: #000;
}
.first-second-row.row {
  gap: 4rem;
}
.v-card {
  width: 68.75rem;
}
.second-row {
  max-height: 720px;
}
.games-information {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.game-logo {
  width: 75px;
  height: 75px;
  border-radius: 9px;
}
.black-title {
  font-size: 32px;
  font-weight: 500;
  color: #333;
}
.game-name {
  font-size: 24px;
  font-weight: 500;
  color: #555;
}
.other-informations {
  display: flex;
  gap: 1rem;
}
.a,
.rank-,
.limit-,
.grade {
  font-size: 20px;
  font-weight: 500;
}
.a,
.rank,
.limit,
.grade {
  color: #aaa;
}
.rank- {
  color: #800000;
}
.limit- {
  color: #003380;
}
.grade-template {
  gap: 0.50rem;
}
.champions-title {
  font-size: 20px;
  font-weight: 500;
  color: #aaa;
}
.champions {
  padding-top: 0.5rem;
  display: flex;
  align-items:center;
  gap: 5px;
}
.roles,
.servers {
  width: 550px;
}
.champion {
  height: 118px;
  width: 108px;
  opacity: 0.95;
  border-radius: 5px;
}
.champion:hover {
  transform: scale(1.05);
  opacity: 1;
}
.action-grey-button  {
  width: 90px;
  height: 40px;
  border-radius: 4px;
  background-color: #fafafa;
  font-size: 20px;
  font-weight: 500;
  color: #ccc;
  cursor: pointer;
}
.roles-and-serves.row {
  padding-top: 2rem;
}
.roles.column,
.servers.column {
  width: 50%;
}
.grey-button {
  width: 90px;
  height: 72px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #fafafa;
  font-size: 20px;
  font-weight: 500;
  color: #ccc;
  box-shadow: #ccc 0px 0px 0px 1.5px inset;
}
.grey-text {
  font-size: 20px;
  font-weight: 500;
  color: #aaa;
}
</style>