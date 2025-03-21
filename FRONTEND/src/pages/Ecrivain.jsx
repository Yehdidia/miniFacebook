import { useState } from "react";
import NavBar from "../components/NavBar";
import Btnyu from "../components/btnyu";
import AjouterPublication from "../components/AjouterPublication";


const Ecrivain = () => {
    const [clicked, setClicked] = useState(false)
    return(
        <>
            <NavBar/>
            
            <Btnyu bclicked={setClicked}/>
            {clicked?<AjouterPublication/>:"No action initiated"}

        </>
    );
}

export default Ecrivain;