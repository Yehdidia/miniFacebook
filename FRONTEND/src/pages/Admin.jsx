import { useState } from "react";
import NavAdmin from "../components/NavAdmin";
import Ecrivain from "../components/Ecrivain";



const Admin = () => {
    const [ajoutEcrivain, setAjoutEcrivain] = useState(false)
    return(
        <>
        <NavAdmin checkClicked={setAjoutEcrivain}/>
        {ajoutEcrivain?<Ecrivain/>:undefined}
        </>
    );
}

export default Admin;