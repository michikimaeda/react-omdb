import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';
import { MovieProps } from './components/Movie';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue: string) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search);
          setLoading(true);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <Header text="OMDb Demo" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} {...movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
