import ReactLoading from "react-loading";
import "./Loading.css"
const Loading = (props) => {
    return(
        <div className={"container"}>
            <ReactLoading className={"load"} type={props.type} color={props.color} height={props.height} width={props.width} />
        </div>

    )
}
export default Loading