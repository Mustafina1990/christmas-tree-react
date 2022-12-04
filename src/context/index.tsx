import { useContext, useState } from "react";
import { createContext } from "react";
import { ISearchDataContext, TselectItem } from "../ts-files/interfaces";

export const SearchDataContext = createContext<ISearchDataContext>({
  searchData: "",
  setSearchData: () => {},
});

export const SelectedItemsContext = createContext<TselectItem>({
  item: [],
  setItem: () => {},
});
