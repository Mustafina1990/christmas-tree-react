import React from "react";
import "./style.css";
import "./garland-style.scss"
import { type } from "@testing-library/user-event/dist/type";

type TGarland = {
    data: {
        color: string;
        count: number;
    };
};

export default function Garland(props: TGarland) {
    return (
      <div className="garland__wrapper">
        <ul className="garland garland__first">
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
        </ul>
        <ul className="garland garland__second">
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
        </ul>
        <ul className="garland garland__third">
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
        </ul>
        <ul className="garland garland__fourth">
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
        </ul>
        <ul className="garland garland__fifth">
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
          <li className="garland__item"></li>
        </ul>
      </div>
    );
}