import AddNewAdminLink from "../../Components/AddNewAdminLink/AddNewAdminLink";
import ModifyAdminsLink from "../../Components/ModifyAdminsLink/ModifyAdminsLink";
import ContentManagementLink from "../../Components/ContentManagementLink/ContentManagementLink";

const AdminOptions = () => {
    return(
        <div className="row">
            <div className="col-sm-4">
                <AddNewAdminLink />
            </div>
            <div className="col-sm-4">
                <ModifyAdminsLink />
            </div>
            <div className="col-sm-4">
                <ContentManagementLink />
            </div>
        </div>
    )
}
export default AdminOptions