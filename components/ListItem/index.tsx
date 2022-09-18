import Image from "next/image";
import React from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { RiSwordFill } from "react-icons/ri";
import { IoShieldHalfSharp } from "react-icons/io5";
import Stat from "./Stat";

type Props = {};

function ListItem({}: Props) {
  return (
    <div className="flex bg-white/80 rounded-md px-4 py-2">
      <div className="relative w-[76px] h-[48px]">
        <Image
          className="before:content-none"
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/1.png"
          }
          objectFit="contain"
          layout="fill"
        />
      </div>
      <div className="flex-1 self-center ml-5">
        <h2>Pokemon name</h2>
      </div>
      <div className="sm:flex gap-5 hidden ">
        <Stat Icon={BsFillSuitHeartFill} value={60} />
        <Stat Icon={RiSwordFill} value={60} />
        <Stat Icon={IoShieldHalfSharp} value={60} />
      </div>
    </div>
  );
}

export default ListItem;
