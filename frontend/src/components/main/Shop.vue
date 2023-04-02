<script setup>
const properties = [
    "Buy and Sell Accounts in Market",
    "Smurf Accounts with Lifetime Guarantee",
    "Cashflow",
    "Daily refreshed goods",
    "Win Prizes"
]
</script>

<template lang="pug">
.body
    .informations
        .title SHOP
        .sub-title Looking for accounts?
        .properties
            li.property(v-for='property in properties') {{ property }}
        v-img(
            src='../../assets/general/shop.png'
            )
    .lace-accounts-checkoutMarketPlace
        v-img.lace(
            src='../../assets/general/shop-lace.png'
            )
        v-img.accounts(
            cover
            src='../../assets/general/accounts.png'
            )
        .checkoutMarketPlace
            v-btn.select-game-background()
                v-img.game(
                width="3rem"
                src='../../assets/icons/valorant.png'
                )
            v-btn.purchase()
                .purchase-text CHECK OUT <br> MARKETPLACE
    .list-customer
</template>

<style scoped>
.body {
    height: 800px;
    background-color: #fafafa;
    display: flex;
    font-family: Inter;
    line-height: normal;
    justify-content: space-around;
}
.informations {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 33%;

}
.title {
    font-size: 64px;
    font-weight: bold;
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

.lace-accounts-checkoutMarketPlace {
    width: 30%;
}
.game-purchase  {
    display: flex;
    gap: 0.5rem;
}
.select-game-background  {
    width: 4rem;
    height: 4rem;
    border-radius: 20px;
    background-color: #fff;
}
.purchase {
    width: 12.5rem;
    height: 4rem;
    border-radius: 20px;
    background-color: #fff;
}
.purchase-text {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: normal;
    color: #ffb800;

}
.list-customer {
  width: 21rem;
  background-color: #d9d9d9;
}
</style>
