import { useState } from "react";
import axios from "axios";
import Button from "../../../shared/buttons/button/Button";
import Input from "../../../shared/inputs/input/Input";
import { ContainerLoginScreen, BackgroundImage, LogoImage, LimitedContainer, ContainerLogin, TitleLogin } from "../styles/loginScreen.styles";
import SVGHome from "../../../shared/icons/SVGHome";

const LoginScreen = () =>{
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    }

    const handleLogin = async () =>{
        const returnObject = await axios.post("http://localhost:3000/users/",
        {
            body: {
                "user": username,
                "password": password
            }
        }).then(result => {

            alert(`AccessToken: ${result}`)
            return result
        })

        console.log(returnObject);
    };

    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />

            <ContainerLogin> 
                <LimitedContainer>
                    <LogoImage src="./logoSemFundo.png" />
                    <SVGHome width={10} height={10} />
                    <TitleLogin level={2} type="secondary"> LOGIN </TitleLogin>
                    <Input placeholder="Digite seu usuário" title="USUÁRIO:" margin="32px 0px 0px" onChange={handleUsername} value={username} />
                    <Input type="password" placeholder="Digite sua senha" title="SENHA:" margin="32px 0px 0px" onChange={handlePassword} value={password} />
                    <Button type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}> ENTRAR </Button>
                </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    );

}

export default LoginScreen;