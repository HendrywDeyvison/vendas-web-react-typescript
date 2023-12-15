/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from "axios";
import { MethodsEnum } from "../../enums/methods.enum";
import { ERROR_ACCESS_DENIED, ERROR_CONNECTION, ERROR_INVALID_USER } from "../../constants/errorsStatus";
import { getAuthorizationToken } from "./auth";

export type MethodTypes = 'get' | 'post' | 'put' | 'patch' | 'delete';

export default class ConnectionAPI {

    static async call<T>(url: string, method: MethodTypes, body?: unknown): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthorizationToken(),
            }
        }

        switch (method) {

            case MethodsEnum.POST:
            case MethodsEnum.PUT:
            case MethodsEnum.PATCH:
                return (await axios[method]<T>(url, body, config)).data;
            case MethodsEnum.GET:
            case MethodsEnum.DELETE:
            default:
                return (await axios[method]<T>(url, config)).data;
        }
    }

    static async connect<T>(url: string, method: MethodTypes, body?: unknown): Promise<T> {
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
    return ConnectionAPI.connect(url, MethodsEnum.GET);
}

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.DELETE);
}

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.POST, body);
}

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.PUT, body);
}

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.PATCH, body);
}
