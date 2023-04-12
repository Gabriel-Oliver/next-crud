export default class Customer {
  #id: string;
  #name: string;
  #age: number;
  #avatar?: File | null;

  constructor(
    name: string,
    age: number,
    avatar: File | null = null,
    id: string = ""
  ) {
    this.#name = name;
    this.#age = age;
    this.#avatar = avatar;
    this.#id = id;
  }

  static empty() {
    return new Customer("", 0);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get avatar() {
    return this.#avatar;
  }

  get age() {
    return this.#age;
  }
}
