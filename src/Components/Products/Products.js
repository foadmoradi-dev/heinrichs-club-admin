import {List} from "@mui/material";
import Product from "../Product/Product";
import {Fragment} from "react";

const Products = (props) => {
    const deleteHandler = (id) => {
        props.deleteHandler(id)
    }
    return(
        <List>
            {
                props.productsList.map(product =>
                    <Product product={product} deleteHandler={deleteHandler} />
                )
            }
        </List>
    )
}
export default Products
