import {CircularProgress} from "@mui/material";

const LoadingScreen = () =>{
    return <div style={{height:"90vh",display:"flex", alignItems:"center", justifyContent:"center"}}><CircularProgress/></div>;

}

export default LoadingScreen;