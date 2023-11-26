import axios from "axios";
import { useState } from "react";

export const useRequests = () =>{
    const [loading, setLoading] = useState(false);

    const getRequest = async (url: string) =>{
        setLoading(true);

        const data = await axios.get(url)
            .then(result => {

                if(result?.data?.length > 0){
                    return result.data
                }

                throw(result)
            })
            .catch(() => {
                
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