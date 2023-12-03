import { createContext, useContext, useEffect, useState } from "react";
import { getAuthorizationToken, setAuthorizationToken } from "../functions/connection/auth";

type NotificationType = "success" | "error" | "info" | "warning";

type PlacementType = "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | undefined;
interface NotificationProps {
    message: string;
    type: NotificationType;
    description?: string;
    placement?: PlacementType;
}
interface GlobalData {
  accessToken?: string;
  notification?: NotificationProps;
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalContext = createContext({} as GlobalContextProps);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return (
    <GlobalContext.Provider value={{globalData, setGlobalData}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
    const { globalData, setGlobalData } = useContext(GlobalContext);

    useEffect(()=>{
      const token = getAuthorizationToken();
      
      if(token){
        setAccessToken(token);
      }
    },[])

    const setAccessToken = (accessToken: string) => {
        setAuthorizationToken(accessToken);
        setGlobalData({
            ...globalData,
            accessToken,
        });
    }; 

    const setNotification = (message: string, type: NotificationType, description?: string, placement?: PlacementType) => {
        setGlobalData({
            ...globalData,
            notification: {
                message,
                type,
                description,
                placement,
            },
        })
    };

    return {
        notification: globalData?.notification,
        accessToken: globalData?.accessToken,
        setAccessToken,
        setNotification
    };
}
