import { type } from "@testing-library/user-event/dist/type";
import React, { useContext, useState } from "react";
import { Node, NodeArray } from "typescript";
import { SelectedItemsContext } from "../../context";
import { getDataOfItem } from "../../helped_functions";
import { TselectedToy } from "../../ts-files/interfaces";

type Ttoys = {
  data: TselectedToy;
};

export default function Toy(props: Ttoys) {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    let target = e.target as HTMLDivElement;
    const type = target.getAttribute("datatype")!;
    e.dataTransfer.setData("text", type);
  }

  return (
    <div className="toys-item__wrapper">
      {props.data.count !== "0" ? (
        <div
          datatype={props.data.num}
          style={{
            background: `url(middle-section/${props.data.num}.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          draggable
          className="toys-item"
          onDragStart={(e) => handleDragStart(e)}
        ></div>
      ) : (
        <></>
      )}
      <div className="toy-count__wrapper">
        <p className="toy-count">{props.data.count}</p>
      </div>
    </div>
  );
}
