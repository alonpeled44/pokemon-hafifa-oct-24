import Pokemon from "../../pokemons";
import css from "../css/pokemon-card.module.css";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div className={css.card} onClick={onClick}>
      <section className={css["card-header"]}>
        <h1>{pokemon.name}</h1>
        <p>{`#${pokemon.id}`}</p>
      </section>
      <section className={css["card-img"]}>
        <img src={pokemon.frontView} />
      </section>
      <section className={css["card-info"]}>
        <p>
          <span>{"Type(s): "}</span>
          {pokemon.types.join(", ")}
        </p>
        <p>
          <span>{"Height: "}</span>
          {`${pokemon.height}m`}
        </p>
        <p>
          <span>{"Weight: "}</span>
          {`${pokemon.weight}kg`}
        </p>
      </section>
    </div>
  );
}
