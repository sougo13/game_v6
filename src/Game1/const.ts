import fruit1 from "../assets/Game1/friuits/1.png";
import fruit2 from "../assets/Game1/friuits/2.png";
import fruit3 from "../assets/Game1/friuits/3.png";
import fruit4 from "../assets/Game1/friuits/4.png";
import fruit5 from "../assets/Game1/friuits/5.png";
import fruit6 from "../assets/Game1/friuits/6.png";
import fruit7 from "../assets/Game1/friuits/7.png";
import fruit8 from "../assets/Game1/friuits/8.png";
import fruit9 from "../assets/Game1/friuits/9.png";
import fruit10 from "../assets/Game1/friuits/10.png";

import veg1 from "../assets/Game1/vegetables/1.png";
import veg2 from "../assets/Game1/vegetables/2.png";
import veg3 from "../assets/Game1/vegetables/3.png";
import veg4 from "../assets/Game1/vegetables/4.png";
import veg5 from "../assets/Game1/vegetables/5.png";
import veg6 from "../assets/Game1/vegetables/6.png";
import veg7 from "../assets/Game1/vegetables/7.png";
import veg8 from "../assets/Game1/vegetables/8.png";
import veg9 from "../assets/Game1/vegetables/9.png";
import veg10 from "../assets/Game1/vegetables/10.png";

export enum ElemType {
  fruit,
  veg,
}

export const elements = [
  [
    {
      src: fruit1,
      type: ElemType.fruit,
    },
    {
      src: fruit2,
      type: ElemType.fruit,
    },
    {
      src: veg1,
      type: ElemType.veg,
    },
    {
      src: veg2,
      type: ElemType.veg,
    },
    {
      src: veg3,
      type: ElemType.veg,
    },
  ],
  [
    {
      src: fruit3,
      type: ElemType.fruit,
    },
    {
      src: fruit4,
      type: ElemType.fruit,
    },
    {
      src: fruit5,
      type: ElemType.fruit,
    },
    {
      src: veg4,
      type: ElemType.veg,
    },
    {
      src: veg5,
      type: ElemType.veg,
    },
  ],
  [
    {
      src: fruit6,
      type: ElemType.fruit,
    },
    {
      src: fruit7,
      type: ElemType.fruit,
    },
    {
      src: veg6,
      type: ElemType.veg,
    },
    {
      src: veg7,
      type: ElemType.veg,
    },
    {
      src: veg8,
      type: ElemType.veg,
    },
  ],
  [
    {
      src: fruit8,
      type: ElemType.fruit,
    },
    {
      src: fruit9,
      type: ElemType.fruit,
    },
    {
      src: fruit10,
      type: ElemType.fruit,
    },
    {
      src: veg9,
      type: ElemType.veg,
    },
    {
      src: veg10,
      type: ElemType.veg,
    },
  ],
];
