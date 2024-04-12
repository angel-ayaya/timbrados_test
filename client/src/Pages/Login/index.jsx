import LoginForm from "../../components/Login/LoginForm.jsx";

const handleLogin = (username, password) => {
    console.log(username, password);
}

const Login = () => {
  return (
    <div>
      <h1 className="text-center text-2xl mt-4">Iniciar Sesion</h1>
        <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
