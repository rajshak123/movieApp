import React, { Component } from "react";
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";
import {
  searchMovies,
} from '../../../actions';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../../config";
class Autosuggestion extends Component {
  constructor(props){
    super(props)
    this.state={
      suggestions:[],
      value:''
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length > 0) {
      this.props.searchMovies(trimmedValue)
        .then(res => {
        const results = res.payload.results.map(movie => {
          let temp = {}
          temp.id = movie.id
          temp.title = movie.title
          temp.img = movie.poster_path
          temp.year = (movie.release_date === "") ? "0000" : movie.release_date.substring(0, 4)
          return temp
        });
        this.setState({suggestions: results});
      }).catch(error => console.log('Exception to get Suggestions'))
    } else {
      this.setState({suggestions: []})
    }
  }

  onSuggestionSelected = (event, {suggestion, method}) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    this.setState({value: ''});
  };

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  renderSuggestion = (suggestion) => {
    const { onClickMovie } = this.props
    return (<a onClick={()=>onClickMovie(suggestion.id)}>
      <img className="search-result-image" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${suggestion.img}`} alt="" />
      <div className="search-result-text">
        <div className="search-result-name">
          {suggestion.title}
        </div>
        <br/>
      </div>
    </a>);
  };

  onChange = (event, {newValue, method}) => {
    this.setState({value: newValue});
  };

  handleKeyDown = (event) => {
    if (event.key == 'Enter') { // eslint-disable-line
      return this.handleSubmit(this.state.value);
    }
  }

  render() {
    // ES6 Destructuring state
    const { value , suggestions} = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyPress: this.handleKeyDown,
      placeholder: 'Search movies'
    };

    return (
      <div>
        {/* <FontAwesome icon="search" className="search-icon-style" /> */}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
    </div>
    );
  }
}

const mapStateToProps = state => {
  return state.home;
}

const mapDispatchToProps = {
  searchMovies
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Autosuggestion);
