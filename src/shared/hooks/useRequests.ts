import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { connectionAPIGet, connectionAPIPost } from "../functions/connection/connectioAPI";

export const useRequests = () =>{
    const [loading, setLoading] = useState(false);
    const { setNotification } = useGlobalContext();

    const getRequest = async <T>(url: string): Promise<T | undefined> =>{
        setLoading(true);

        const data = await connectionAPIGet<T>(url)
            .then(result => result )
            .catch((error: Error) => {
                setLoading(false);
                setNotification(error.message, 'error', 'Verifique a senha e o usuário!', 'bottomRight');
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

    return{
        loading,
        getRequest,
        postRequest,
    };
};