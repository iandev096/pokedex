import Image from "next/image";
import React from "react";
import { BsFillSuitHeartFill, BsLightningChargeFill } from "react-icons/bs";
import { IoShieldHalfSharp } from "react-icons/io5";
import { RiSwordFill } from "react-icons/ri";
import { TiStarburstOutline } from "react-icons/ti";
import { GiCrackedShield } from "react-icons/gi";
import Stat from "./Stat";
import usePokeImageSrc from "../../hooks/usePokeImageSrc";

type Props = {
  hp: number;
  atk: number;
  def: number;
  satk: number;
  sdef: number;
  spd: number;
  id: string;
  name: string;
};

function DetailAvatar({ hp, atk, def, satk, sdef, spd, id, name }: Props) {
  const { src, setFallback } = usePokeImageSrc(id);

  return (
    <div className="group transition-all hover:bg-white outer-circle">
      <Stat Icon={BsFillSuitHeartFill} label="HP" value={hp} />
      <Stat Icon={RiSwordFill} label="ATK" value={atk} />
      <Stat Icon={IoShieldHalfSharp} label="DEF" value={def} />
      <Stat Icon={TiStarburstOutline} label="SATK" value={satk} />
      <Stat Icon={GiCrackedShield} label="SDEF" value={sdef} />
      <Stat Icon={BsLightningChargeFill} label="SPD" value={spd} />
      <div className="relative w-[160px] h-[160px]">
        <Image
          src={src}
          onError={() => setFallback()}
          objectFit="contain"
          layout="fill"
        />
        <h3 className="absolute bottom-0 translate-y-2 text-center text-white group-hover:text-black capitalize font-emotion tracking-wider w-full transition-all">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default DetailAvatar;
