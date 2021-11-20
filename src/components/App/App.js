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
    movies: [],
    ratedFilm: [],
    isLoading: true,
    isError: false,
    notFound: false,
    searchQuery: '',
    numberPage: 1,
    totalPages: 1,
    guestSessionId: 1,
    tabPane: '1',
    rating: 0,
  };

  componentDidMount() {
    this.createGuestSession();
  }

  createGuestSession = () => {
    const callMovieDbService = new MovieDbService();
    callMovieDbService.guestSession().then((body) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        guestSessionId: body.guest_session_id,
        isLoading: false,
      });
    });
  };

  searchMoviesData = () => {
    // eslint-disable-next-line no-unused-vars
    const { searchQuery, numberPage } = this.state;
    const callMovieDbService = new MovieDbService();
    this.setState({
      movies: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
    callMovieDbService
      .searchMovies(searchQuery, numberPage)
      .then((item) => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          totalPages: item.total_pages,
          numberPage,
        });
        if (item.results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true,
          });
        }
        item.results.forEach((elm) => {
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

  getRatedMovies = () => {
    const { guestSessionId } = this.state;
    const callMovieDbService = new MovieDbService();
    this.setState({
      ratedFilm: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
    callMovieDbService
      .getRatedMovies(guestSessionId)
      .then((item) => {
        if (item.results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true,
          });
        }
        item.results.forEach((elm) => {
          this.addRatedItem(elm);
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

  onInputChange = (searchQuery) => {
    this.setState(
      {
        searchQuery,
        // eslint-disable-next-line react/no-unused-state
        numberPage: 1,
      },
      () => {
        this.searchMoviesData();
      }
    );
  };

  onTabChange = (key) => {
    if (key === '2') {
      this.setState(
        {
          tabPane: key,
        },
        () => {
          this.getRatedMovies();
        }
      );
    } else {
      this.setState({
        notFound: false,
        tabPane: key,
      });
    }
  };

  onPageChange = (page) => {
    this.setState(
      {
        numberPage: page,
      },
      () => {
        this.searchMoviesData();
      }
    );
  };

  addItem = (item) => {
    const newItem = this.createTodoItem(item);

    this.setState(({ movies }) => {
      const newDataStream = [...movies, newItem];
      return {
        movies: newDataStream,
        isLoading: false,
      };
    });
  };

  addRatedItem = (item) => {
    const newItem = this.createTodoItem(item);

    this.setState(({ ratedFilm }) => {
      const newDataStream = [...ratedFilm, newItem];
      return {
        ratedFilm: newDataStream,
        isLoading: false,
      };
    });
  };

  createTodoItem = (item) => {
    const releaseDate = item.release_date ? format(parseISO(item.release_date), 'MMMM dd, yyyy') : 'no release date';
    const filmTitle = item.title || 'Movie title not specified';
    const overview = item.overview || 'Movie overview not specified';
    const popularity = item.popularity || 0;
    const rating = item.rating || 0;
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
      rating,
    };
  };

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  render() {
    const { movies, isLoading, isError, notFound, totalPages, numberPage, guestSessionId, tabPane, rating, ratedFilm } =
      this.state;
    const error = isError ? (
      <Alert message="Error" description="Что-то пошло не так. Но мы скоро все исправим :-)" type="error" showIcon />
    ) : null;
    const notFoundMovies = notFound ? <Empty /> : null;
    const cardList =
      tabPane === '1' ? (
        <CardList movieDataFromBase={movies} guestSessionId={guestSessionId} />
      ) : (
        <CardList movieDataFromBase={ratedFilm} guestSessionId={guestSessionId} rating={rating} />
      );
    const spin = isLoading && !isError ? <Spin size="large" /> : null;

    const search = tabPane === '1' ? <Search onInputChange={this.onInputChange} /> : null;

    const pagination =
      tabPane === '1' ? (
        <Pagination defaultCurrent={1} current={numberPage} total={totalPages * 10} onChange={this.onPageChange} />
      ) : null;
    return (
      <>
        <Header onTabChange={this.onTabChange} />
        {search}
        <Space direction="vertical" className="app" align="center">
          {spin}
          {cardList}
          {notFoundMovies}
          {error}
          {pagination}
        </Space>
      </>
    );
  }
}
