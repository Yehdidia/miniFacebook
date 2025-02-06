import { Children } from "react";


const Bouton = ({ children, className = "bouton" }) =>(
    <button className={className}>
        {children}
    </button>
);




export default Bouton;