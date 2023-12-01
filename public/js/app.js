const list = document.getElementById('search-list');

const listOnModal = async (event) => {
    const searchText = document.getElementById('search-text').value;
    console.log(searchText);
    let modifiedSearch = searchText.replace(/ /g, '%20');
    console.log(modifiedSearch);


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
	console.log(result);

    for (i=0; i<result.d.length;i++){
        const newList = document.createElement('li');
        console.log(result.d[i]);
        const movieTitle = result.d[i].l;
        const movieYear = result.d[i].y;
        const movieFormat = result.d[i].q;
        const movieId = result.d[i].id;
        newList.innerHTML += 
        `<a href="/api/movie/${movieId}">${movieTitle}(${movieYear}), format: ${movieFormat}</a>`;
        list.append(newList);
    }
    // const array = [1,2,3,'apple',5,6,7,8,'Banana'];
    // result.forEach((nums) => {
    //     console.log(nums);
    //     const itemInList = nums.l;
    //     console.log(itemInList);
    //     const newList = document.createElement('li');
    //     newList.append(itemInList);
    //     list.append(newList);
    //     console.log(newList);

    // })
    console.log('HELLO!');


} catch (error) {
	console.error(error);
}

};


document.getElementById('modal-button').addEventListener('click', listOnModal);