import Input from "../../../shared/inputs/input/input";
import { ContainerLoginScreen, BackgroundImage, LogoImage, LimitedContainer, ContainerLogin } from "../styles/loginScreen.styles";

const LoginScreen = () =>{
    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />

            <ContainerLogin> 
                <LimitedContainer>
                    <LogoImage src="./logoSemFundo.png" />
                    <Input title="USUÁRIO:" />
                    <Input title="SENHA:" />
                </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    );

}

export default LoginScreen;