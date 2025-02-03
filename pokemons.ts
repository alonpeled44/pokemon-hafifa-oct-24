export default class Pokemon {
  constructor(
    name,
    id,
    types,
    frontView,
    backView,
    frontViewShiny,
    backViewShiny,
    height,
    weight
  ) {
    this._name = name;
    this._id = id;
    this._types = types;
    this._frontView = frontView;
    this._backView = backView;
    this._frontViewShiny = frontViewShiny;
    this._backViewShiny = backViewShiny;
    this._height = height;
    this._weight = weight;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get types() {
    return this._types;
  }
  get frontView() {
    return this._frontView;
  }
  get backView() {
    return this._backView;
  }
  get frontViewShiny() {
    return this._frontViewShiny;
  }
  get backViewShiny() {
    return this._backViewShiny;
  }
  get height() {
    return this._height;
  }
  get weight() {
    return this._weight;
  }
}
