import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

function useQuery(query: string, onQueryChange?: (q: string) => any) {
  const [q, setQ] = useState(query);

  const debouncedOnQueryChange = useCallback(
    debounce((text: string) => {
      if (!onQueryChange || text.length < 3) {
        return;
      }
      console.log("debounced");
      onQueryChange(text);
    }, 300),
    []
  );

  useEffect(() => {
    setQ(query);
  }, [query]);

  useEffect(() => {
    if (!onQueryChange || q.length < 3) {
      return;
    }
    debouncedOnQueryChange(q);
  }, [q]);

  return { q, setQ };
}

export default useQuery;
