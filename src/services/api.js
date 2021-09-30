import axios from 'axios'

//URL FILMES EM CARTAZ

// https://developers.themoviedb.org/3/movies/get-now-playing
//https://api.themoviedb.org/3/movie/now_playing/?api_key=36e456779a9112244392c37cf3409133&language=pt-BR&page=1

export const key = '36e456779a9112244392c37cf3409133';
const api = axios.create({
  baseURL:'https://api.themoviedb.org/3'
})

export default api;