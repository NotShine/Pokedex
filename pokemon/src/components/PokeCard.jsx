import React, { useState } from "react";
import { useEffect } from "react";
import { getPokedexNumber } from "../utils";

const PokeCard = (props) => {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if loading, exit logic
    if (loading || !localStorage) {
      return;
    }
    //check if selected pokemon information is in cache

    //1.define cache

    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }
    //2. check if selcted pokemon is in cache else, fetch from api

    if (selectedPokemon in cache) {
      //read from cache
      setData(cache[selectedPokemon]);
      console.log('Found pokemon in cache')
      return;
    }

    //we need to fetch from api

    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalURL = baseUrl + suffix;
        const res = await fetch(finalURL);
        const pokemonData = await res.json();
        setData (pokemonData)
        console.log(pokemonData);
        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonData();
    //if fetching from api, then save to cache.
  }, [ selectedPokemon]);
  return <></>;
};

export default PokeCard;
