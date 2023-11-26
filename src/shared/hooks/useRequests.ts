import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () =>{
    const [loading, setLoading] = useState(false);
    const { setAccessToken, setNotification } = useGlobalContext();

    const getRequest = async (url: string) =>{
        setLoading(true);

        const data = await axios.get(url)
            .then(result => {

                if(result?.data?.length > 0){
                    setAccessToken(result.data[0].accessToken);
                    setNotification('Login efetuado com sucesso!', 'success', 'Bem vindo ao sistema!', 'bottomRight');
                    alert('Login efetuado com sucesso!')
                    setLoading(false);
                    
                    return result.data
                }

                throw(result)
            })
            .catch(() => {
                setNotification('Usuário ou senha Inválidos!', 'error', 'Verifique a senha e o usuário!', 'bottomRight');
                alert('Usuario sem cadastro!')
                return
            });

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