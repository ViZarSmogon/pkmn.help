import classnames from "classnames";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CoverageType, Pokemon } from "./data";
import ScreenDefense from "./ScreenDefense";
import ScreenInfo from "./ScreenInfo";
import ScreenOffense from "./ScreenOffense";
import ScreenPokedex from "./ScreenPokedex";
import ScreenPokedexHelp from "./ScreenPokedexHelp";
import ScreenWeaknessCoverage from "./ScreenWeaknessCoverage";

const tabClass = classnames([
  "no-underline",
  "pv2 ph2 f5",
  "TabFocus",
  "b bn",
  "br--top br2",
  "bg-transparent",
  "fg3 bottom-border-thick",
]);

const tabClassActive = classnames(["fg1 bottom-border-thick-current"]);

export default function App() {
  const [defenseParams, setDefenseParams] = useState("");
  const [offenseParams, setOffenseParams] = useState("");
  const [pokedexParams, setPokedexParams] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [coverageTypes, setCoverageTypes] = useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    async function load() {
      const bigPKMN = await import(
        /* webpackChunkName: "big-pkmn" */
        /* webpackPrefetch: true */
        "./big-pkmn"
      );
      setIsLoading(false);
      setCoverageTypes(bigPKMN.fallbackCoverageTypes);
      setFallbackCoverageTypes(bigPKMN.fallbackCoverageTypes);
      setAllPokemon(bigPKMN.AllPokemon);
    }
    load();
  }, []);
  return (
    <div className="sans-serif bg2 fg1 min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white PokeballHeader">
          <Link
            to="/"
            className="no-underline white hover-white-90 DottedFocus"
          >
            Pokémon Type Calculator
          </Link>
        </h1>
        <nav
          className={classnames([
            "flex justify-center",
            "bg1",
            "bb TabBarBorder",
            "pt3",
          ])}
        >
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/offense${offenseParams}`}
          >
            Offense
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/defense${defenseParams}`}
          >
            Defense
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/pokedex${pokedexParams}`}
          >
            Pokédex
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to="/info"
          >
            Info
          </NavLink>
        </nav>
        <Switch>
          <Route
            path="/offense/coverage"
            render={() => (
              <ScreenWeaknessCoverage
                setCoverageTypes={setCoverageTypes}
                offenseParams={offenseParams}
                fallbackCoverageTypes={fallbackCoverageTypes}
                isLoading={isLoading}
              />
            )}
          />
          <Route
            path="/offense"
            render={() => (
              <ScreenOffense
                coverageTypes={coverageTypes}
                setCoverageTypes={setCoverageTypes}
                setOffenseParams={setOffenseParams}
                fallbackCoverageTypes={fallbackCoverageTypes}
                isLoading={isLoading}
              />
            )}
          />
          <Route
            path="/defense"
            render={() => (
              <ScreenDefense
                setDefenseParams={setDefenseParams}
                fallbackCoverageTypes={fallbackCoverageTypes}
              />
            )}
          />
          <Route
            path="/pokedex/help"
            render={() => <ScreenPokedexHelp pokedexParams={pokedexParams} />}
          />
          <Route
            path="/pokedex"
            render={() => (
              <ScreenPokedex
                setPokedexParams={setPokedexParams}
                allPokemon={AllPokemon}
                isLoading={isLoading}
              />
            )}
          />
          <Route path="/info" component={ScreenInfo} />
          <Redirect to="/defense" />
        </Switch>
      </div>
    </div>
  );
}

App.displayName = "App";
