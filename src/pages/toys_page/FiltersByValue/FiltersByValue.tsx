import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { filterItems } from "../../../data/utils";
import { IFilters, IToys } from "../../../ts-files/interfaces";
import styles from "./../toys.style.module.css";

type TFiltersByValue = {
  setItems: (state: IToys[] | ((prev: IToys[]) => IToys[])) => void;
  filters: {
    filters: IFilters;
    setFilters: (state: IFilters | ((prev: IFilters) => IFilters)) => void;
  };
};

export default function FiltersByValue({ setItems, filters }: TFiltersByValue) {
  function clickOnInput(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = e.target as HTMLInputElement;
    const newFilters = { ...filters.filters };
    if (target.checked) {
      newFilters.onlyFavorite = true;
    } else {
      newFilters.onlyFavorite = false;
    }
    filters.setFilters(newFilters);
    setItems(filterItems(newFilters));
  }

  function setfilters(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    classes: string
  ) {
    const target = e.target as Element;
    const typeOfFilter = target.getAttribute("datatype")!;
    const filterBy = target.getAttribute("itemType")!;
    const newFilters = { ...filters.filters };
    if (target.classList.contains(classes)) {
      if (filterBy === "color" || filterBy === "shape" || filterBy === "size") {
        if (newFilters[filterBy].includes(typeOfFilter)) {
          newFilters[filterBy].splice(
            newFilters[filterBy].indexOf(typeOfFilter),
            1
          );
        } else {
          newFilters[filterBy].push(typeOfFilter);
        }
      }
    }
    filters.setFilters(newFilters);
    setItems(filterItems(newFilters));
    //target.classList.toggle('row__item_active');
  }

  function getSecondClass(type: string, firstClass: string, itemType: string) {
    if (itemType === "shape" || itemType === "color" || itemType === "size") {
      return filters.filters[itemType].includes(type)
        ? `${firstClass} row__item_active`
        : firstClass;
    }
  }
  return (
    <div className={styles.top_section__inner}>
      <h4 className={styles.item__title}>FILTER BY VALUE</h4>
      <div className={styles.top_section__row_wrapper}>
        <h5 className={styles.row__title}>Form:</h5>
        <div
          onClick={(e) => setfilters(e, "row__item")}
          className={styles.row__items_wrapper}
        >
          <div
            className={getSecondClass("ball", "row__item", "shape")}
            itemType="shape"
            datatype="ball"
          ></div>
          <div
            className={getSecondClass("bell", "row__item", "shape")}
            itemType="shape"
            datatype="bell"
          ></div>
          <div
            className={getSecondClass("cone", "row__item", "shape")}
            itemType="shape"
            datatype="cone"
          ></div>
          <div
            className={getSecondClass("snowflake", "row__item", "shape")}
            itemType="shape"
            datatype="snowflake"
          ></div>
          <div
            className={getSecondClass("figurine", "row__item", "shape")}
            itemType="shape"
            datatype="figurine"
          ></div>
        </div>
      </div>
      <div className={styles.top_section__row_wrapper}>
        <h5 className={styles.row__title}>Color:</h5>
        <div
          onClick={(e) => setfilters(e, "row__item_color")}
          className={styles.row__items_wrapper}
        >
          <div
            className={getSecondClass("white", "row__item_color", "color")}
            itemType="color"
            datatype="white"
          ></div>
          <div
            className={getSecondClass("yellow", "row__item_color", "color")}
            itemType="color"
            datatype="yellow"
          ></div>
          <div
            className={getSecondClass("red", "row__item_color", "color")}
            itemType="color"
            datatype="red"
          ></div>
          <div
            className={getSecondClass("blue", "row__item_color", "color")}
            itemType="color"
            datatype="blue"
          ></div>
          <div
            className={getSecondClass("green", "row__item_color", "color")}
            itemType="color"
            datatype="green"
          ></div>
        </div>
      </div>
      <div className={styles.top_section__row_wrapper}>
        <h5 className={styles.row__title}>Size:</h5>
        <div
          onClick={(e) => setfilters(e, "row__item_size")}
          className={styles.row__items_wrapper}
        >
          <div
            className={getSecondClass("big", "row__item_size", "size")}
            itemType="size"
            datatype="big"
          ></div>
          <div
            className={getSecondClass("average", "row__item_size", "size")}
            itemType="size"
            datatype="average"
          ></div>
          <div
            className={getSecondClass("little", "row__item_size", "size")}
            itemType="size"
            datatype="little"
          ></div>
        </div>
      </div>
      <div className={styles.top_section__row_wrapper}>
        <div className={styles.top_section__row_wrapper}>
          <h5 className={styles.row__title}>Favorites only:</h5>
          <input
            onClick={(e) => clickOnInput(e)}
            className="row__item_input"
            type="checkbox"
            id="checkbox"
          ></input>
          <label className="row__item_label" htmlFor="checkbox"></label>
        </div>
      </div>
    </div>
  );
}
