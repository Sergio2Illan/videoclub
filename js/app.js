const container = document.getElementById('container')
let pages = 1

const functionObserver = (entradas) =>{
    entradas.forEach(entrada =>{
        if(entrada.isIntersecting){
            pages++
            loadMovies()
        }
    })
}

let observer = new IntersectionObserver(functionObserver,{
    rootMargin: '0px 0px 300px 0px',
    threshold: 1.0
})



const loadMovies = async ()=>{

    try {
        const response  = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=XXXXXXXXXXXXXXXXX&page=${pages}`)

        console.log(response)

        if(!response.ok){
            throw new Error('Error al llamar a la API')
        }

        const data = await response.json()

        showData(data.results)
        

        const allMovies = document.querySelectorAll('.pelicula')
        const lastMovie = allMovies[allMovies.length - 1]
        observer.observe(lastMovie)

    } catch (error) {
        console.log('****************=> ',error)
    }
}


const showData = (peliculas) => {

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