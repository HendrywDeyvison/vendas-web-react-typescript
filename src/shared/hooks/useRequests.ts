import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { connectionAPIGet, connectionAPIPost } from "../functions/connection/connectioAPI";
import { URL_AUTH } from "../constants/urls";
import { ERROR_INVALID_PASSWORD } from "../constants/errorsStatus";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../modules/product/routes";
import { AuthType } from "../../modules/login/types/AuthType";
import { setAuthorizationToken } from "../functions/connection/auth";

export const useRequests = () =>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setNotification } = useGlobalContext();

    const getRequest = async <T>(url: string): Promise<T | undefined> =>{
        setLoading(true);

        const data = await connectionAPIGet<T>(url)
            .then(result => {
                if(result.length){
                    
                    setNotification('Login Efetuado com Sucesso!', 'success', 'Usuario logado com sucesso!', 'bottomRight');
                    return result[0]
                }

                throw(new Error('Usuário não encontrado ou senha inválida!'))
            })
            .catch((error: Error) => {
                setLoading(false);
                setNotification(error.message, 'error', 'Verifique o usuário e a senha!', 'bottomRight');
                return undefined;
            });

        setLoading(false);
        return data;
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

    const authRequest = async (body: unknown): Promise<void> =>{
        setLoading(true);

        await connectionAPIPost<AuthType>(URL_AUTH, body)
            .then(result =>{
                setNotification('Entrando...', 'success');
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
        getRequest,
        postRequest,
        authRequest,
    };
};