const list = document.getElementById('search-list');

const listOnModal = async (event) => {
    list.replaceChildren();
    const searchText = document.getElementById('search-text').value;
    let modifiedSearch = searchText.replace(/ /g, '%20');


    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${modifiedSearch}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eb00155c14mshf8e725094566b56p172ca5jsnf5a2489f14e5',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
    };

try {
	const response = await fetch(url, options);
	const result = await response.json();

    for (i=0; i<result.d.length;i++){
        const newList = document.createElement('li');
        const movieTitle = result.d[i].l;
        const movieYear = result.d[i].y;
        const movieFormat = result.d[i].q;
        const movieId = result.d[i].id;
        newList.innerHTML += 
        `<a href="/api/movie/${movieId}">${movieTitle}(${movieYear}), Format: ${movieFormat}</a>`;
        list.append(newList);
    }


} catch (error) {
	console.error(error);
}

};


document.getElementById('modal-button').addEventListener('click', listOnModal);