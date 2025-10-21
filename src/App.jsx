import { Search } from "./components/Search";
import { useEffect, useState } from "react";

const token = import.meta.env.VITE_TMDB_API_KEY;

const url = "https://api.themoviedb.org/3/discover/movie";
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
  const [data, setData] = useState([]);

  const fetchMovies = () => {
    setIsLoading(true);
    try {
      return fetch(`${url}?&page=1&sort_by=popularity.desc`, options)
        .then((res) => res.json())
        .then((data) => setData(data.results))
        .finally(() => setIsLoading(false));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchMovies();
    }
    fetchData();
  }, []);

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
        <section>
          <h1>All Movies</h1>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              {data.map((data) => (
                <div key={data.id} className="text-white">
                  {data.title}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
