import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = ({ checkedAddPub}) => {
    const { auth, logout } = useAuth()

    const handleLogout = () => {
        logout(); // Déconnexion
        navigate("/connection"); // Redirection vers la page de connexion
    };
    return(
        <>
        <div className="navbar">
            <div className="logo">facebook</div>
            <div className="navigate">
                <div><Link to={"/"}>Home</Link></div>
                <div><Link to={"/"} onClick={()=>{checkedAddPub(true)}} >Ajouter une Publication</Link></div>
                {auth ? (
                    <>
                        <div><Link to="/profile">Profil</Link></div>
                        <div><button className="deconnexion" onClick={handleLogout}>Déconnexion</button></div>
                    </>
                ) : (
                    undefined
                )}
            </div>
        </div>
        </>
    )
}

export default NavBar;