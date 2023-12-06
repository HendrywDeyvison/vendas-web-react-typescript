/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from "axios";
import { MethosEnum } from "../../enums/methods.enum";
import { ERROR_ACCESS_DENIED, ERROR_CONNECTION, ERROR_INVALID_USER } from "../../constants/errorsStatus";
import { getAuthorizationToken } from "./auth";

export default class ConnectionAPI {

    static async call<T>(url: string, method: string, body?: unknown): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthorizationToken(),
            }
        }

        switch (method) {

            case MethosEnum.GET:
                return (await axios.get<T>(url, config)).data;

            case MethosEnum.DELETE:
                return (await axios.delete<T>(url, config)).data;

            case MethosEnum.POST:
                return (await axios.post<T>(url, body, config)).data;

            case MethosEnum.PUT:
                return (await axios.put<T>(url, body, config)).data;

            default:
                return (await axios.patch<T>(url, body, config)).data;
        }
    }

    static async connect<T>(url: string, method: string, body?: unknown): Promise<T> {
        return  this.call<T>(url, method, body).catch((error)=> {
            if(error?.response){
                switch (error?.response?.status) {
                    case 401:
                        throw new Error(ERROR_INVALID_USER);
                    case 403:
                        throw new Error(ERROR_ACCESS_DENIED)
                    default:
                        throw new Error(ERROR_CONNECTION);
                }
            }
            
            throw new Error(ERROR_CONNECTION);
        });
    }
    
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect(url, MethosEnum.GET);
}

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect(url, MethosEnum.DELETE);
}

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
    return ConnectionAPI.connect(url, MethosEnum.POST, body);
}

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
    return ConnectionAPI.connect(url, MethosEnum.PUT, body);
}

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
    return ConnectionAPI.connect(url, MethosEnum.PATCH, body);
}
