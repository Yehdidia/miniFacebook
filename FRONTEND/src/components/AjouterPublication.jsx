import Bouton from "./bouton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";


const AjouterPublication = () => {

    const user = JSON.parse(localStorage.getItem("utilisateur"))

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const publication = {
            ...data,
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur
        }

        axios.post("http://localhost:3000/publications", publication).then
        ((res)=>{
            console.log(res.data)
            toast.success("Pubication enregistrée!")
            reset()
        }).catch((err)=>{
            console.log(err)
            toast.err("Une erreur est survenue")
        })

        console.log(data);
    }

    return(
        <div className="publication">
            <h1>Ajouter une publication</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea name="" id="" rows={15} cols={50} {...register("textPublication", {
                    required:"Veuillez entrer une publication",
                    minLength:{
                        value:10,
                        message: "Veuillez saisir un texte de plus de 5 caracteres"
                    }
                })}>Votre commentaire ici</textarea>
                <label htmlFor="">Veuillez saisir l'url de votre image</label>
                <input type="text" className="inputUrl"
                {...register("imagePublication", {
                    required:"Veuillez saisir une url",

                })}
                />
                <Bouton>Publier</Bouton>
            </form>

        </div>
    )
}

export default AjouterPublication;