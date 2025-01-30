import css from "../css/pokemon-card.module.css";

export default function PokemonCard({ pokemon, onClick }) {
  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  return (
    <div className={css.card} onClick={onClick} id={pokemon.id}>
      <section>
        <h2>{capitalize(pokemon.name)}</h2>
        <p>{`#${pokemon.id}`}</p>
      </section>
      <section>
        <img src={pokemon.frontView} />
      </section>
      <section>
        <p>
          <span>{"Type(s): "}</span>
          {pokemon.types.map((type) => capitalize(type)).join(", ")}
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
