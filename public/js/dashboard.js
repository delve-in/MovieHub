const posterImage = document.getElementById('posterPic');
const listOFWishes = document.getElementById('wish-list');
const uID = document.getElementById('top-Welcome');
const listItem = document.querySelector('li');
const uIDValue = uID.className;
const ID = parseInt(uIDValue)

const getWishes = async () => {
    try{
    const allWishes = await fetch(`/api/wishlist/${ID}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    return allWishes;

    }catch(err){
        console.log(err)
    }
};

const displayWish = (wish) => {
    const newItem = document.createElement('li');
    newItem.classList.add(wish.movie.img_link);
    newItem.innerHTML +=
    `<a href="/api/movie/${wish.movie.IMDB_id}">${wish.movie.title}</a>`
    listOFWishes.append(newItem);
};

getWishes()
.then((res) => res.json())
.then((data) => {
                data.forEach(element => {
                displayWish(element);
                    });
                });

listOFWishes.addEventListener(
    "mouseout",
    (event) => {
     posterImage.src = event.target.classList.value;
    },
    false,
  );
