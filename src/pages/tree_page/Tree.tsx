import React, { useContext, useEffect, useRef } from "react";
import Garland from "../../components/garland/garland";
import LeftOptions from "../../components/left_options/left_options";
import RightOptions from "../../components/right_options/rightOptions";
import { SelectedItemsContext } from "../../context";
import { getDataOfItem } from "../../helped_functions";
import "./style.css";

export default function Tree() {
  const { item, setItem } = useContext(SelectedItemsContext);
  const options = useRef(null);
  const toys = useRef(null);
  function handleOverDrop(e: React.DragEvent<HTMLAreaElement>): void {
    e.stopPropagation();
    if (e.type !== "drop") {
      e.preventDefault();
    } else {
      let type = e.dataTransfer.getData("text");
      let toysWrapper = document.querySelector(".toys__wrapper_tree");
      let toy = document.querySelector(
        `.toys-item[datatype='${type}']`
      ) as HTMLDivElement;

      let index = getDataOfItem(toy, item);
      console.log(index);
      let cloneType = e.dataTransfer.getData("type");
      if (!cloneType) {
        console.log(item);
        if (!item[index]) {
          let newItem = item.map((toy) => {
            if (toy.num === `${type}`) {
              toy.count = String(+toy.count - 1);
            }
            return toy;
          });
          setItem(newItem);
        } else {
          return;
        }
      }

      let cloneToy = toy.cloneNode(true) as HTMLDivElement;
      let coords = getCoords(e);
      cloneToy.style.left = coords.relativeX + "px";
      cloneToy.style.top = coords.relativeY + "px";
      cloneToy.style.zIndex = "100";
      cloneToy.style.position = "absolute";
      toysWrapper?.append(cloneToy);
      cloneToy.ondragstart = (e) => {
        e.dataTransfer?.setData("text", type);
        e.dataTransfer?.setData("type", "clone");
        const container = document.body;
        container.addEventListener("dragover", (e) => e.preventDefault());
        if (!cloneType) {
          container.addEventListener(
            "drop",
            (e) => {
              let index = getDataOfItem(cloneToy, item);
              cloneToy.remove();
              item[index].count = String(+item[index].count + 1);
              setItem(item);
              console.log("drop");
            },
            { once: true }
          );
        }
      };

      cloneToy.addEventListener(
        "drag",
        (e) => toysWrapper?.removeChild(cloneToy),
        { once: true }
      );
    }
  }

  function getCoords(e: React.DragEvent<HTMLAreaElement>) {
    const { pageX, pageY } = e;
    const sectionMiddle = document
      .querySelector(".section-tree__item_middle")!
      .getBoundingClientRect();
    const side = 45;
    const relativeX = pageX - sectionMiddle.left - side / 2;
    const relativeY = pageY - sectionMiddle.top - side / 2;
    return { relativeX, relativeY };
  }

  function handleOptions(element: React.MutableRefObject<null>) {
    if (!element.current) return;
    const optionsItem = element.current as HTMLDivElement;
    optionsItem.classList.toggle("show__item");
  }

  return (
    <main className="main">
      <section className="section-tree">
        <div className="section-tree__item mobile__item" ref={options}>
          <LeftOptions />
        </div>
        <div className="section-tree__item-mobile mobile__item" ref={toys}>
          <RightOptions />
        </div>
        <div className="section-tree__item section-tree__item_middle">
          <button
            onClick={() => handleOptions(options)}
            className="mobile__left-options button"
          >
            Settings
          </button>
          <button
            onClick={() => handleOptions(toys)}
            className="mobile__left-toys button"
          >
            Toys
          </button>
          <Garland data={{ color: "red", count: 5 }} />
          <map name="tree-map">
            <area
              onDrop={(e) => handleOverDrop(e)}
              onDragOver={(e) => handleOverDrop(e)}
              className="area"
              coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664"
              shape="poly"
            ></area>
            <div className="star"></div>
          </map>
          <div className="toys__wrapper_tree"></div>
          <img src="trees/1.png" useMap="#tree-map" className="tree"></img>
        </div>
        <div className="section-tree__item-right">
          <RightOptions />
        </div>
      </section>
    </main>
  );
}
