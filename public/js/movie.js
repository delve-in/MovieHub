// const {format_date} = require('../../utils/helper');
// const format_date = require("../../utils/helper");

const commentBtn = document.getElementById('commentBtn');
const userNum = document.getElementById('newCommentForm').className;
const wishBtn = document.getElementById('modal-button2');
const wishList = document.getElementById('wish-list');
const ratingRange = document.getElementById('rating');
const sliderValue = document.getElementById('sliderValue');
const mHRating = document.getElementById('mHRating');
const commentsBox = document.getElementById('commentsbox');

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
    if (!textForComment){
        Swal.fire({
            title: 'Error!',
            text: 'Please enter a comment to submit',
            icon: 'question',
            confirmButtonText: 'Okay'
          })
        return;
    }
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
    await fetch(`/api/comment/list/${movie}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((data) => addNewComments(data))


    // location.replace('/dashboard');
}


const new_date = (date) => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getFullYear()}`;
};


const addNewComments = (commentData) =>{
    console.log(commentData);
    commentsBox.replaceChildren();
    for (i=0; i<commentData.length; i++){
        const formDate = new_date(commentData[i].updatedAt)
        const newDiv = document.createElement('div');
        newDiv.className = "userComments bg-gray-200 p-2 rounded-md mb-2";
        newDiv.innerHTML = `<p class="text-sm">${commentData[i].comment}, Posted by: ${commentData[i].user.username}           on: ${formDate} </p>`;
        commentsBox.append(newDiv);
    }
};





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
        wishList.replaceChildren();
        data.forEach(wish => {
            const newListItem = document.createElement('li');
            newListItem.id = wish.movie.img_link;
            newListItem.innerHTML +=
            `<a href="/api/movie/${wish.movie.IMDB_id}">${wish.movie.title}</a>`;
            wishList.append(newListItem);
        });
    }


    const renderOrNot = (data) =>{
        if (data > 0 ){
            Swal.fire({
                title: 'Already Saved',
                text: 'You already have this title in your wishlist',
                icon: 'warning',
                confirmButtonText: 'Okay'
              })
    
            // window.alert("You already have this title in your wishlist");
            getWishes().then((res) => res.json())
            .then((result) => renderWishes(result));
        }
        else{
            postWish(movie, user, imageLink, movTitle);
        };
    };

try{
    const countWish = await fetch(`/api/movie/getid/${number}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.movie_id === 0){
                postWish(movie, user, imageLink, movTitle);
                return;
            }
            else{
                await fetch(`/api/wishlist/count/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: user,
                        movie_id: data.movie_id,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then((res) => res.json())
                .then((data) => renderOrNot(data))
            };
        });
}catch(err){
    console.log(err);
}



    
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

