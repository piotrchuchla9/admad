import { twMerge } from "tailwind-merge";
import { MovieType } from "../entities/movieTypes";
import { IconLoader, IconPhotoScan } from '@tabler/icons-react';
import Dialog from "./Dialog";
import { useState } from "react";

const typeMap: { [key: string]: string } = {
  movie: "Film",
  series: "Serial",
  episode: "Epizod",
  game: "Gra",
};

interface TableProps {
  data: MovieType[];
  error?: boolean;
  loading?: boolean;
}

export default function Table({ data, error, loading }: TableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  const handlePosterClick = (poster: string) => {
    if (poster !== "N/A") {
      setSelectedPoster(poster);
      setLoadingImage(true);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-rose-200">
        <thead>
          <tr className="bg-rose-200 text-left">
            <th className="px-4 py-2 border-b">Tytuł</th>
            <th className="px-4 py-2 border-b">Rok</th>
            <th className="px-4 py-2 border-b">Rodzaj</th>
            <th className="px-4 py-2 border-b">Plakat</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && (
            data.map((item, index) => (
              <tr key={index} className={twMerge("hover:bg-rose-100", index % 2 === 0 ? "bg-white" : "bg-gray-100")}>
                <td className="px-4 py-2 border-b">{item.title}</td>
                <td className="px-4 py-2 border-b">{item.year}</td>
                <td className="px-4 py-2 border-b">{typeMap[item.type] || item.type}</td>
                <td className="px-4 py-2 border-b">
                  <IconPhotoScan
                    stroke={item.poster === "N/A" ? 1 : 2}
                    style={{ cursor: item.poster === "N/A" ? "default" : "pointer" }}
                    onClick={() => handlePosterClick(item.poster)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {(error || data.length === 0) && (<p className="text-center font-bold p-4">Nie znaleziono danych</p>)}
      {selectedPoster && (
        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title={"Plakat filmu"}>
          <div className="flex justify-center">
            {loadingImage && <IconLoader className="animate-spin text-blue-500" size={50} />}
            <img src={selectedPoster} alt="Movie Poster" className="max-w-full" onLoad={() => setLoadingImage(false)} />
          </div>
        </Dialog>
      )}
    </div>
  );
}