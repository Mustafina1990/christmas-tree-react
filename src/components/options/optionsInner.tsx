import { type } from "@testing-library/user-event/dist/type";
import React from "react";

type TOptionsInner = {
  wrapperClass: string;
  class: string;
  type: string;
};

export default function OptionsInner(props: TOptionsInner) {
  function selectOptions(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = e.target as Element;
    let choosenItem = target.getAttribute("datatype")!;
    if (target.classList.contains("options__choose-tree")) {
      selectTree(e.currentTarget, choosenItem);
    }
    if (target.classList.contains("options__choose-background")) {
      selectBackground(target, choosenItem);
    }
    if (target.classList.contains("options__choose-garland")) {
      selectedGarland(target, choosenItem);
    }
  }

  function selectBackground(target: Element, itemType: string) {
    let activeBackground = document.querySelector(
      ".options__choose-background_active"
    );
    let background = document.querySelector(
      ".section-tree__item_middle"
    )! as HTMLDivElement;
    background.style.background = `url(backgrounds/${itemType}.jpg)`;
    background.style.backgroundPosition = "center";
    background.style.backgroundSize = "cover";
    if (activeBackground) {
      activeBackground.classList.remove("options__choose-background_active");
    }
    target.classList.add("options__choose-background_active");
  }

  function selectTree(target: Element, itemType: string) {
    let tree = document.querySelector(".tree")! as HTMLImageElement;
    tree.src = `trees/${itemType}.png`;
    let activeTree = document.querySelector(".active-tree") as HTMLImageElement;
    if (activeTree) {
      activeTree.classList.remove("active-tree");
    }
    target.classList.add("active-tree");
  }

  function selectedGarland(target: Element, itemType: string) {
    let garlendWrapper = document.querySelector(
      ".garland__wrapper"
    )! as HTMLDivElement;
    let chosenGarland = document.querySelector(
      ".options__choose-garland.active-color"
    ) as HTMLDivElement;
    let type = target.getAttribute("datatype");
    if (chosenGarland) {
      if (target.classList.contains("active-color")) {
        target.classList.remove("active-color");
        garlendWrapper.style.display = "none";
        garlendWrapper.className = "garland__wrapper";
      } else {
        chosenGarland.classList.remove("active-color");
        garlendWrapper.className = `garland__wrapper ${itemType}-color`;
        target.classList.add("active-color");
      }
    } else {
      garlendWrapper.style.display = "flex";
      target.classList.add("active-color");
      garlendWrapper.className = `garland__wrapper ${itemType}-color`;
    }
  }
  return (
    <>
      <div className={props.wrapperClass}>
        <div
          onClick={(e) => selectOptions(e)}
          datatype={props.type}
          className={props.class}
        ></div>
      </div>
    </>
  );
}
