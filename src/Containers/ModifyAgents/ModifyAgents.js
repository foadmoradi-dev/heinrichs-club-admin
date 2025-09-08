import {
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Snackbar,
    Stack,
    TextField
} from "@mui/material";
import {forwardRef, useContext, useEffect} from "react";
import MuiAlert from "@mui/material/Alert";
import {useState} from "react";
import {Fragment} from "react";
import Loading from "../../Widgets/Loading/Loading";
import ConnectionError from "../../Components/ConnectionError/ConnectionError";
import Agents from "../../Components/Agents/Agents";

import useGetByToken from "../../Hooks/useGetByToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import FormControl from "@mui/material/FormControl";
import SearchIcon from '@mui/icons-material/Search';
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const OrderTypeList = [
    {
        title: "By Registration Date",
        bre: "date"
    },
    {
        title: "By Phone Number",
        bre: "phone_number",
    },{
        title: "By Alphabetically A - Z",
        bre:"az"
    }, {
        title: "By Alphabetically Z - A",
        bre:"za"
    }, {
        title: "By Level Ascending",
        bre:"level_a"
    }, {
        title: "By Level Descending",
        bre: "level_d"
    }
]
const ModifyAgents = () => {
    const [search, setSearch] = useState('')
    const [count, setCount] = useState(0)
    const [pagesCount, setPagesCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const authContext = useContext(AuthContext)
    const [selectedOrderType, setSelectedOrderType] = useState(OrderTypeList[0])
    const [agentsList, setAgentsList] = useState([])
    const {loadingStatus, severity, verificationMessage, open, sendRequest: getByTokenHandler, handleSnackClose } = useGetByToken()
    const {sendRequest: updateToken} = useUpdateRefreshToken()

    const getCountData = (url) => {
        const applyData = (data) => {
            if (data.status) {
                setCount(data.result.count)
                const pCount = Math.ceil(data.result.count / 12)
                setPagesCount(pCount)
                fetchHandler(url)
            }else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        getCountData(url)
                    }
                }
                updateToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        getByTokenHandler({url: `/agent?page=-1`}, applyData).then(r => {}, error => {console.log(error)}).catch(e => {})
    }
    const fetchHandler = (url) => {
        const applyData = (data) => {
            console.log(data)
            if (data.status) {
                setAgentsList(data.result)
            } else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        fetchHandler(url)
                    }
                }
                updateToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        getByTokenHandler({url: url}, applyData).then(r => {}).catch(e => {})
    }
    useEffect(() => {
        const url = `/agent?page=${currentPage}&order=${selectedOrderType.bre}`
        getCountData(url)
    }, [])

    const pageChangeHandler = (event, page) => {
        setCurrentPage(page)
        const url = `/agent?page=${page}&order=${selectedOrderType.bre}`
        getCountData(url)
    }
    const orderTypeHandler = (event) => {
        setSelectedOrderType(event.target.value)
        const url = `/agent?page=${currentPage}&order=${event.target.value.bre}`
        getCountData(url)
    }
    const searchInputHandler = (event) => {
        setSearch(event.target.value)
    }
    const searchHandler = () => {
        setAgentsList([])
        setPagesCount(1)
        const url = `/agent?query=${search}`
        fetchHandler(url)
    }
    return(
        <div className="row container-fluid g-0 " style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
            <div style={{marginLeft:60, marginRight:40}}>
                <FormControl sx={{ m: 1, width:"30%", marginRight:"auto", marginLeft:"auto", marginBottom:2, marginTop:2 }}>
                    <InputLabel id="demo-simple-select-standard-label">Order By</InputLabel>
                    <Select
                        sx={{height:1 }}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedOrderType}
                        onChange={orderTypeHandler}
                        label="Order By"
                    >
                        {
                            OrderTypeList.map(orderType => (
                                    <MenuItem value={orderType} style={{backgroundColor:"#ffffff"}}>{orderType.title}</MenuItem>
                                )
                            )
                        }
                    </Select>
                </FormControl>
                <TextField
                    sx={{width:"40%", margin:2, float:"right"}}
                    id="search"
                    label="Search"
                    helperText="name or phone number"
                    type="text"
                    onChange={searchInputHandler}
                    value={search}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                <IconButton>
                                    <SearchIcon onClick={searchHandler}/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            {
                loadingStatus !== "loading" && loadingStatus !== "try" ?
                    <Fragment>
                        <Agents agnets={agentsList}/>
                        <Stack spacing={2}>
                            <Pagination
                                count={pagesCount}
                                color="primary"
                                style={{marginLeft:"auto", marginRight:"auto"}}
                                page={currentPage}
                                onChange={pageChangeHandler}
                            />
                        </Stack>
                    </Fragment>:
                    loadingStatus === "loading" ?
                        <Loading />:
                        <ConnectionError  tryAgain={fetchHandler} />
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {verificationMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default ModifyAgents