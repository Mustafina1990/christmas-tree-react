import exp from "constants";

export interface IbuttonOptions {
  id: string;
  text?: string;
  className: string;
}

export interface IToys {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface IToysProps {
  data: IToys[];
}

export interface IFilters {
  shape: string[];
  color: string[];
  size: string[];
  onlyFavorite: boolean | string;
  count: number[];
  yearOfPurchase: number[];
  search: string;
}

export type TselectedToy = {
  num: string;
  count: string;
};

export type TselectItem = {
  item: TselectedToy[];
  setItem: (
    c: TselectedToy[] | ((state: TselectedToy[]) => TselectedToy[])
  ) => void;
};

export type ISelectedContext = {
  copy: number;
  setCopy: (c: number) => void;
};

export interface ISearchDataContext {
  searchData: string;
  setSearchData: (c: string) => void;
}

export interface IOnLoad {
  tree: number;
  background: number;
  garland: boolean | number;
  sound: boolean;
  snowFalling: boolean;
}

export interface IlocalStorage {
  tree: string;
  background: string;
  garland: string;
  snowfall: boolean;
  sound: boolean;
  star: boolean;
}
