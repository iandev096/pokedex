import Image from "next/image";
import React from "react";
import usePokeImageSrc from "../hooks/usePokeImageSrc";

type Props = { id: string; name: string };

function CardItem({ id, name }: Props) {
  const { src, setFallback } = usePokeImageSrc(id);

  return (
    <div className="w-full group">
      <div className="w-full aspect-square rounded-full bg-white/[18%] flex justify-center items-center group-hover:bg-white transition-all">
        <div className="relative w-[100px] h-[100px]">
          <Image
            src={src}
            onError={() => setFallback()}
            objectFit="contain"
            layout="fill"
            alt={name}
          />
        </div>
      </div>
      <div className="bg-transparent mt-2 px-2 py-2 rounded-md">
        <h2 className="font-emotion text-white/70 group-hover:text-white transition-all text-center">
          {name}
        </h2>
      </div>
    </div>
  );
}

export default CardItem;
