import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import ConnectionAPI, { MethodTypes, connectionAPIGet, connectionAPIPost } from "../functions/connection/connectioAPI";
import { URL_AUTH } from "../constants/urls";
import { ERROR_INVALID_PASSWORD } from "../constants/errorsStatus";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../modules/product/routes";
import { AuthType } from "../../modules/login/types/AuthType";
import { setAuthorizationToken } from "../functions/connection/auth";

export const useRequests = () =>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setNotification, setUser } = useGlobalContext();

    const request = async <T>(url: string, method: MethodTypes, saveGlobal?: (object: T)=> void, body?: unknown): Promise<T | undefined> =>{
        setLoading(true);

        const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
            .then(result => {
                if(saveGlobal){
                    saveGlobal(result);
                }
                return result;
            })
            .catch((error: Error) => {
                setNotification(error.message, 'error', 'Verifique o usuário e a senha!', 'bottomRight');
                return undefined;
            });

        setLoading(false);
        return returnObject;
    }

    const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> =>{
        setLoading(true);

        const data = await connectionAPIPost<T>(url, body)
            .then(result => result)
            .catch(() => {
                alert('Usuario sem cadastro!');
                
                return undefined;
            })

        console.log(data)
        setLoading(false);
        return data;
    }

    const authRequest = async (url: string): Promise<void> =>{
        setLoading(true);

        await connectionAPIGet<AuthType>(URL_AUTH+url)//connectionAPIPost<AuthType>(URL_AUTH, body)
            .then(result =>{

                if(!result.length){
                    throw(new Error('Usuário não encontrado ou senha inválida!'))
                }
                result = result[0].user;
                
                setNotification('Entrando...', 'success');
                setUser(result);
                setAuthorizationToken(result.accessToken);
                navigate(ProductRoutesEnum.PRODUCT);
                return result;
            })
            .catch(() => {
                setNotification(ERROR_INVALID_PASSWORD, 'error');
                return undefined;
            })

        setLoading(false);
    }

    return{
        loading,
        request,
        postRequest,
        authRequest,
    };
};