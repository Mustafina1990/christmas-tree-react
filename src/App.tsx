import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Header from "./components/header";
import MainPage from "./components/main";
import Footer from "./components/footer";
import ToysPage from "./pages/toys_page/toys_page";
import { SearchDataContext, SelectedItemsContext } from "./context";
import { useContext } from "react";
import Tree from "./pages/tree_page/Tree";
import { TselectedToy } from "./ts-files/interfaces";
import { startItem } from "./data/data";

function App() {
  const [searchData, setSearchData] = useState("");
  const [item, setItem] = useState<TselectedToy[]>(startItem);

  return (
    <SelectedItemsContext.Provider value={{ item, setItem }}>
      <SearchDataContext.Provider value={{ searchData, setSearchData }}>
        <BrowserRouter basename="/">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/toys" element={<ToysPage />}></Route>
            <Route path="/tree" element={<Tree />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </SearchDataContext.Provider>
    </SelectedItemsContext.Provider>
  );
}

export default App;
