import { createContext, useContext, useState } from "react";

interface GlobalData {
  accessToken?: string;
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

    const setAccessToken = (accessToken: string) => {
        setGlobalData({
            ...globalData,
            accessToken,
        });
    }; 

    return {
        accessToken: globalData?.accessToken,
        setAccessToken,
    };
}
