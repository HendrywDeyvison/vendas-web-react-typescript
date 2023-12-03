import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { setItemStorage, getItemStorage, removeItemStorage } from "./storageProxy";

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token: string) =>  token && setItemStorage(AUTHORIZATION_KEY, token);

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);