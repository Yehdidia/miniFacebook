import { Link } from "react-router-dom";

const NavAdmin = ({checkClicked}) => {
    return(
        <>
        <div className="navbar">
            <div className="logo">facebook</div>
            <div className="navigate">
                <div><Link to={"/admin"}>Home</Link></div>
                <div><Link to={"/admin"} onClick={()=>{checkClicked(true)}}>Ajouter un écrivain</Link></div>
            </div>
        </div>
        </>
    )
}

export default NavAdmin;