import {Grid, styled} from "@mui/material";
import Paper from "@mui/material/Paper";
import Agent from "../Agent/Agent";


const Agents = (props) => {
    return(
        <Grid container spacing={1}>
            {
                props.agnets.map(agent =>
                    <Grid item xs={12} md={3} key={agent.id}>
                        <Agent agent={agent}/>
                    </Grid>
                )
            }
        </Grid>
        )
}
export default Agents