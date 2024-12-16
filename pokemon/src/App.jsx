import React from "react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import PokeCard from "./components/PokeCard";
import { useState } from "react";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  return (
    <>
      <Header />
      
      <SideNav
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
};

export default App;
