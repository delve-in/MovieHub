const commentBtn = document.getElementById('commentBtn');
const userNum = document.getElementById('newCommentForm').className;
const wishBtn = document.getElementById('modal-button2');
const wishList = document.getElementById('wish-list');

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

commentBtn.addEventListener('click', addNewComment);
wishBtn.addEventListener('click', newWish);

