import React from "react";
import { IlocalStorage, TselectedToy } from "../ts-files/interfaces";

export function createElements(num: number, item: JSX.Element) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(item);
  }
  return arr;
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function makeSoundAfterLoad(sound: HTMLAudioElement) {
  document.querySelector(".button-sound")!.className =
    "button-sound section-tree__interactive-button play-sound section-tree__interactive-button_active";
  sound.src = "sound/audio.mp3";
  sound.play();
}

export function getDataOfItem(
  target: HTMLDivElement,
  arrayOfItems: TselectedToy[]
): number {
  let index: number = 0;
  let toyType = target.getAttribute("datatype")!;
  let toyInItem = arrayOfItems.find((toy: TselectedToy, ind: number) => {
    if (toy.num === toyType) {
      index = ind;
      return toy;
    }
  });
  return index;
}
