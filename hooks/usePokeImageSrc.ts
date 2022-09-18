import { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import pokeball from "../public/images/pokeball.png";

function usePokeImageSrc(id: string | number) {
  const [src, setSrc] = useState<string | StaticImageData>("");

  useEffect(() => {
    setSrc(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    );
  }, [id]);

  const setFallback = useCallback(() => setSrc(pokeball), []);

  return { src, setFallback };
}

export default usePokeImageSrc;
