import React, { Component } from 'react';
import Header from '../Header';
import 'antd/dist/antd.css';
import CardList from '../CardList';
import MovieDbService from '../../services/MovieDbService';
import './App.css';

export default class App extends Component {
  state = {
    dataStream: [],
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
    let posterURL = `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Out_Of_Poster.jpg/180px-Out_Of_Poster.jpg`;
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
      };
    });
  };

  render() {
    const { dataStream } = this.state;

    return (
      <div className="App">
        <Header />
        <CardList movieDataFromBase={dataStream} />
      </div>
    );
  }
}
