import axios from "axios";
import AjouterPublication from "../components/AjouterPublication";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";


const Home = () => {
    const [publications, setPublications] = useState([])
    const [afficherPublication, setAfficherPublication] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:3000/publications").then
        ((res)=>{
            setPublications(res.data)
        })

    },[])
    return(
        <>
        <NavBar checkedAddPub={setAfficherPublication}/>
        {afficherPublication?<AjouterPublication />:undefined}
        <div className="wrapper">
            {
                publications.map((publication)=>{
                    return(
                        <div className="card">
                            <div className="topCard">
                                <div className="avatar"><img src="" alt="" /></div>
                                <div>{publication.auteur}</div>
                            </div>
                            <div>
                                <div>{publication.textPublication}</div>
                                <div>{publication.imagePublication}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default Home;