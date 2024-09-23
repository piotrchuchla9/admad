import { useState, useEffect } from "react";
import { MovieType } from "../entities/movieTypes";

export type MovieTypes = "movie" | "series" | "episode" | "game" | "";

interface UseMoviesProps {
  searchTerm: string;
  page: number;
  movieType: MovieTypes;
}

const useMovies = ({ searchTerm, page, movieType }: UseMoviesProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const typeQuery = movieType ? `&type=${movieType}` : "";
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}&page=${page}${typeQuery}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        const moviesData: MovieType[] = data.Search.map((movie: any) => ({
          title: movie.Title,
          year: parseInt(movie.Year),
          type: movie.Type,
          poster: movie.Poster,
        }));
        setMovies(moviesData);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No results found");
      }
    } catch (error) {
      setMovies([]);
      setTotalResults(0);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, page, movieType]);

  return { movies, totalResults, loading, error };
};

export default useMovies;