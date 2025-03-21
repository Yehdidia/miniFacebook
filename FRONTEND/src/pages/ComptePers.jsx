import { useState } from "react";
import NavBarGC from "../components/NavBarGC";
import AjouterPublication from "../components/AjouterPublication";


const ComptePers = ()=> {
    const [addPublication, setAddPublication] = useState(false)
    return(
        <>
            <NavBarGC checkedAddPub={setAddPublication}/>
            {addPublication?<AjouterPublication/>:undefined}
        </>
    )
}

export default ComptePers;