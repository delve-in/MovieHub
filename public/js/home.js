  const popularMovies = [
            "https://m.media-amazon.com/images/M/MV5BZWIzNDAxMTktMDMzZS00ZjJmLTlhNjYtOGUxYmZlYzVmOGE4XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BMjNlMTIxNDEtY2U3OC00ZGFlLTgxNzEtZDU3NTdiZTAzN2MxXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BNDk5MzYzZmYtOTFiZi00YmE2LWFjOGUtNjMyODgxNjZiYzRjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BZGJkMDUwZWQtYTMzMS00NTg5LWE1ZTYtOTVhMDI4NGI1YjMyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
        ];

        const topMovies = [
            "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BMjNlMTIxNDEtY2U3OC00ZGFlLTgxNzEtZDU3NTdiZTAzN2MxXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BNDk5MzYzZmYtOTFiZi00YmE2LWFjOGUtNjMyODgxNjZiYzRjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BZGJkMDUwZWQtYTMzMS00NTg5LWE1ZTYtOTVhMDI4NGI1YjMyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg"
        ];

        function createMoviePoster(src, alt) {
            const poster = document.createElement("div");
            poster.className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-4 movie-poster";
            poster.innerHTML = `<img src="${src}" alt="${alt}" class="w-full h-full rounded-lg shadow-md">`;
            return poster;
        }

        function appendMoviePosters(containerId, movieList) {
            const container = document.getElementById(containerId);
            movieList.forEach((src, index) => {
                const poster = createMoviePoster(src, `Movie ${index + 1}`);
                container.appendChild(poster);
            });
        }

        appendMoviePosters("popularMoviesSection", popularMovies);
        appendMoviePosters("topMoviesSection", topMovies);

