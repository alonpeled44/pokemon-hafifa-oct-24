import css from "../css/pokemon-card.module.css";

export default function PokemonCard({ pokemon }) {
  return (
    <div className={css.card}>
      <section>
        <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
        <p>{`#${pokemon.id}`}</p>
      </section>
      <section>
        <img src={pokemon.frontView} />
      </section>
      <section>
        <p>{`Type(s): ${pokemon.types.join(", ")}`}</p>
        <p>{`Height: ${pokemon.height}`}</p>
        <p>{`Weight: ${pokemon.weight}`}</p>
      </section>
    </div>
  );
}
