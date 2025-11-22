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

  const {
    title,
    backdrop_path,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    overview,
    status,
    original_language,
    budget,
    revenue,
    tagline,
  } = movie;

  const infos = [
    { title: "Overview", desc: overview },
    { title: "Release Date", desc: release_date },
    { title: "Status", desc: status },
    { title: "Language", desc: original_language },
    { title: "Budget", desc: budget },
    { title: "Revenue", desc: revenue },
    { title: "Tagline", desc: tagline },
  ];

  return (
    <div className="movie-detail">
      {console.log(movie)}

      <div className="head grid grid-cols-12">
        <div className="head-details col-span-9">
          <h2>{title}</h2>
          <div className="flex flex-row gap-2 font-light">
            <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
            <span>•</span>
            <p>{runtime} min</p>
          </div>
        </div>

        <div className="col-span-3 bg-[#221F3D] rounded-xl flex items-center justify-center">
          {vote_average && <img src="../../public/star.svg" />}
          {vote_average ? vote_average.toFixed(1) : ""}
          <span>/10 </span> ({vote_count})
        </div>
      </div>

      <div className="image">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="backdrop"
        />

        <img
          className="banner"
          src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
          alt=""
        />
      </div>

      <div className="text-white">
        {infos.map((info) => (
          <div className="grid grid-cols-12">
            <p className="col-span-3">{info.title}</p>
            <p className="col-span-7 text-sm">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
