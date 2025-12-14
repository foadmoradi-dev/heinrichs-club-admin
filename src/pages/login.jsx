import LoginForm from "../components/login/login-form";
import VantaGlobe from "../effects/vanta-globe";

const LoginPage = () => {

    return(
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
            <VantaGlobe />
            <LoginForm />
        </div>
    )
}
export default LoginPage