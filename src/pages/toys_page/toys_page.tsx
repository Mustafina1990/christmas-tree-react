import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./toys.style.module.css";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./slider.css";
import { data, startFilters, initialFilters } from "../../data/data";
import Item from "../../components/toys_item/item";
import "./itemStyles.css";
import { IToys, IFilters } from "../../ts-files/interfaces";
import { SearchDataContext, SelectedItemsContext } from "../../context/index";
import PopUp from "../../components/pop-up";
import {
  alphabetFilters,
  filterItems,
  getSelectedItem,
} from "../../data/utils";
import FiltersByValue from "./FiltersByValue/FiltersByValue";
import FiltersByRange from "./FiltersByRange/FiltersByRange";
import FiltersByAlphabet from "./FiltersByAlphabet/FiltersByAlphabet";
import NoToysMessage from "./NoToysMessage/NoToysMessage";

export default function ToysPage() {
  const { searchData, setSearchData } = useContext(SearchDataContext);
  const { item, setItem } = useContext(SelectedItemsContext);
  const [items, setItems] = useState<IToys[]>(data);
  const [filters, setFilters] = useState<IFilters>(startFilters);
  const [sortSelection, setSortSelection] = useState<string>("a-z");
  const [isVisiblePopUp, setIsVisiblePopUp] = useState(false);

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("selectedToys", JSON.stringify(item));
  });
  window.addEventListener("load", onLoad);

  useEffect(() => {
    const newFilters = { ...filters };
    newFilters.search = searchData;
    setFilters(newFilters);
    setItems(filterItems(newFilters));
  }, [searchData]);

  function resetFilters() {
    setSearchData("");
    setFilters(initialFilters);
    setItems(data);

    let shapes = document.querySelectorAll(`.row__item_active`);
    let colors = document.querySelectorAll(`.row__color_active`);
    let sizes = document.querySelectorAll(`.active_size`);
    let favorite = document.querySelector(
      `.row__items_input`
    ) as HTMLInputElement;
    let sliders = document.querySelectorAll(`.noUi-origin`);
    let slidersLine = document.querySelectorAll(`.noUi-connect`);

    shapes.forEach((item) => item.classList.remove("row__item_active"));
    colors.forEach((item) => item.classList.remove("row__color_active"));
    sizes.forEach((item) => item.classList.remove("active_size"));
    favorite.checked = false;
    sliders.forEach((item: Element, ind) => {
      let elem = item as HTMLDivElement;
      if (ind % 2 === 0) {
        elem.style.transform = "tramslate(-1000%, 0px)";
      } else {
        elem.style.transform = "tramslate(0%, 0px)";
      }
    });
    (slidersLine[0] as HTMLDivElement).style.transform = "translate(0%, 0px)";
    (slidersLine[1] as HTMLDivElement).style.transform = "translate(0%, 0px)";
  }

  function selectToys(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    num: string,
    count: string
  ) {
    let target = e.currentTarget as Element;
    let numberOfItem = +target.getAttribute("datatype")!;
    if (!getSelectedItem(item, numberOfItem)) {
      if (item.length !== 20) {
        target.classList.add("section__item_active");
        setItem((prev) => [...prev, { num, count }]);
      } else {
        showPopUp();
      }
    } else {
      setItem(item.filter((toy) => (+toy.num !== numberOfItem ? toy : false)));
      target.classList.remove("section__item_active");
    }
  }

  function showPopUp() {
    setIsVisiblePopUp(true);
    setTimeout(() => {
      setIsVisiblePopUp(false);
    }, 1500);
  }

  function onLoad() {
    let circles = document.querySelectorAll(".noUi-origin")!;
    for (let [key, value] of Object.entries(filters)) {
      if (key === "shape" || key === "size" || key === "color") {
        value.forEach((toy: string | number) => {
          document
            .querySelector(`<div[datatype=${toy}]`)!
            .classList.add("row__item_active");
        });
      }
      if (key === "count") {
        let progressBar = document.querySelector(
          ".noUi-connect"
        ) as HTMLDivElement;
        (circles[0] as HTMLDivElement).style.transform = `translate(-${1000 -
          (1000 * (value[0] - 1)) / 12}%, 0px)`;
        (circles[1] as HTMLDivElement).style.transform = `translate(-${1000 -
          (1000 * value[1]) / 12}%, 0px)`;
        progressBar.style.transform = `translate(${(value[0] - 1) *
          9.09}%, 0px) scale(${1 - 0.091 * (value[0] + 12 - value[1] - 1)}, 1)`;
      }

      if (key === "yearOfPurchase") {
        let progressBar = document.querySelectorAll(".noUi-connect");
        (circles[2] as HTMLDivElement).style.transform = `translate(-${1000 -
          (value[0] - 1940) * 12.5}%, 0px)`;
        (circles[3] as HTMLDivElement).style.transform = `translate(-${(2020 -
          value[1]) *
          12.5}%, 0px)`;
        (circles[1] as HTMLDivElement).style.transform = `translate(-${(value[0] -
          1940) *
          1.25}%, 0px) scale(${1 -
          0.0125 * (value[0] - 1940 + 2020 - value[1])}, 1)`;
      }

      if (key === "onlyFavorite") {
        let input = document.querySelector(
          ".row__items_input"
        ) as HTMLInputElement;
        if (value === true) {
          input.checked = true;
        } else {
          input.checked = false;
        }
      }
    }
  }

  return (
    <main className="main">
      <div className="container flex-container">
        <section className={styles.top_section}>
          <div className={styles.top_section__item}>
            <FiltersByValue
              filters={{ filters, setFilters }}
              setItems={setItems}
            />
          </div>
          <div className={styles.top_section__item}>
            <FiltersByRange
              filters={{ filters, setFilters }}
              setItems={setItems}
            />
          </div>
          <div className={styles.top_section__item}>
            <div className={styles.top_section__inner_third}>
              <FiltersByAlphabet
                setSortSelection={setSortSelection}
                setItems={setItems}
              />
              <button
                onClick={resetFilters}
                className={styles.item__button_reset}
              >
                Reset filters
              </button>
            </div>
          </div>
        </section>
        <section className="section">
          {isVisiblePopUp && <PopUp />}
          {items.length ? (
            alphabetFilters(items, sortSelection).map((toy) => {
              return (
                <Item
                  onClickFunk={selectToys}
                  toy={toy}
                  item={item}
                  key={toy.num}
                />
              );
            })
          ) : (
            <NoToysMessage />
          )}
        </section>
      </div>
    </main>
  );
}
