import SearchGuarantees from "../components/guaranties/search-guarantee";
import {useSelector} from "react-redux";
import Guaranties from "../components/guaranties/guaranties";
import InactiveAccountNotice from "../widgets/inactive-account-notice";

const GuarantiesManagementPage = () => {
    const user = useSelector(state => state.userSlice.user);
    return(
        <div className={'flex flex-col justify-center items-center'}>
            <Guaranties/>
            <SearchGuarantees/>
        </div>
    )
}
export default GuarantiesManagementPage;