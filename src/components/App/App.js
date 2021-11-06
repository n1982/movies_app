import React, { Component } from 'react';
import { Spin } from 'antd';

import Header from '../Header';
import CardList from '../CardList';
import MovieDbService from '../../services/MovieDbService';

import './App.css';
import 'antd/dist/antd.css';

import outOfPosterImg from './Out_Of_Poster.jpg'

export default class App extends Component {
  state = {
    dataStream: [],
    isLoading: true,
  };

  MovieDbService = new MovieDbService();

  componentDidMount() {
    this.getMoviesData();
  }

  getMoviesData() {
    this.MovieDbService.getDataFromServer().then((movies) => {
      movies.forEach((elm) => {
        this.addItem(elm);
      });
    });
  }

  createTodoItem = (item) => {

    let posterURL = `${outOfPosterImg}`;
    if (item.poster_path) {
      posterURL = `https://image.tmdb.org/t/p/w185${item.poster_path}`;
    }

    return {
      id: item.id,
      filmTitle: item.title,
      posterURL,
      releaseDate: item.release_date,
      overview: item.overview,
      popularity: item.popularity,
    };
  };

  addItem = (item) => {
    const newItem = this.createTodoItem(item);
    this.setState(({ dataStream }) => {
      const newDataStream = [...dataStream, newItem];
      return {
        dataStream: newDataStream,
        isLoading: false,
      };
    });
  };


  render() {
    // eslint-disable-next-line no-unused-vars
    const { dataStream, isLoading } = this.state;
    // eslint-disable-next-line no-unused-vars
    const cardList = isLoading ? <Spin size="large" /> : <CardList movieDataFromBase={dataStream} />;

    return (
      <div className="app">
        <Header />
        { cardList }
      </div>
    );
  }
}
