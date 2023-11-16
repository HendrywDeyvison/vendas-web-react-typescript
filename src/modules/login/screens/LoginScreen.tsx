import Button from "../../../shared/buttons/button/button";
import Input from "../../../shared/inputs/input/input";
import { ContainerLoginScreen, BackgroundImage, LogoImage, LimitedContainer, ContainerLogin, TitleLogin } from "../styles/loginScreen.styles";

const LoginScreen = () =>{
    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />

            <ContainerLogin> 
                <LimitedContainer>
                    <LogoImage src="./logoSemFundo.png" />
                    <TitleLogin level={2} type="secondary"> LOGIN </TitleLogin>
                    <Input title="USUÁRIO:" />
                    <Input title="SENHA:" />
                    <Button type="primary" margin="64px 0px 16px 0px"> ENTRAR </Button>
                </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    );

}

export default LoginScreen;