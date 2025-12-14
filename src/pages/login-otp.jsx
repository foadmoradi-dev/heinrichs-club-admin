import LoginForm from "../components/login/login-form";
import VantaGlobe from "../effects/vanta-globe";
import LoginOTPForm from "../components/login/login-otp-form";

const LoginOTPPage = () => {

    return(
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
            <VantaGlobe />
            <LoginOTPForm />
        </div>
    )
}
export default LoginOTPPage