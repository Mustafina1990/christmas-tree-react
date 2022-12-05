import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Header from "./components/header";
import { SearchDataContext, SelectedItemsContext } from "./context";
import { TselectedToy } from "./ts-files/interfaces";

function App() {
  const [searchData, setsearchData] = useState("");
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
