import { useNavigate } from "react-router-dom";
import Dropdown from "../../Components/Dropdown";
import InputText from "../../Components/inputText";
import Button from "../../Components/Button";
import { useState } from "react";
import Checkbox from "../../Components/CheckBox";
import createUserRequest from "../../server_requests/Tasks_Management_Requests_Client/createUserRequest";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [manager, setManager] = useState('');
  const [checkboxOpen, setCheckboxOpen] = useState(false);
  const [adminPW, setAdminPw] = useState(null)
  const [showType, setShowType] = useState('password');
  const [showFormType, setShowFormType] = useState('password');

  const options = [{ label: "Technician", value: "technician" }, { label: "Manager", value: "manager" }];

  const handleUsername = (e) => {
    const data = e.target.value;
    setUsername(data)
  }
  const handleEmail = (e) => {
    const data = e.target.value;
    setEmail(data)
  }

  const handlePassword = (e) => {
    const data = e.target.value;
    setPassword(data)
  }

  const handleManager = (e) => {
    const data = e.target.value;
    setManager(data)
  }

  const handleSelect = (option) => {
    setSelection(option);
  };

  const handleCheckbox = () => {
    setCheckboxOpen(!checkboxOpen);
  }

  const adminHandler = (e) => {
    const data = e.target.value;
    setAdminPw(data)
  }

  const showFormPw = () => {
    if (showFormType === 'password') setShowFormType('text');
    if (showFormType === 'text') setShowFormType('password');
  }

  const adminFields = () => {

    const showPass = () => {
      if (showType === 'password') setShowType('text');
      if (showType === 'text') setShowType('password');
    }

    return (
      <div>
        <InputText type={showType} onChange={adminHandler}>Admin PW</InputText>
        <Checkbox onClick={showPass}>Show Password</Checkbox>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createUserRequest(username, email, password, manager, selection, adminPW);
    console.log(result);

    if (result !== 'Error' && result !== undefined) {
      alert(`User ${username} created!`)
      navigate("/login");
    } else {
      alert('Could not create. Either the username and email are already registered or an admin password is wrong');
    }
  }

  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="col s12">
        <h3>Register</h3>
        <InputText onChange={handleUsername} placeholder="your-username" type="text" className="validate" required>Username</InputText>
        <InputText onChange={handleEmail} placeholder="your-email@your-email.com" type="text" className="validate" required>Email</InputText>
        <InputText onChange={handlePassword} placeholder="your-password" type={showFormType} className="validate" required>Password</InputText>
        <Checkbox onClick={showFormPw}>Show Password</Checkbox>
        <Dropdown options={options} value={selection} onChange={handleSelect} required />
        <Checkbox onClick={handleCheckbox}>Register as Manager with Admin Password</Checkbox>
        {checkboxOpen ? adminFields() : ''}
        <InputText onChange={handleManager} placeholder="manager-email@manager-email.com" type="text" className="validate">Manager-Email</InputText>
        <Button className="waves-effect waves-light btn-large">Register</Button>
      </form>
    </div>
  )
}

export default RegisterPage;