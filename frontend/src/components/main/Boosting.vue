<script setup>
const properties = [
    "Select your desired rank with best prices on the market",
    "Make your preferences with extra options",
    "Choose your own booster",
    "Track the progress"
]
</script>

<template lang="pug">
.body
    .informations
        .title Boosting
        .sub-title Looking for carries on your favorite games?
        .properties
            li.property(v-for='property in properties') {{ property }}
        .game-purchase
            v-btn.select-game-background()
                v-img.game(
                width="3rem"
                aspect-ratio='1/1'
                cover
                src='../../assets/icons/valorant.png'
                )
            v-btn.purchase()
                .purchase-text PURCHASE <br> ELOBOOSTING
    .leagues-customer-review
        .leagues
            v-img(
            width="25rem"
            src='../../assets/games/leagueOfLegends/leagues.png'
            )
        v-btn.customer-review()
            .logo
            .customer-review-text CUSTOMER <br> REVIEW
    .match-history
</template>

<style scoped>
.body {
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    font-family: Inter;
    line-height: normal;
}
.informations {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 9rem;
    padding-left: 7.5rem;

}
.title {
    font-size: 64px;
    font-weight: bold;
    text-align: left;
    color: #0083ff;
}
.sub-title {
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    color: rgba(0, 0, 0, 0.75);
}
.properties {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
}
.game-purchase  {
    display: flex;
    gap: 0.5rem;
}
.select-game-background  {
    width: 4rem;
    height: 4rem;
    flex-grow: 0;
    border-radius: 20px;
    background-color: #fff;
}
.purchase {
    width: 200.9px;
    height: 4rem;
    border-radius: 20px;
    background-color: #fff;
}
.purchase-text {
    flex-grow: 0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: normal;
    color: #0083ff;
}
.leagues-customer-review {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:2.5rem;
    padding-top: 9rem;
}
.customer-review {
    width: 303.2px;
    height: 140px;
    border-radius: 20px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #fff;
}
.customer-review-text {
    padding-left: 1rem;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
    color: #d9d9d9;
}
.match-history {
  width: 330px;
  height: 800px;
  background-color: #d9d9d9;
}
</style>