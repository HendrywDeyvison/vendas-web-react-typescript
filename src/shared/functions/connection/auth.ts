import { UserType } from "../../../modules/login/types/UserType";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { URL_USER } from "../../constants/urls";
import { connectionAPIGet } from "./connectioAPI";
import { setItemStorage, getItemStorage, removeItemStorage } from "./storageProxy";

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token: string) =>  token && setItemStorage(AUTHORIZATION_KEY, token);

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async (setUser: (user: UserType)=> void, user?: UserType) =>{
    if(!user){
        const token  = getAuthorizationToken()?.toString();

        if(!token){
            location.href = '/login';
        }
        
        await connectionAPIGet<UserType>(URL_USER + token).then((userReturn)=>{
            if(!userReturn.length){
                unsetAuthorizationToken();
                throw(new Error('User not found'));
            }
            userReturn = userReturn[0].user;

            setUser(userReturn);
        })
        .catch((error)=>{
            location.href = '/login'
            console.log(error)
        })
    }
    return null

};