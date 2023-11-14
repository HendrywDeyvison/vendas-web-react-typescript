import styled from "styled-components";

export const ContainerLoginScreen = styled.div`
    display: flex;
    width: 100%;
    justify-content: right;
`;

export const BackgroundImage = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
`;

export const LogoImage = styled.img`  
`;

export const ContainerLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D9D9D9;
    width: 100%;
    height: 100vh;
    max-width: 646px;
    padding: 22px;
`;

export const LimitedContainer = styled.div`
    width: 100%;
    max-width: 498px;
    display: flex;
    justify-content: center;
`;