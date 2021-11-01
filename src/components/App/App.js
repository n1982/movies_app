import React, { Component } from 'react';
import './App.css';

import Header from '../Header';

import 'antd/dist/antd.css';
import CardList from '../CardList';


export default class App extends Component {
  state = {};

  getDataFromServer = async (url) => {
    const res = await fetch(url);
    if (!res.ok){
      throw new Error(`Could not load data from ${url}, received ${res.status}`)
    }
    const body = await res.json()
    return body
  };



  render() {
    this.getDataFromServer('https://api.themoviedb.org/3/search/movie?api_key=9420f971c77382011b10789475bfd7fa&page=10&include_adult=false&query=return')
      .then((body)=>{
        console.log(body);
      })
      .catch((err)=>{
        console.log(err);
      })
    return (
      <div className="App">
        <Header />
        <CardList />
      </div>
    );
  }
}
