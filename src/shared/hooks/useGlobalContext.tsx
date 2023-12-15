import { createContext, useContext, useState } from "react";
import { UserType } from "../../modules/login/types/UserType";

type NotificationType = "success" | "error" | "info" | "warning";

type PlacementType = "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | undefined;

interface NotificationProps {
    message: string;
    type: NotificationType;
    description?: string;
    placement?: PlacementType;
}

interface GlobalData {
  notification?: NotificationProps;
  user?: UserType;
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

    const setNotification = (message: string, type: NotificationType, description?: string, placement?: PlacementType) => {
        setGlobalData({
            ...globalData,
            notification: {
                message,
                type,
                description,
                placement,
            },
        });
    };

    const setUser = (user: UserType) => {
      setGlobalData({
          ...globalData,
          user
      });
  };
  
  return {
      notification: globalData?.notification,
      user: globalData?.user,
      setUser,
      setNotification,
  };
}
