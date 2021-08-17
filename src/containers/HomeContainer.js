import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getPopularMovies,
  showLoadingSpinner,
  searchMovies,
  clearMovies,
  loadMoreMovies,
  setPopularPersistedState,
  getGeneres,
  getInitialMovieInfo
} from '../actions';
import Home from '../components/Home/Home';

class HomeContainer extends Component {
  componentDidMount(){
    this.getMovies();
  }

  componentDidUpdate() {
    if (this.props.movies.length > 0) {
      if (this.props.searchTerm === "") {
        sessionStorage.setItem("HomeState", JSON.stringify(this.props));
      }
    } 
    
  }

  getMovies = () => {
    this.props.showLoadingSpinner();
    this.props.getGeneres()
      .then(()=>this.props.getPopularMovies())
      .then(()=>this.props.getInitialMovieInfo(this.props.genreIdMovieMapping[Object.keys(this.props.genreIdMovieMapping)[0]].movieList[0].id))
      // .then(()=>Promise.all([
      //     this.loadMoreMovies(),
      // ])
      // )
  }
  loopMoreMoviesCall = () => {
    for ( let i = 0;i<5;i++){
      this.loadMoreMovies()
    }
  }
  searchMovies = searchTerm => {
    this.props.clearMovies();
    this.props.showLoadingSpinner();
    this.props.searchMovies(searchTerm);
  }
  onGetMovieInfo = movieID => {
    this.props.showLoadingSpinner();
    this.props.getInitialMovieInfo(movieID)
  }
  loadMoreMovies = () => {
    const { searchTerm, currentPage } = this.props;

    this.props.showLoadingSpinner();
    this.props.loadMoreMovies(searchTerm, currentPage);
  }

  render() {
    return (
      <div>
        <Home
        { ...this.props }
        searchMovies={this.searchMovies}
        loadMoreMovies={this.loadMoreMovies}
        onGetMovieInfo={this.onGetMovieInfo}
      />
      </div>

    );
  }
}

const mapStateToProps = state => {
  return state.home;
}

const mapDispatchToProps = {
  getGeneres,
  getInitialMovieInfo,
  getPopularMovies,
  showLoadingSpinner,
  searchMovies,
  clearMovies,
  loadMoreMovies,
  setPopularPersistedState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
