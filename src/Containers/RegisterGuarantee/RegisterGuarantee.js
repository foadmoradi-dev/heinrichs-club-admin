import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterGuaranteeForm from "../../Components/RegisterGuaranteeForm/RegisterGuaranteeForm";

const RegisterGuarantee = () => {
    return(
        <div className="row" style={{marginTop: 70, marginBottom: 6}}>
            <div className="col-sm"  style={{marginBottom:6}}>
                <RegisterGuaranteeForm />
            </div>
        </div>
    )
}
export default RegisterGuarantee