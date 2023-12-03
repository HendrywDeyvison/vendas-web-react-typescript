import { RouteObject } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

export enum loginRoutesEnum {
  LOGIN = '/login'
}

export const loginRoutes: RouteObject[] = [
  {
    path: loginRoutesEnum.LOGIN,
    element: <LoginScreen />,
  },
];
