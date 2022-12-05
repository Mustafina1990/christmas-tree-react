import { IFilters, IToys, TselectedToy } from "../ts-files/interfaces";
import { data } from "./data";

export function alphabetFilters(array: Array<IToys>, type: string) {
  switch (type) {
    case "a-z":
      array = array.sort((a: IToys, b: IToys) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      break;
    case "z-a":
      array = array.sort((a: IToys, b: IToys) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      break;
    case "top":
      array = array.sort((a: IToys, b: IToys) => {
        if (a.year < b.year) {
          return -1;
        }
        if (a.year > b.year) {
          return 1;
        }
        return 0;
      });
      break;
    case "bot":
      array = array.sort((a: IToys, b: IToys) => {
        if (a.year > b.year) {
          return -1;
        }
        if (a.year < b.year) {
          return 1;
        }
        return 0;
      });
      break;
  }
  return array;
}

export function filterItems(arrayFilters: IFilters) {
  let items = data;
  if (arrayFilters.shape.length > 0) {
    items = items.filter((toy) => {
      for (let i = 0; i < arrayFilters.shape.length; i++) {
        if (toy.shape === arrayFilters.shape[i]) {
          return toy;
        }
      }
    });
  }
  if (arrayFilters.color.length > 0) {
    items = items.filter((toy) => {
      for (let i = 0; i < arrayFilters.color.length; i++) {
        if (toy.color === arrayFilters.color[i]) {
          return toy;
        }
      }
    });
  }
  if (arrayFilters.size.length > 0) {
    items = items.filter((toy) => {
      for (let i = 0; i < arrayFilters.size.length; i++) {
        if (toy.color === arrayFilters.size[i]) {
          return toy;
        }
      }
    });
  }
  if (arrayFilters.search.length > 0) {
    items = items.filter((toy) => {
      if (toy.name.toLowerCase().includes(arrayFilters.search.toLowerCase())) {
        return toy;
      }
    });
  }
  if (arrayFilters.onlyFavorite) {
    items = items.filter((toy) => {
      if (toy.favorite === true) {
        return toy;
      }
    });
  }
  items = items.filter((toy) => {
    if (
      +toy.count >= arrayFilters.count[0] &&
      +toy.count >= arrayFilters.count[1] &&
      +toy.year >= arrayFilters.yearOfPurchase[0] &&
      +toy.year >= arrayFilters.yearOfPurchase[1]
    ) {
      return toy;
    }
  });
  return items;
}

export function getSelectedItem(arr: TselectedToy[], num: number) {
  return arr.find((item) => +item.num === num);
}
