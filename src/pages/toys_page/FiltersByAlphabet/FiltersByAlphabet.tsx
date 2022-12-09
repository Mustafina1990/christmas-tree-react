import React, { ChangeEvent } from "react";
import { alphabetFilters } from "../../../data/utils";
import { IToys } from "../../../ts-files/interfaces";
import styles from "./../toys.style.module.css";

type TFiltersByAlphabet = {
  setSortSelection: (state: string) => void;
  setItems: (state: IToys[] | ((state: IToys[]) => IToys[])) => void;
};

export default function FiltersByAlphabet({
  setItems,
  setSortSelection,
}: TFiltersByAlphabet) {
  function updateState(e: ChangeEvent<HTMLSelectElement>) {
    const sortFilter = e.target.value;
    setSortSelection(sortFilter);
    setItems((prev) => alphabetFilters(prev, sortFilter));
  }
  return (
    <>
      <h4 className={styles.item__title}>SORTING</h4>
      <select onChange={updateState} className={styles.item__select}>
        <option value={"a-z"} className={styles.item__option}>
          By name from "A" to "Z"
        </option>
        <option value={"z-a"} className={styles.item__option}>
          By name from "Z" to "A"
        </option>
        <option value={"top"} className={styles.item__option}>
          By year of purchase ascending
        </option>
        <option value={"bot"} className={styles.item__option}>
          By year of acquisition descending
        </option>
      </select>
      <button
        onClick={() => localStorage.clear()}
        className={styles.item__button_reset}
      >
        Clear localStorage
      </button>
    </>
  );
}
