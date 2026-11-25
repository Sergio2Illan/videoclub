const container = document.getElementById('container')

const loadMovies = async ()=>{

    try {
        const response  = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=XXXXXXXXXXXXXXXXXXXXX&page=1')

        console.log(response)

        if(!response.ok){
            throw new Error('Error al llamar a la API')
        }

        const data = await response.json()

        console.log('*************====> ', data)

            showData(data.results)
        

    } catch (error) {
        console.log('****************=> ',error)
    }
}


function showData(peliculas){

    peliculas.forEach(pelicula => {
        container.innerHTML += `
            <div class='pelicula'>
                <img class='poster' alt='${pelicula.title}' src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'>
                <h3 class='titulo'>${pelicula.title}</h3>
            </div> 
        `
    });
}


loadMovies()