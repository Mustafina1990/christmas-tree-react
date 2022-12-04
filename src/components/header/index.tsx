import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchDataContext, SelectedItemsContext } from "../../context";
import classes from "./style.module.css";

export default function Header() {
  const { searchData, setSearchData } = useContext(SearchDataContext);
  const { item, setItem } = useContext(SelectedItemsContext);

  return (
    <header className="header">
      <div className="container">
        <div className={classes.header__inner}>
          <nav className={classes.header__nav}>
            <Link to="/" className={classes.header__logo}></Link>
            <NavLink
              to="/toys"
              className={({ isActive }) =>
                `${classes.header__toys} ${
                  isActive ? classes.header__nav_active : ""
                }`
              }
            >
              Toys
            </NavLink>
            <NavLink
              to="/tree"
              className={({ isActive }) =>
                `${classes.header__toys} ${
                  isActive ? classes.header__nav_active : ""
                }`
              }
            >
              Tree
            </NavLink>
          </nav>
          <div className={classes.header__search}>
            <input
              onChange={(e) => setSearchData(e.target.value)}
              className={classes.search}
              placeholder="Search..."
              type="search"
              value={searchData}
              autoFocus
            />
            <div className={classes.header__ball}>
              <p className={classes.ball__count}>
                {item.length ? item.length : 20}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
