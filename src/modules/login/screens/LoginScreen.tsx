import { useState } from "react";
import {
  ContainerLoginScreen,
  BackgroundImage,
  LogoImage,
  LimitedContainer,
  ContainerLogin,
  TitleLogin,
} from "../styles/loginScreen.styles";
import SVGHome from "../../../shared/components/icons/SVGHome";
import { useRequests } from "../../../shared/hooks/useRequests";
import Input from "../../../shared/components/inputs/input/Input";
import Button from "../../../shared/components/buttons/button/Button";
import { UserType } from "../types/UserType";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authRequest, loading } = useRequests();

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
   authRequest(
      `?email=${username}&password=${password}`
    );
  };

  return (
    <ContainerLoginScreen>
      <BackgroundImage src="./background.png" />

      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logoSemFundo.png" />
          <SVGHome width={10} height={10} />
          <TitleLogin level={2} type="secondary">
            LOGIN
          </TitleLogin>
          <Input
            placeholder="Digite seu usuário"
            title="USUÁRIO:"
            margin="32px 0px 0px"
            onChange={handleUsername}
            value={username}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            title="SENHA:"
            margin="32px 0px 0px"
            onChange={handlePassword}
            value={password}
          />
          <Button
            loading={loading}
            title="ENTRAR"
            type="primary"
            margin="64px 0px 16px 0px"
            onClick={handleLogin}
          >
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
