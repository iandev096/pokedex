import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { fetchPokemonDetail, fetchPokemons } from "../../../api/pokemon";
import { Button } from "../../../components/Button";
import DetailAvatar from "../../../components/DetailAvatar";
import Header from "../../../components/Header";
import Stage from "../../../components/Stage";
import Tag from "../../../components/Tag";
import { PokemonData } from "../../../type";

type PokemonDetial = {
  name: string;
  id: string;
  weigth: any;
  abilities: any;
  species: any;
  stats: {
    hp: any;
    atk: any;
    def: any;
    satk: any;
    sdef: any;
    spd: any;
  };
  moves: {
    name: any;
  }[];
  types: {
    name: any;
  }[];
};
type Props = {
  detail: PokemonDetial;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetchPokemons();
  const pokemonData: PokemonData = res.data.results;

  const paths = pokemonData.map((item) => ({
    params: { name: item.name },
  }));

  return {
    paths: [...paths],
    fallback: false,
  };
};

function extractStats(data: any[]) {
  return {
    hp: data.find((item) => item.stat.name === "hp").base_stat,
    atk: data.find((item) => item.stat.name === "attack").base_stat,
    def: data.find((item) => item.stat.name === "defense").base_stat,
    satk: data.find((item) => item.stat.name === "special-attack").base_stat,
    sdef: data.find((item) => item.stat.name === "special-defense").base_stat,
    spd: data.find((item) => item.stat.name === "speed").base_stat,
  };
}
function extractMoves(data: any[]) {
  return data.map((item) => ({ name: item.move.name }));
}
function extractTypes(data: any[]) {
  return data.map((item) => ({ name: item.type.name }));
}

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context.params?.name as string;
  const res = await fetchPokemonDetail(name);

  const pokemonDetail: PokemonDetial = {
    name,
    id: res.data.id,
    weigth: res.data.weight,
    abilities: res.data.abilities.map((item: any) => ({
      name: item.ability.name,
    })),
    species: res.data.species.name,
    stats: extractStats(res.data.stats),
    moves: extractMoves(res.data.moves),
    types: extractTypes(res.data.types),
  };

  return {
    props: {
      detail: pokemonDetail,
    },
  };
};

function PokemonDetail({ detail }: Props) {
  const { back } = useRouter();

  return (
    <div className="h-screen w-full container mx-auto px-4">
      <Head>
        <title>Pokedex | {detail.name.toLocaleUpperCase()} Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl h-full flex flex-col mx-auto">
        <Header
          left={
            <span className="cursor-pointer" onClick={(e) => back()}>
              <AiOutlineArrowLeft className="text-white" size={20} />
            </span>
          }
          title={"Item 1 of 1124"}
        />

        <Stage>
          <div className="flex justify-center mt-20">
            <DetailAvatar
              hp={detail.stats.hp}
              atk={detail.stats.atk}
              def={detail.stats.def}
              satk={detail.stats.satk}
              sdef={detail.stats.sdef}
              spd={detail.stats.spd}
              id={detail.id}
              name={detail.name}
            />
          </div>

          <div className="bg-white/10 mx-6 md:mx-auto md:w-3/4 mb-6 mt-16 rounded-md px-6 py-6 space-y-8 ">
            <div className="grid grid-cols-2">
              <div>
                <h2 className="mb-4 text-[#bdbbbb] font-emotion tracking-wider">
                  Species
                </h2>
                <p className="text-white">{detail.species}</p>
              </div>
              <div>
                <h2 className="mb-4 text-[#bdbbbb] font-emotion tracking-wider">
                  Weight
                </h2>
                <p className="text-white">{detail.weigth} lbs</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-[#bdbbbb] font-emotion tracking-wider">
                Moves
              </h2>
              <div className="flex gap-x-4 gap-y-3 flex-wrap -ml-3 max-h-32 overflow-y-scroll">
                {detail.moves.map((item) => (
                  <Tag key={item.name} label={item.name} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-[#bdbbbb] font-emotion tracking-wider">
                Types
              </h2>
              <div className="flex gap-x-4 gap-y-3 flex-wrap -ml-3">
                {detail.types.map((item) => (
                  <Tag key={item.name} label={item.name} />
                ))}
              </div>
            </div>
          </div>
        </Stage>

        {/* <div className="h-20 flex justify-between items-center">
          <Button>Prev</Button>

          <Button>Next</Button>
        </div> */}
      </div>
    </div>
  );
}

export default PokemonDetail;
