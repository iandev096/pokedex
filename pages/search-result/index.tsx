import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { searchPokemon } from "../../api/pokemon";
import { Button } from "../../components/Button";
import CardItem from "../../components/CardItem";
import Header from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import Stage from "../../components/Stage";
import useQuery from "../../hooks/useQuery";
import { PokemonData } from "../../type";
import { extractID } from "../../util/pokemon-data";
import { setClientSideQueryParam } from "../../util/query-param";

type Props = {};

function SearchResult({}: Props) {
  const { query } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<PokemonData>([]);

  useEffect(() => {
    if (!query.q) {
      return;
    }
    setSearchTerm(query.q as string);
  }, [query.q]);
  useQuery(searchTerm, (q) => setSearchTerm(q));

  useEffect(() => {
    let isMounted = true;
    if (!searchTerm || searchTerm.length < 3) {
      return;
    }

    searchPokemon(searchTerm).then((result) => {
      if (isMounted) {
        setSearchResult(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  const handleQueryChange = (q: string) => {
    setClientSideQueryParam("q", q);
    setSearchTerm(q);
  };

  return (
    <div className="h-screen w-full container mx-auto px-4">
      <Head>
        <title>Pokedex | Search</title>
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
          middle={
            <SearchBar
              size="small"
              query={searchTerm}
              onQueryChange={handleQueryChange}
            />
          }
          title={"Search Results"}
        />

        <Stage>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-10 px-6 my-8">
            {searchResult.map((item) => (
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
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
