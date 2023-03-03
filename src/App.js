import axios from "axios"
import { useEffect,useState } from "react";
import Header from "./comp/Header";
import MovieScreen from "./comp/MovieScreen";
import Watchlist from "./comp/Watchlist";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  console.log(process.env)
  const addMovie = (movie) => setList([...list, movie]);

  const removeMovie = (movie) => {
    const newState = list.filter((mov) => {
      return mov !== movie;
    });
    setList(newState);
  };

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
          addMovie={addMovie}
          movieList={movieList}
          page={page}
          setPage={setPage}
          list={list}
          removeMovie={removeMovie}
        />
        <Watchlist list={list} removeMovie={removeMovie}/>
      </main>
    </div>
  );
}
 export default App;


 



