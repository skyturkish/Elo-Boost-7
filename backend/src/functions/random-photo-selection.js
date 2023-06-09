const photos = [
    'https://i.pinimg.com/474x/41/25/73/41257308e7e8abc93f390de2fde2df0f.jpg',
    'https://static.wikia.nocookie.net/vsbattles/images/a/a6/Zed2.png/revision/latest/scale-to-width-down/400?cb=20161213163019',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12L0JFBOCXpUpmZnnvvrsHJEhF3fcE3gtlg&usqp=CAU',
    'https://pbs.twimg.com/profile_images/1327564696539590656/YTcB5Jo4_400x400.jpg',
    'https://tiermaker.com/images/avatars-2022/AiGuardian/AiGuardian.jpg?1675292162',
    'https://i.pinimg.com/474x/a9/68/83/a96883ccdf7089f26f51cde4ea447502.jpg',
    'https://animegalaxyofficial.com/wp-content/uploads/2021/03/x2PCK5YP_400x400.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShnxF_5DA8_6EorB2rq3hCgJsnmQN5rlURVQ&usqp=CAU',
    'https://animemotivation.com/wp-content/uploads/2021/11/Nobara-Kugisaki-jjk-anime.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uNXYhyGRHS_e72ony7xCxX1Vov_66pZ1iA&usqp=CAU',
    'https://qph.cf2.quoracdn.net/main-qimg-26fb040cc55c0b40143a02aef0431dbd-lq',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdzsei9BZcyhlCvmipjLaMvkFsUjmwJc-9w&usqp=CAU'
]
function randomPhoto() {
    const randomIndex = Math.floor(Math.random() * photos.length)
    return photos[randomIndex]
}

module.exports = randomPhoto
