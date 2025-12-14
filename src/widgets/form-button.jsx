import {Button} from "@mui/material";
import ButtonProgress from "./button-progress/button-progress";



const FormButton = ({title, loadingStatus, type, clickHandler, variant, fontSize, disabled}) => {


    return(
        <Button
            disabled={disabled}
            variant={variant?variant:"contained"}
            sx={{fontSize:fontSize?fontSize:17, textColor:"blue", textTransform:"capitalize"}}
            type={type}
            onClick={clickHandler}
        >
            {
                loadingStatus ? <ButtonProgress /> : title
            }
        </Button>
    )
}
export default FormButton