<script setup>
import { ref } from 'vue'
import { useAccount } from '@/store/account'
import { banners } from '@/constants/banners'
import { useRouter } from 'vue-router';
const router = useRouter();

const useAccountStore = useAccount()

const themeDialog = ref(false)
const avatarDialog = ref(false)

async function changeBannerAndCloseDialog(banner) {
  await useAccountStore.updateThemePreference(banner)
  themeDialog.value = false
}
</script>

<template lang="pug">
v-img.image(cover :src='`../../src/assets/banners/${useAccountStore.user.themePreference.path}.png`')
  .save-and-leave(@click="router.back()") SAVE AND LEAVE
v-divider.border-opacity-100(thickness="1rem" v-bind:style="{ borderColor: useAccountStore.user.themePreference.color }")
.informations
  .first-row
    .first-column.column
      .name {{ useAccountStore.user.name || 'No name' }}
      .other-information
        .real-name {{ useAccountStore.user.personalInformation?.name || 'No real name' }}
        .country {{ useAccountStore.user.personalInformation?.country || 'No country' }}
        .birthday {{ useAccountStore.user.personalInformation?.birthDate|| 'No birthday' }}
    .first-second-row.row
      .theme
        v-img.change-theme-and-banner.center-child(cover :src='`../../src/assets/banners/${useAccountStore.user.themePreference.path}.png`')
          | CHANGE THEME AND BANNER
        v-dialog(v-model='themeDialog' activator='parent' width='auto')
          v-card.row
            v-img.change-theme-and-banner(v-for="banner in banners" cover :src='`../../src/assets/banners/${banner.path}.png`' @click="changeBannerAndCloseDialog(banner)")
      .profile
        v-img.change-avatar.center-child(cover :src='useAccountStore.user.photo')
          | CHANGE AVATAR
        v-dialog(v-model='avatarDialog' activator='parent' width='auto')
          v-card.row
            h1 this is avatar
  v-divider
  .row
    .second-first-column
      .tags-title.center-child TAGS
      .tags
        .tag.center-child(v-for="tag in useAccountStore.user.permissions") {{ tag }}
    .games-information
      .black-title GAMES
      .game-and-information.row
        .game-logo.row
          v-img(src='../../src/assets/icons/league-of-legends.png')
        .informations
          .game-name LEAGUE OF LEGENDS
          .other-informations
            span.rank-
              span.rank RANK:
              |   GRANDMASTER
            span.limit-
              span.limit LIMIT:
              |   DIAMOND III
            .grade-template.row
              .grade GRADE:
              .grades
                .a DIVINE BOOSTER
                .a COACH
                .a SELLER
      .champions-
        .champions-title CHAMPIONS
        .champions
          .champion(v-for="champion in useAccountStore.user.mainChampions")
            v-img(:src='`../src/assets/champions/splash-arts/${champion}.jpg`')
          v-btn.action-grey-button.center-child EDIT
      .roles-and-serves.row
        .roles.column-and-middle-gap
          .roles-title.grey-text ROLES
          .row-and-middle-gap
            .grey-button.center-child(v-for="role in useAccountStore.user.mainLanes") {{ role.toUpperCase() }}
            v-btn.action-grey-button.center-child EDIT
        .serves.column-and-middle-gap
          .servers-title.grey-text SERVERS
          .row-and-middle-gap
            .grey-button.center-child(v-for="server in useAccountStore.user.mainServers") {{ server }}
            v-btn.action-grey-button.center-child EDIT
      .range.grey-text RANGE
  v-divider
  .profile-setup
    .black-title PROFILE SETUP
    .text-fields
      .description
      .features
        .feature
        .feature
        .feature
    .column-and-middle-gap
      .grey-text LANGUGES
      .row-and-middle-gap
        .grey-button.center-child(v-for="language in useAccountStore.user.languages") {{ language }}
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
.image {
  max-height: 540px;
  margin: 0 auto;
  padding: 1.5rem;
}
.save-and-leave {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: right;
  cursor: pointer;
}
.informations  {
  max-width: 1440px;
  margin: 0 auto;
  font-family: Inter;
}
.first-row {
  height: 276px;
  padding: 2.5rem 3rem 0 2.5rem;
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
.change-avatar,
.change-theme-and-banner {
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
.change-theme-and-banner {
  width: 418px;
  height: 150px;
  border: solid 1px #905939;
  text-shadow: 0 0 10px #000;
}
.change-avatar {
  width: 150px;
  height: 150px;
  box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 2px #171120;
}
.v-card {
  width: 68.75rem;
}
.second-row {
  max-height: 720px;
}
.tags-title {
  width: 333px;
  height: 55px;
  background-color: #ddd;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
}
.tags {
  width: 333px;
  gap: 1.2rem;
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tag {
  width: 250px;
  height: 40px;
  border-radius: 4px;
  background-color: #fafafa;
  font-size: 20px;
  font-weight: 500;
  color: #ccc;
}
.games-information {
  padding: 2rem;
}
.game-logo {
  width: 75px;
  height: 75px;
  border-radius: 9px;
  border: solid 1px #ddd;
}
.black-title {
  font-size: 32px;
  font-weight: 500;
  color: #333;
}
.game-and-information {
  padding-top: 1.75rem;
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
  gap: 2px;
}
.roles,
.servers {
  width: 550px;
}
.champion {
  height: 118px;
  width: 105px;
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
}
.grey-text {
  font-size: 20px;
  font-weight: 500;
  color: #aaa;
}
</style>