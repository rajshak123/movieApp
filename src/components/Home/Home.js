import React from "react";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import SearchBar from "../elements/SearchBar/SearchBar";
import Spinner from "../elements/Spinner/Spinner";
import "./Home.css";
import Slider from '../elements/slider/Slider';



const Home = ({
  heroImage,
  loading,
  searchMovies,
  loadMoreMovies,
  genreIdMovieMapping =[],
  onGetMovieInfo
}) => {

  let DetailedInfo = null;
  if(loading) {
    DetailedInfo = <Spinner/>
  } else if (heroImage) {  
    DetailedInfo =  <div>
        <SearchBar callback={searchMovies} onClickMovie={onGetMovieInfo}/>
          <MovieInfo
            movie={heroImage.movie}
            directors={heroImage.directors}
            time={heroImage.movie.runtime}
            budget={heroImage.movie.budget}
            revenue={heroImage.movie.revenue}
          />
      </div>
  }
  return   (


  <div className="rmdb-home">
      
    {DetailedInfo}
  <div className="rmdb-moviethumb">
  </div>
    { Object.values(genreIdMovieMapping).map((genre)=>{
      if(genre.movieList && genre.movieList.length){
        return  <div key={genre.id}>
          <h1>{genre.name}</h1>
          <Slider onClickMore={loadMoreMovies}>
            {genre.movieList.map(movie => (
              <Slider.Item movie={movie} key={`${genre.id}-${movie.id}`} onClickMovie={onGetMovieInfo}>item</Slider.Item>
            ))}
          </Slider>
        </div>
      }
    })}
  
</div>)
}
;

export default Home;
