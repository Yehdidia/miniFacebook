import axios from "axios";
import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import Ecrivain from "../components/Ecrivain";



const Admin = () => {
    const [ajoutEcrivain, setAjoutEcrivain] = useState(false)
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
        <NavAdmin checkClicked={setAjoutEcrivain}/>
        {ajoutEcrivain?<Ecrivain/>:undefined}

       <table>
        <caption>Gérer les Postes</caption>
        <thead>
            <tr>
                <th>id Utilisateur</th>
                <th>Nom Utilisateur</th>
                <th>Type Utiisateur</th>
                <th>Poste</th>
                <th>Decision</th>
            </tr>
        </thead>
        <tbody>
            { publications.map((publication) => {
                return(
                <tr>
                    <td>{publication.id}</td>
                    <td></td>
                    <td>utilisateur simple</td>
                    <td>{publication.textPublication}</td>
                    <td>
                        <div className="adminCtrl">
                            <button className="btnMod">Modider</button>
                            <button className="btnSup">Supprimer</button>
                        </div>
                    </td>
                </tr>
                )
            })}
        </tbody>
        </table> 
        </>
    );
}

export default Admin;