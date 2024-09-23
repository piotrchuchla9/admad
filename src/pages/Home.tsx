import { useState } from "react";
import Table from "../components/Table";
import { IconSend2, IconArrowNarrowRight, IconArrowNarrowLeft } from '@tabler/icons-react';
import useMovies, { MovieTypes } from "../hooks/useMovies";
import LoadingDialog from "../components/Loader";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [finalSearch, setFinalSearch] = useState<string>('Harry Potter');
  const [page, setPage] = useState<number>(1);
  const [movieType, setMovieType] = useState<MovieTypes>("");

  const { movies, totalResults, loading, error } = useMovies({
    searchTerm: finalSearch,
    page,
    movieType,
  });

  const totalPages = Math.ceil(totalResults / 10);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchTerm !== "" && setFinalSearch(searchTerm);
    }
  };

  return (
    <div className="container mx-auto">
      <LoadingDialog isOpen={loading} />
      <h1 className="mb-20 text-center text-2xl font-bold">Szukana fraza: <span className="text-rose-500">{finalSearch}</span></h1>
      <div className="w-full h-10 flex">
        <select
          value={movieType}
          onChange={(e) => {
            const selectedType = e.target.value as MovieTypes;
            setMovieType(selectedType);
          }}
          className="border border-gray-300 border-b-0 p-2 rounded"
        >
          <option value="">Wszystkie</option>
          <option value="movie">Film</option>
          <option value="series">Serial</option>
          <option value="episode">Epizod</option>
          <option value="game">Gra</option>
        </select>
        <input onKeyDown={handleKeyPress} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Harry Potter..." className="w-full border border-gray-300 border-b-0 p-2 rounded border-r-0 " />
        <button disabled={searchTerm === ""} className="border rounded border-gray-300 border-b-0 border-l-0"><IconSend2 color={searchTerm === "" ? "gray" : "black"} onClick={() => setFinalSearch(searchTerm)} /></button>
      </div>
      <Table data={movies} />
      <div className="w-full h-10 flex align-middle justify-center items-center">
        <button disabled={page === 1 || page === 0} onClick={() => setPage(page - 1)}><IconArrowNarrowLeft color={ page === 1 || page === 0 ? "gray" : "black" } /></button>
        <p>&nbsp;{page}/{totalPages}&nbsp;</p>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}><IconArrowNarrowRight color={page >= totalPages ? "gray" : "black"} /></button>
      </div>
    </div>
  );
}
