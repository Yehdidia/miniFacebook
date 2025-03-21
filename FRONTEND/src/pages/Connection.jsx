import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Bouton from "../components/bouton";
import NavBar from "../components/NavBar";


const Connection = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("email")) {
            navigate("/");
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.get(
                `http://localhost:3000/utilisateurs?email=${data.email}&motdePasse=${data.motdePasse}`
            );

            const user = res.data[0];
            const { id, prenom, email, motdePasse, roles } = user

            if (res.data.length > 0) {
                localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
                /*const roles = res.data[0]?.roles ? [...res.data[0].roles] : [];
                console.log("Rôles attribués :", roles); // Debug
                setAuth({ email: data.email, motdePasse: data.motdePasse, roles });*/
                setAuth({ id, prenom, email, motdePasse, roles });
                console.log("🔹 Auth mis à jour :", { id, prenom, email, motdePasse, roles });

                toast.success("Connexion réussie !");
                navigate("/");
            } else {
                toast.error("Les identifiants sont incorrects !");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            toast.error("Une erreur s'est produite !");
        }
    };

    return (
        <div>
            <div className="presentation">
            <h1>facebook</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="headingInscription">
                    <h2>Se connecter à facebook</h2>j
                    <h3>Vous devez vous connecter pour continuer</h3>
                </div>
                <hr />
                
                <input
                    type="text"
                    placeholder="Adresse email"
                    className="specialInput"
                    {...register("email", { required: "Veuillez saisir votre email" })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="specialInput"
                    {...register("motdePasse", { required: "Veuillez saisir un mot de passe" })}
                />
                {errors.motdePasse && <p>{errors.motdePasse.message}</p>}

                <Bouton className="bouton">Connexion</Bouton><br />
                <Link to={"/inscription"} className="">Créer un compte</Link>
            </form>
        </div>
        </div>
    );
};

export default Connection;
