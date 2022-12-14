import React, { useState } from "react";
import Options from "../options/options";
import "./style.css";
import {
  chooseTreeData,
  chooseBackground,
  chooseGarland,
} from "../../tree_controll/treeControll";
import { getRandomInt, makeSoundAfterLoad } from "../../helped_functions";
import { IlocalStorage } from "../../ts-files/interfaces";

export default function LeftOptions() {
  let sound = new Audio() as HTMLAudioElement;
  const [intervalInd, setIntervalInd] = useState(1);
  const [soundValue, setSoundValue] = useState(sound);

  function snowfall() {
    let size = getRandomInt(13, 25);
    let snow = document.createElement("div") as HTMLDivElement;
    let parent = document.querySelector(
      ".section-tree__item_middle"
    ) as HTMLDivElement;
    snow.className = "snowfall";
    snow.style.left = Math.random() * parent.offsetWidth - 23 + "px";
    snow.style.opacity = `${Math.random() + 0.3}`;
    snow.style.animationDuration = Math.random() * 3 + 5 + "s";
    snow.style.width = size + "px";
    snow.style.height = size + "px";
    parent.append(snow);
    setTimeout(() => {
      parent.removeChild(snow);
    }, 10000);
  }

  function makeSound(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let target = e.target as Element;
    if (target.classList.contains("play-sound")) {
      target.classList.remove("play-sound");
      soundValue.pause();
      target.classList.remove("section-tree__interactive-button_active");
      return;
    } else {
      soundValue.src = "sound/audio.mp3";
      target.classList.add("play-sound");
      soundValue.play();
      target.classList.add("section-tree__interactive-button_active");
    }
  }

  function makeSnowfall(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let target = e.target as Element;
    if (
      target.classList.contains(
        "section-tree__interactive-button_active-snowfall"
      )
    ) {
      target.classList.remove(
        "section-tree__interactive-button_active-snowfall"
      );
      window.clearInterval(intervalInd);
    } else {
      let intervalIndex = window.setInterval(snowfall, 45);
      setIntervalInd(intervalIndex);
      target.classList.add("section-tree__interactive-button_active-snowfall");
    }
  }

  function savedLocalStorage() {
    let localStorageItem: IlocalStorage = {
      tree: "",
      background: "",
      garland: "",
      snowfall: false,
      sound: false,
      star: false,
    };
    let activeTree = document.querySelector(".active-tree") as HTMLDivElement;
    let activeBackground = document.querySelector(
      ".options__choose-background_active"
    ) as HTMLDivElement;
    let activeGarland = document.querySelector(
      ".active-color"
    ) as HTMLDivElement;
    let activeSnowfall = document.querySelector(
      ".section-tree__interactive-button_active-snowfall"
    );
    let activeSound = document.querySelector(".play-sound");
    let star = document.querySelector(".star-show") as HTMLDivElement;
    if (activeTree) {
      let typeTree = activeTree.getAttribute("datatype")!;
      localStorageItem.tree = typeTree;
    }
    if (activeBackground) {
      let typeTree = activeBackground.getAttribute("datatype")!;
      localStorageItem.background = typeTree;
    }
    if (activeGarland) {
      let typeTree = activeGarland.getAttribute("datatype")!;
      localStorageItem.garland = typeTree;
    }
    if (activeSnowfall) {
      localStorageItem.snowfall = true;
    }
    if (activeSound) {
      localStorageItem.sound = true;
    }
    if (star) {
      localStorageItem.star = true;
    }
    localStorage.setItem("treeOptions", JSON.stringify(localStorageItem));
  }

  function setStylesAfterLoad() {
    let localStorageItems = JSON.parse(localStorage.getItem("treeOptions")!);
    if (localStorageItems.tree) {
      document
        .querySelector(
          `.options__choose-tree[datatype='${localStorageItems.tree}']`
        )!
        .classList.add("active-tree");
      let tree = document.querySelector(".tree")! as HTMLImageElement;
      tree.src = `trees/${localStorageItems.tree}.png`;
    }
    if (localStorageItems.background) {
      document
        .querySelector(
          `.options__choose-background[datatype='${localStorageItems.background}']`
        )!
        .classList.add("options__choose-background_active");
      let background = document.querySelector(
        ".section-tree__item_middle"
      )! as HTMLDivElement;
      background.style.background = `url(background/${localStorageItems.background}.jpg)`;
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
    }
    if (localStorageItems.garland) {
      document
        .querySelector(
          `.options__choose-garland[datatype='${localStorageItems.garland}']`
        )!
        .classList.add("active-color");
      let garlendWrapper = document.querySelector(
        ".garland__wrapper"
      )! as HTMLDivElement;
      garlendWrapper.style.display = "flex";
      garlendWrapper.className = `garland__wrapper ${localStorageItems.garland}-color`;
    }
    if (localStorageItems.snowfall) {
      document
        .querySelector(".button-snowfall")
        ?.classList.add("section-tree__interactive-button_active-snowfall");
      let intervalIndex = window.setInterval(snowfall, 45);
      setIntervalInd(intervalIndex);
    }
    if (localStorageItems.star) {
      document.querySelector(".star")?.classList.add("star_show");
      document.querySelector(".button__star")!.innerHTML = "remove star";
    }
    if (localStorageItems.sound) {
      window.addEventListener("click", () => makeSoundAfterLoad(soundValue), {
        once: true,
      });
    }
  }

  window.addEventListener("beforeunload", savedLocalStorage);
  window.addEventListener("DOMContentLoaded", setStylesAfterLoad);

  return (
    <div className="section-tree__options-inner">
      <div className="section-tree__interactive-wrapper">
        <button
          onClick={(e) => makeSound(e)}
          className="button-sound section-tree__interactive-button"
        ></button>
        <button
          onClick={(e) => makeSnowfall(e)}
          className="button-snowfall section-tree__interactive-button"
        ></button>
      </div>
      <Options data={chooseTreeData} />
      <Options data={chooseBackground} />
      <Options data={chooseGarland} />
      <button
        onClick={() => localStorage.clear()}
        className="button button__clear-localstorage"
      >
        Clear localstorage
      </button>
    </div>
  );
}
