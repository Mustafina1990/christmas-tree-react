import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { createElements } from "../../helped_functions/index";
import OptionsInner from "./optionsInner";
import "./style.css";

type options = {
  data: {
    title: string;
    items: number[];
    class: string;
    type: string[];
    wrapperClass: string;
  };
};

export default function Options(props: options) {
  return (
    <div className="option__item">
      <h3 className="option__title">{props.data.title}</h3>
      <div className="options__item-wrapper">
        {props.data.items.map((item, ind) => {
          return (
            <OptionsInner
              key={item}
              wrapperClass={props.data.wrapperClass}
              class={props.data.class}
              type={props.data.type[ind]}
            />
          );
        })}
      </div>
    </div>
  );
}
