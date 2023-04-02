<script setup>
const properties = [
    "Watch our content and learn macro, micro and gameknowledge",
    "Check out the Leaderboard both for players like you and the boosters",
    "Search for your favorite champions in Rank #1 OTP Guides.",
]
</script>

<template lang="pug">
.body
    .cards
        v-img(
            width="133"
            src='../../assets/general/leaderboard.png'
        )
        v-img(
            width="133"
            src='../../assets/general/guides.png'
        )
        v-img(
            width="133"
            src='../../assets/general/lessons.png'
        )
    .informations
        .first-row
            .emote-cat
                v-img(
                width="224"
                aspect-ratio="16/9"
                cover
                src='../../assets/games/leagueOfLegends/emote_cat.png'
            )
            .title HUB
        .sub-title Haven’t you seen our player hub yet?
        .properties
            li.property(v-for='property in properties') {{ property }}
        .game-purchase
            v-btn.purchase()
                .purchase-text TAKE A LOOK <br> AT OUR BLOG
</template>



<style scoped>
.body {
    height: 800px;
    background-color: #fafafa;
    display: flex;
    font-family: Inter;
    line-height: normal;
    justify-content: space-around;
    gap: 8rem;
    padding: 5rem;
}

.emote-cat {
    width: 14rem;
}
.cards {
    display: flex;
    width: 50%;
}
.informations {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: max-content;
    width: 50%;
    text-align: right;
}
.first-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.title {
    font-size: 64px;
    font-weight: bold;
    color: #9948ff;
}
.sub-title {
    font-size: 20px;
    font-weight: 600;
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
    color: #9948ff;
}
</style>
