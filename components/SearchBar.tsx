import React, { useEffect, useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import useQuery from "../hooks/useQuery";

type Props = {
  size?: "regular" | "small";
  query?: string;
  onQueryChange?: (q: string) => any;
};

export function SearchBar({
  size = "regular",
  query = "",
  onQueryChange,
}: Props) {
  const { q, setQ } = useQuery(query, onQueryChange);
  const height = { small: "h-10", regular: "h-14" };
  const icon = { small: 14, regular: 20 };
  const opacity = { regular: 1, small: 0.7 };

  return (
    <div
      className={`border-2 border-gray-800 rounded-full ${height[size]} flex group overflow-hidden`}
    >
      <div className="w-14 transition-all group-hover:bg-gray-800 h-full flex justify-center items-center">
        <FaSearch
          opacity={opacity[size]}
          size={icon[size]}
          className="text-white"
        />
      </div>
      <input
        autoFocus
        placeholder="Search Pokemon"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 transition-all group-hover:bg-gray-800 bg-transparent outline-0 text-white"
      />
      <div className="w-14 transition-all group-hover:bg-gray-800 flex h-full justify-center items-center">
        {/* <FaMicrophone
          opacity={opacity[size]}
          size={icon[size]}
          className="text-white"
        /> */}
      </div>
    </div>
  );
}
