import { useState, useEffect } from "react";
import loginRequest from "../../server_requests/Login_Register_Requests_Client/loginRequest";
import Button from "../../Components/Button";
import InputText from "../../Components/inputText";
import CheckBox from "../../Components/CheckBox";
import { useNavigate } from "react-router-dom";
import checkLogin from "../../server_requests/Login_Register_Requests_Client/checkLoginRequest";

const LoginPage = () => {
  const navigate = useNavigate();

  const startUp = async () => {
    try {
      if (document.cookie && localStorage.getItem('userId')) {
        //the browser can hold other cookies that are concatened as 1 string. Therefore all the manipulation below. 
        const authToken = document.cookie.replace('managementapp_authToken=', '').split(';');
        const tokenTrimEls = authToken.map(element => element.trim());
        const [token] = tokenTrimEls.filter(pos => pos.startsWith('ey'));
        if (!token) return
        await checkLogin(token);
        navigate('/dashboard');
      }
    } catch (err) {
      return (err)
    }
  }

  useEffect(() => {
    startUp();
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState("password");

  const handleEmail = (e) => {
    const data = e.target.value;
    setEmail(data);
  }

  const handlePassword = (e) => {
    const data = e.target.value;
    setPassword(data)
  }

  const handleShowPw = () => {
    if (showPw === 'password') setShowPw('text');
    if (showPw === 'text') setShowPw('password');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginRequest(email, password);

    if (result.status === 200) navigate('/dashboard');
    if (result === 'Could not Login') return alert(result);
  }

  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="col s12">
        <h3>Login</h3>
        <InputText onChange={handleEmail}
          placeholder="your-email@your-email.com"
          type="text"
          className="validate">Email</InputText>
        <InputText onChange={handlePassword} placeholder="your-password" type={showPw} className="validate">Password</InputText>
        <CheckBox onClick={handleShowPw}>Show Password</CheckBox>
        <Button className="waves-effect waves-light btn-large">Login</Button>
      </form>
    </div>
  )
}

export default LoginPage;