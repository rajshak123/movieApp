import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../../../config";
import './Item.scss'

const Item = ({ movie,onClickMovie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;
      return (
        <div
          onClick={()=>onClickMovie(movie.id)}
          className={cx('item', {
            'item--open': isActive,
          })}
          ref={elementRef}
        >
          <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`} alt="" />
          <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
