
export default class MovieDbService {

  apiKey = '9420f971c77382011b10789475bfd7fa'

  async getDataFromServer() {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9420f971c77382011b10789475bfd7fa&page=10&include_adult=false&query=return`);
    if (!res.ok) {
      throw new Error(`Could not load movies data from MovieDB, received ${res.status}`);
    }
    const body = await res.json();
    return body.results;
  }

  async getPosterUrl(id){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}&language=en-US`);
    if (!res.ok) {
      throw new Error(`Could not load poster from MovieDB, received ${res.status}`);
    }
    const body = await res.json();
    return body.results;
  }


}
