import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';
import { MovieProps } from './components/Movie';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

type State = {
  loading: boolean;
  movies?: MovieProps[];
  errorMessage?: any;
};

type Action = {
  type:
    | 'SEARCH_MOVIES_REQUEST'
    | 'SEARCH_MOVIES_SUCCESS'
    | 'SEARCH_MOVIES_FAILURE';
  payload?: any;
  error?: any;
};

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const search = (searchValue: string) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

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
          movies.map((movie: MovieProps, index: number) => (
            <Movie key={`${index}-${movie.Title}`} {...movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
