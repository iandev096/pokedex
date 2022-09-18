import { Button } from "./../components/Button";
import { SearchBar } from "./../components/SearchBar";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { push } = useRouter();

  return (
    <div className="h-screen w-full container mx-auto flex justify-center items-center px-4">
      <Head>
        <title>Pokedex | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <div className="max-w-xl mx-auto">
          <h1 className="font-pilot text-orange-200 text-center text-6xl mb-16">
            POKEDEX
          </h1>

          <SearchBar onQueryChange={(q) => push("/search-result?q=" + q)} />

          <div className="flex justify-center">
            <div className="space-x-4 mt-6">
              {/* <Button>Search</Button> */}
              <Link href="/pokemon/1" passHref>
                <a>
                  <Button>View All</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div>Featured</div>
      </div>
    </div>
  );
};

export default Home;
