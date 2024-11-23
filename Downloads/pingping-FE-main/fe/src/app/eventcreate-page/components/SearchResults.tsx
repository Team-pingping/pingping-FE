import React, { useMemo } from "react";
import SearchResultItem from "@/app/eventcreate-page/components/SearchResultsItem";
import { SearchResultsProps } from "@/app/eventcreate-page/types/types";

function SearchResults({ results, searchTerm, onSelect }: SearchResultsProps) {
  const renderedResults = useMemo(() => {
    return results.map((place) => (
      <SearchResultItem
        key={place.name}
        place={place}
        searchTerm={searchTerm}
        onClick={() => onSelect(place)}
      />
    ));
  }, [results, searchTerm, onSelect]);

  if (results.length === 0) return null;

  return (
    <ul className="w-full max-w-[360px] max-h-[240px] overflow-y-auto bg-white">
      {renderedResults}
    </ul>
  );
}

export default SearchResults;
