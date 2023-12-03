// const { Json } = require("sequelize/types/utils");

const listOFWishes = document.getElementById('wish-list');
const uID = document.getElementById('top-Welcome');
const uIDValue = uID.className;
const ID = parseInt(uIDValue)

console.log("Hello, User:"+  uIDValue)

const getWishes = async () => {
    try{
    const allWishes = await fetch(`/api/wishlist/${ID}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    return allWishes;
    then((wishes) => {console.log(wishes)})

    }catch(err){
        console.log(err)
    }
};

const displayWish = (wish) => {
    const newItem = document.createElement('li');
    newItem.classList.add("wish-item");
    newItem.innerText = wish;
    listOFWishes.append(newItem);
};

getWishes().then((res) => res.json())
.then((data) => {
    console.log(data)
    data.forEach(element => {
        console.log(element)
        displayWish(element.movie.title);
    });
});

