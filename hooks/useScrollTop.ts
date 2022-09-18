import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

function useScrollTop(ref: React.RefObject<HTMLDivElement>) {
  const { query } = useRouter();
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [query.page]);
}

export default useScrollTop;
