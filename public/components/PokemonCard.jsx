import css from "../css/pokemon-card.module.css";

export default function PokemonCard({ pokemon, onClick }) {
  return (
    <div className={css.card} onClick={onClick} id={pokemon.id}>
      <section className={css["card-header"]}>
        <h2>{pokemon.name}</h2>
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
