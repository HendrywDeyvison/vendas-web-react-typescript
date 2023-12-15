import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginRoutesEnum } from '../../login/routes';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(loginRoutesEnum.login);
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Desculpe, a página que você está visitando não existe."
            extra={<Button onClick={handleButtonClick} type="primary">Página de Login</Button>}
        />
    )

}

export default PageNotFound;