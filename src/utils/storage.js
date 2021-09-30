import AsyncStorage from '@react-native-async-storage/async-storage';


//Buscar os filmes

export async function getMoviesSave(key){
  const myMovies = await AsyncStorage.getItem(key)

    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

//Salvar um filme


export async function saveMovie(key, newMovie){
  let moviesStored= await getMoviesSave(key)
    //ignorar um filme com o mesmo ID
  const hasMovie = moviesStored.some(item => item.id == newMovie.id)
  if(hasMovie){
    console.log('Filme já na lista');
    return;
  }
    moviesStored.push(newMovie);
    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
    console.log('Filme salvo!')
}


//Deletar um filme especifico
export async function deleteMovie(id){
  let moviesStored = await getMoviesSave('@prime')
  
  let myMovies = moviesStored.filter(item =>{
    return (item.id !== id)
  })
  await AsyncStorage.setItem('@prime', JSON.stringify(myMovies))
  console.log('Filme deletado!')
  return myMovies;

}

//Filtrar algum filme
export async function hasMovie(movie){
  let moviesStored = await getMoviesSave('@prime');
  const hasMovie = moviesStored.find(item => item.id == movie.id)
  
  if(hasMovie){
    return true;
  }
   return false;
}