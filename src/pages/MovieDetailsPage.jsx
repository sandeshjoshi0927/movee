import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});

  const token = import.meta.env.VITE_TMDB_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { id } = useParams();

  const fetchMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );

    if (!response.ok) {
      throw new Error("Error fetching movie");
    }

    const movie = await response.json();
    setMovie(movie);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="movie-detail">
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieDetailsPage;
