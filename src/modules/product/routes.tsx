import { RouteObject } from "react-router-dom";
import Product from ".";

export enum ProductRoutesEnum {
    PRODUCT = "/product",
}

export const produtScreens: RouteObject[] = [
  {
    path: ProductRoutesEnum.PRODUCT,
    element: <Product />,
  },
];
