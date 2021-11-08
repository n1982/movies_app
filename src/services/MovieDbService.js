export default class MovieDbService {
  apiKey = '9420f971c77382011b10789475bfd7fa';

  async getDataFromServer() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&page=10&include_adult=false&query=return`
      );
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      const body = await res.json();
      return body.results;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', err.message);
      return err.message;
    }
  }
}
