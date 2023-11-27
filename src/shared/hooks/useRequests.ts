import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { connectionAPIGet } from "../functions/connection/connectioAPI";

export const useRequests = () =>{
    const [loading, setLoading] = useState(false);
    const { setAccessToken, setNotification } = useGlobalContext();

    const getRequest = async (url: string) =>{
        setLoading(true);

        const data = await connectionAPIGet(url)
            .then(result => {
                if(result){
                    setAccessToken('result Token');
                    setNotification('Login efetuado com sucesso!', 'success', 'Bem vindo ao sistema!', 'bottomRight');
                    return result
                }

                throw(result)
            })
            .catch((error: Error) => {
                setLoading(false);
                setNotification(error.message, 'error', 'Verifique a senha e o usuário!', 'bottomRight');
            });

            console.log(data)
            setLoading(false);
            return data;
    }

    const postRequest = async (url: string, body: unknown) =>{
        setLoading(true);

        return await axios.post(url, body)
            .then(result => {
                setLoading(false);
                if(result?.data?.length > 0){
                    return result.data
                }
                
            })
            .catch(() => {
                alert('Usuario sem cadastro!');
                setLoading(false);
            })
    }

    return{
        loading,
        getRequest,
        postRequest,
    };
};