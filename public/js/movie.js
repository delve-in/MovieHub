const commentBtn = document.getElementById('commentBtn');
const userNum = document.getElementById('newCommentForm').className;
const wishBtn = document.getElementById('modal-button2');
const wishList = document.getElementById('wish-list');
const ratingRange = document.getElementById('rating');
const sliderValue = document.getElementById('sliderValue');
const mHRating = document.getElementById('mHRating');

let url = window.location.href.split('/');
let number = url[5];

const imageLink = document.getElementById('posterLink').src;
const movTitle = document.getElementById('movieTitle').innerText;
const movie = number;
const user = userNum;


const addNewComment = async (event) =>{
    event.preventDefault();
    const textForComment = document.getElementById('newComment').value;
    const ratingValue = document.getElementById('rating').value;

    await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment: textForComment, 
            imdbID: movie, 
            user_id: user,
            img: imageLink,
            title: movTitle,
            rating: ratingValue }),
        headers: { 'Content-Type': 'application/json' },
    });
    location.replace('/dashboard');
}

const newWish = async (event) => {
    event.preventDefault();

    const postWish = async (movie, user, imageLink, movTitle) =>{
        try{
        await fetch('/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
            imdbID: movie, 
            user_id: user,
            img: imageLink,
            title: movTitle,
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    getWishes().then((res) => res.json())
    .then((data) => renderWishes(data));
        

    }catch(err){
        console.log(err);
    }
    };

    const getWishes = async () => {
    try{
    const allWishes = await fetch(`/api/wishlist/${user}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return allWishes;
    }catch(err){
        console.log(err)
    }
    };

    const renderWishes = (data) =>{
        data.forEach(wish => {
            const newListItem = document.createElement('li');
            newListItem.id = wish.movie.img_link;
            newListItem.innerHTML +=
            `<a href="/api/movie/${wish.movie.IMDB_id}">${wish.movie.title}</a>`;
            wishList.append(newListItem);
        });
    }

    postWish(movie, user, imageLink, movTitle)
}

const avgRating = async(number) =>{
    
    await fetch(`/api/movie/findid/${number}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then(async (data) => {
        await fetch(`/api/comment/avgRating/${data.id}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res)=> res.json())
        .then((data)=> {
            displayRating(data)})
    })
    
};

const displayRating = (rating) => {
    const defaultVal = "Not yet reviewed";
    const ratVal = rating.avgRating;
    const ratInt = parseFloat(ratVal).toFixed(1)
    if (ratInt>0){
    mHRating.innerText = ratInt;
    }
    else{
        mHRating.innerText = defaultVal;
    }

}

avgRating(number);

sliderValue.innerHTML = ratingRange.value;

ratingRange.oninput = function(){
    sliderValue.innerHTML = this.value;
}

commentBtn.addEventListener('click', addNewComment);
wishBtn.addEventListener('click', newWish);

