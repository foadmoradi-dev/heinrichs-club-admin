import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useContext, useEffect, useState} from "react";
import {Box, Card, FormControlLabel, Link} from "@mui/material";
import useGet from "../../Hooks/useGet";
import Checkbox from '@mui/material/Checkbox';
import "./tree.css"
import useGetByToken from "../../Hooks/useGetByToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
const CategoryTree = (props) => {
    const [cats, setCats] = useState([])
    const authContext = useContext(AuthContext)
    const [catLoad, setCatLoad] = useState(false)
    const [selectedCat, setSelectedCat] = useState([])
    const {verificationMessage, severity, open, sendRequest: getData, loadingStatus, handleSnackClose} = useGet()
    const {verificationMsg, sever, op, sendRequest: getCatData, loading, handleSnack} = useGetByToken()
    const {sendRequest: refreshToken}  = useUpdateRefreshToken()
    useEffect(() =>{
        getAllCats()
    }, [])
    const getAllCats = () => {
        const applyData = (data) => {
            if(data.status){
                setCats([...data.result])
                props.id ? getCatDataOfProduct() : console.log(data.result)
            }
        }
        getData({url: `/cat.php`}, applyData).then(r => {}, error => {}).catch(e => {})
    }
    const getCatDataOfProduct = () => {
        const applyData = (data) => {
            if (data.status) {
                let tempSelected = []
                for( const d of data.result){
                    tempSelected.push( d.category_id)
                }
                props.onSelectedCategory([...tempSelected])
                setSelectedCat([...tempSelected])
                setCatLoad(true)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
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
                        getCatDataOfProduct()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        let url = props.id ?"/product/" + props.id+"?cat=1" :"/product?cat=1"
        getCatData({url: url}, applyData).then(r =>{}, error => {}).catch(e => { })
    }
    const selecting = (event, id) => {
        let temSelected = []
        if(event.target.checked){
            temSelected = [...selectedCat]
            temSelected.push(id)
           // console.log(temSelected)
            setSelectedCat(temSelected)
        }else{
            temSelected = selectedCat.filter( (row) => { return row !== id})
            setSelectedCat([...temSelected])
            console.log(temSelected)
        }
        props.onSelectedCategory([...temSelected])
    }
    return (
        (props.id?cats.length > 0 && catLoad:cats.length > 0) &&
        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 500 }}>

            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId="1" label="Home" >
                    {
                        cats.filter(cat => {
                            return parseInt(cat.cat_parent) === 1
                        }).map(row =>
                            <li  style={{listStyleType: "none"}}>
                                <TreeItem nodeId={parseInt(row.id)} label={ <FormControlLabel
                                    control={
                                        <Checkbox defaultChecked={selectedCat.includes(row.id)} onChange={ event => selecting( event, row.id)}
                                        />
                                    }
                                    label={row.title}
                                    key={row.id}
                                />}  >
                                    {
                                        cats.filter(cat => {
                                            return cat.cat_parent === row.id
                                        }).map(row =>
                                            <li  style={{listStyleType: "none"}}>
                                                <TreeItem nodeId={parseInt(row.id)}  label={ <FormControlLabel
                                                    control={
                                                        <Checkbox defaultChecked={selectedCat.includes(row.id)} onChange={ event => selecting( event, row.id)}
                                                        />
                                                    }
                                                    label={row.title}
                                                    key={row.id}
                                                />}>
                                                    {
                                                        cats.filter(cat => {
                                                            return cat.cat_parent === row.id
                                                        }).map(row =>
                                                            <li  style={{listStyleType: "none"}}>
                                                                <TreeItem nodeId={parseInt(row.id)}  label={ <FormControlLabel
                                                                    control={
                                                                        <Checkbox defaultChecked={selectedCat.includes(row.id)} onChange={ event => selecting( event, row.id)}
                                                                        />
                                                                    }
                                                                    label={row.title}
                                                                    key={row.id}
                                                                />} >
                                                                </TreeItem>
                                                            </li>

                                                        )
                                                    }
                                                </TreeItem>
                                            </li>
                                        )
                                    }
                                </TreeItem>
                            </li>
                        )
                    }
                    </TreeItem>
            </TreeView>
        </Box>
    );
}
export default CategoryTree