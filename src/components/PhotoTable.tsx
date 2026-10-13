import { useMemo, useState } from "react";
import type { PhotoType } from "@/types";

type SortDirection = "ascending" | "descending";

type PhotoTableProps = {
  photos: PhotoType[];
};

function PhotoTable({ photos }: PhotoTableProps) {
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("ascending");

  const sortedPhotos = useMemo(
    () =>
      [...photos].sort((firstPhoto, secondPhoto) => {
        const comparison = firstPhoto.title.localeCompare(
          secondPhoto.title,
          undefined,
          {
            sensitivity: "base",
            numeric: true,
          },
        );

        return sortDirection === "ascending" ? comparison : -comparison;
      }),
    [photos, sortDirection],
  );

  const toggleSortDirection = () => {
    setSortDirection((direction) =>
      direction === "ascending" ? "descending" : "ascending",
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th scope="col" className="w-20 px-6 py-4">
                Preview
              </th>
              <th scope="col" className="px-6 py-4" aria-sort={sortDirection}>
                <button
                  type="button"
                  onClick={toggleSortDirection}
                  className="inline-flex items-center gap-2 rounded font-semibold text-slate-600 transition hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                >
                  Title
                  <span aria-hidden="true" className="text-indigo-600">
                    {sortDirection === "ascending" ? "↑" : "↓"}
                  </span>
                  <span className="sr-only">
                    {sortDirection === "ascending"
                      ? "Sorted ascending. Activate to sort descending."
                      : "Sorted descending. Activate to sort ascending."}
                  </span>
                </button>
              </th>
              <th scope="col" className="px-6 py-4">
                Photo ID
              </th>
              <th scope="col" className="px-6 py-4">
                Album
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {sortedPhotos.map((photo) => (
              <tr key={photo.id} className="transition hover:bg-slate-50/80">
                <td className="px-6 py-3">
                  <img
                    src={photo.thumbnailUrl}
                    alt=""
                    loading="lazy"
                    className="h-12 w-12 rounded-lg bg-slate-100 object-cover ring-1 ring-slate-200"
                  />
                </td>
                <th
                  scope="row"
                  className="max-w-lg px-6 py-3 font-medium capitalize text-slate-900"
                >
                  {photo.title}
                </th>
                <td className="px-6 py-3 tabular-nums text-slate-500">
                  {photo.id}
                </td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                    {photo.albumId}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PhotoTable;
