import { RouteObject } from "react-router-dom";
import Product from ".";

export enum ProductRoutesEnum {
    PRODUCT = "/product",
}

export const productScreens: RouteObject[] = [
  {
    path: ProductRoutesEnum.PRODUCT,
    element: <Product />,
  },
];
