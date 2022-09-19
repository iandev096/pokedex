import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { fetchPokemons } from "../../../api/pokemon";
import { Button } from "../../../components/Button";
import CardItem from "../../../components/CardItem";
import Header from "../../../components/Header";
import Pagination from "../../../components/Pagination";
import Stage from "../../../components/Stage";
import { PokemonData } from "../../../type";
import { extractID } from "../../../util/pokemon-data";

const ITEMS_PER_PAGE = 16;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetchPokemons();
  const resData = res.data;
  const PAGE_COUNT = Math.ceil(resData.count / ITEMS_PER_PAGE);
  const paths = [...new Array(PAGE_COUNT)].map((_, idx) => ({
    params: { page: `${idx + 1}` },
  }));

  return {
    paths: [...paths],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchPokemons();
  const resData = res.data;

  const PAGE_COUNT = Math.ceil(resData.count / ITEMS_PER_PAGE);
  const pokemons: PokemonData = resData.results;

  return {
    props: {
      pageCount: PAGE_COUNT,
      pokemons,
    },
  };
};

function Pokemon({
  pageCount,
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("pageCount::", pageCount);
  const { query, push } = useRouter();
  const PAGE = Number(query.page);

  const endIndex = Number(PAGE) * ITEMS_PER_PAGE;
  const startIndex = endIndex - 16;
  const PAGE_DATA: PokemonData = pokemons.slice(startIndex, endIndex);

  return (
    <div className="h-screen w-full container mx-auto px-4">
      <Head>
        <title>Pokedex | Page {PAGE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl h-full flex flex-col mx-auto">
        <Header
          left={
            <Link passHref href={"/"}>
              <a>
                <AiTwotoneHome className="text-white" size={20} />
              </a>
            </Link>
          }
          title={`Page ${PAGE} of ${pageCount}`}
        />

        <Stage>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-10 px-6 my-8">
            {PAGE_DATA.map((item) => (
              <Link
                key={extractID(item.url)}
                passHref
                href={`/pokemon/detail/${item.name}`}
              >
                <a>
                  <CardItem id={extractID(item.url)} name={item.name} />
                </a>
              </Link>
            ))}
          </div>
        </Stage>

        <div className="h-20 flex justify-between items-center">
          <Button
            onClick={() => push(`/pokemon/${PAGE - 1}`)}
            disabled={PAGE === 1}
          >
            Prev
          </Button>
          {/* <Pagination /> */}
          <Button
            onClick={() => push(`/pokemon/${PAGE + 1}`)}
            disabled={PAGE === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
