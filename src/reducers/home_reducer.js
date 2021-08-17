
import {
  SHOW_LOADING_SPINNER,
  CLEAR_MOVIES,
  SEARCH_MOVIES,
  GET_POPULAR_MOVIES,
  LOAD_MORE_MOVIES,
  SET_POPULAR_PERSISTED_STATE,
  GET_GENERESS,
  GET_INITIAL_MOVIE_INFO
} from '../actions';

const defaultState = {
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: ''
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case SET_POPULAR_PERSISTED_STATE:
      return {
       ...state,
       ...action.payload
      }
    case GET_POPULAR_MOVIES:
      let genreIdMovieMapping = JSON.parse(JSON.stringify(state.genres));;
      action.payload.results.forEach(eachMovie => eachMovie.genre_ids.forEach(genreID=>genreIdMovieMapping[genreID].movieList !== undefined ? genreIdMovieMapping[genreID].movieList.push(eachMovie):genreIdMovieMapping[genreID].movieList=[eachMovie]));

      return {
        ...state,
        genreIdMovieMapping:genreIdMovieMapping,
        // movies: action.payload.results,
        // heroImage: state.heroImage || action.payload.results[0],
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
        searchTerm: ""
      }
    case GET_INITIAL_MOVIE_INFO:

        return {
          ...state,
          heroImage: action.payload,
          loading: false,
          searchTerm: ""
        }
    case GET_GENERESS:
      let obj = {};
      action.payload.genres.forEach(element => {
        obj[element.id] = element;
      });
      return {
        ...state,
        genres:obj
      }
    case LOAD_MORE_MOVIES:
      genreIdMovieMapping = JSON.parse(JSON.stringify(state.genreIdMovieMapping));;
      action.payload.results.forEach(eachMovie => 
        eachMovie.genre_ids.forEach(genreID=>
        genreIdMovieMapping[genreID].movieList !== undefined ? genreIdMovieMapping[genreID].movieList.push(eachMovie) : genreIdMovieMapping[genreID].movieList=[eachMovie]
      ));

      return {
        ...state,
        genreIdMovieMapping:genreIdMovieMapping,
        movies: [...state.movies, ...action.payload.results],
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages
      }
    case SEARCH_MOVIES:
      return {
        ...state,
        searchedMovies: action.payload.results,
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
        searchTerm: action.payload.searchTerm
      }
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      }
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}