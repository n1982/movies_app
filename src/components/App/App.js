import React, { Component } from 'react';
import { Alert, Empty, Pagination, Space, Spin } from 'antd';
import { format, parseISO } from 'date-fns';

import MovieDbService from '../../services/MovieDbService';
import Header from '../Header';
import Search from '../Search';
import CardList from '../CardList';

import './App.css';
import 'antd/dist/antd.css';

import outOfPosterImg from './Out_Of_Poster.jpg';

export default class App extends Component {
  state = {
    dataStream: [],
    isLoading: true,
    isError: false,
    notFound: false,

  };

  componentDidMount() {
    this.getMoviesData();
  }



  getMoviesData = (query) => {

    const callMovieDbService = new MovieDbService();
    this.setState({
      dataStream: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
    callMovieDbService
      .getMovies(query)
      .then((movies) => {
        console.log(movies);
        if (movies.results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true,
          });
        }
        movies.results.forEach((elm) => {
          this.addItem(elm);
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          notFound: false,
          isError: true,
        });
      });
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

  createTodoItem = (item) => {
    const releaseDate = item.release_date ? format(parseISO(item.release_date), 'MMMM dd, yyyy') : 'no release date';
    const filmTitle = item.title || 'Movie title not specified';
    const overview = item.overview || 'Movie overview not specified';
    const popularity = item.popularity || -0;
    let posterURL = `${outOfPosterImg}`;
    if (item.poster_path) {
      posterURL = `https://image.tmdb.org/t/p/w185${item.poster_path}`;
    }
    return {
      id: item.id,
      filmTitle,
      posterURL,
      releaseDate,
      overview,
      popularity,
    };
  };

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  render() {
    const { dataStream, isLoading, isError, notFound } = this.state;
    const error = isError ? (
      <Alert message="Error" description="Что-то пошло не так. Но мы скоро все исправим :-)" type="error" showIcon />
    ) : null;
    const notFoundMovies = notFound ? <Empty /> : null;
    const cardList = isLoading && !isError ? <Spin size="large" /> : <CardList movieDataFromBase={dataStream} />;

    return (
     <>
      <Header />
      <Search getMoviesData={this.getMoviesData} />
      <Space direction="vertical" className="app" align="center">
        {cardList}
        {notFoundMovies}
        {error}
        <Pagination defaultCurrent={1} total={50} />
      </Space>
     </>
    );
  }
}
