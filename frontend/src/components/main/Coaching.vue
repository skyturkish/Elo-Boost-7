<script setup>
const properties = [
    "Select your in-game rank, type your expectations",
    "Edit your order with preferences",
    "Choose your own coach",
    "Book hours of coaching now"
]
</script>

<template lang="pug">
.body
    .best-coaches-list
    .coach-profile-briston
        v-img(
        aspect-ratio='16/9' 
        cover='' 
        src='../../assets/games/valorant/coach-briston-profile.png'
        )
    .informations
        .title COACHING
        .sub-title Need a pro that can coach you in-voice?
        .properties
            li.property(v-for='property in properties') {{ property }} 
        .game-purchase 
            v-btn.purchase()
                .purchase-text PURCHASE <br> COACHING
            v-btn.select-game-background() 
                v-img.game(
                width="3rem"
                aspect-ratio='1/1' 
                cover
                src='../../assets/icons/overwatch.png'
                ) 
    
</template>



<style scoped>
.body {
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    font-family: Inter;
    line-height: normal;
    height: 50rem;
}
.best-coaches-list {
    width: 21rem;
    background-color: #d9d9d9;
}
.coach-profile-briston {
    width: 22.5rem;
}
.title {
    font-size: 64px;
    font-weight: bold;
    color: #ff7a00;
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
    text-align: right;
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
    color: #ff7a00;
}
</style>