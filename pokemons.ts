export default class Pokemon {
  private _name: string;
  private _id: number;
  private _types: string[];
  private _frontView: string;
  private _backView: string;
  private _frontViewShiny: string;
  private _backViewShiny: string;
  private _height: number;
  private _weight: number;
  constructor(
    name: string,
    id: number,
    types: string[],
    frontView: string,
    backView: string,
    frontViewShiny: string,
    backViewShiny: string,
    height: number,
    weight: number
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
