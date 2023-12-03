import { Spin } from "antd";
import { useEffect } from "react";
import { getAuthorizationToken } from "../../../shared/functions/connection/auth";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../product/routes";
import { loginRoutesEnum } from "../../login/routes";

const FirstScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthorizationToken();
            
        if(token){
            navigate(ProductRoutesEnum.PRODUCT);
        }else{
            navigate(loginRoutesEnum.LOGIN);
        }
    }, []);

    return <Spin />;
}

export default FirstScreen;