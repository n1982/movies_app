export default class MovieDbService {
  apiKey = '9420f971c77382011b10789475bfd7fa';

  baseUrl = 'https://api.themoviedb.org/3/';

  // url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&page=10&include_adult=false&query=return`;

  // eslint-disable-next-line no-unused-vars
  getDataFromServer = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      const body = await res.json();
      return body;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', err.message);
      return err.message;
    }
  };

  getMovies = async (searchQuery = 'return', pageNumber = 1) => {

    const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&page=10&include_adult=false&query=${searchQuery}&page=${pageNumber}`;
    const body = await this.getDataFromServer(url);
    return body;
  };
}
