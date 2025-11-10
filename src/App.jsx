import { Search } from "./components/Search";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";

const token = import.meta.env.VITE_TMDB_API_KEY;

const url = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setError("");
    try {
      const endpoint = query
        ? `${url}/search/movie?query=${encodeURIComponent(query)}`
        : `${url}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.response === "False") {
        setError(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }

      setMovies(data.results);

      updateSearchCount();

      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setError("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        {/* header  */}
        <header>
          <h1>
            <img src="./hero.png" alt="Hero Banner" />
            Find <span className="text-gradient">Movies</span>You'll Enjoy
            Without The Hassle
          </h1>
        </header>

        {/* search bar */}
        <section>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </section>

        {/* all movies */}
        <section className="all-movies">
          <h1>All Movies</h1>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
          {console.log(movies)}
        </section>
      </div>
    </main>
  );
};

export default App;
