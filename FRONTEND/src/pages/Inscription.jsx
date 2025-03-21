import { useRef, useState, useEffect } from "react";
import Bouton from "../components/bouton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-24}$/;

const Inscription = () => {
    //const { setAuth } = useAuth;
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        // Création de l'objet Date avec les valeurs sélectionnées
        const dateNaissance = new Date(data.annee, data.mois - 1, data.jour);
        
        console.log("Données soumises :", {
            ...data,
            dateNaissance: dateNaissance.toISOString().split("T")[0] // Format YYYY-MM-DD
        });

        axios.get(`http://localhost:3000/utilisateurs?email=${data.email}`).then(
            (res)=>{
                if(res.data.length>0){
                    toast("Un compte existe déjà avec la meme adresse email")
                }else{
                    axios.post("http://localhost:3000/utilisateurs", data).then((res)=>{
                        toast.success('Inscription Réussie! ')
                        navigate("/connexion");
                        const utilisateur = res.data; // Récupérer l'utilisateur avec son ID

                        // ✅ Mettre à jour le contexte AuthProvider
                        setAuth({
                            id: utilisateur.id, // ID de l'utilisateur
                            prenom: utilisateur.prenom,
                            nomUtilisateur: utilisateur.famille, // Nom de famille
                            email: utilisateur.email
                        });

                        /*localStorage.setItem("utilisateur", JSON.stringify({
                            id: utilisateur.id,
                            prenom: utilisateur.prenom,
                            nomUtilisateur: utilisateur.famille,
                            email: utilisateur.email
                        }));*/
                    }).catch((err)=>{
                        console.log(err)
                        toast.error("Une erreur est survenue!")
                    })
                }
            }
        )
        
        
    };

    const [user, setUser] = useState({
        name:'',
        surname:'',
        email:'',
        password:'',
        dateofBirth:'',
        genre:'',
    })

    const [username, setUsername] = useState('');
    const [validname, setValidname] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setpwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errmsg, setErrmsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [annees, setAnnees] = useState([])
    const [mois, setMois] = useState([])
    const [jours, setJours] = useState([])

    const [anneeSel, setAnneeSel] = useState("")
    const [moisSel, setMoisSel] = useState("")
    const [jourSel, setJourSel] = useState("")

    /*useEffect(()=>{
        userRef.current.focus();
    },[])*/

    useEffect(()=>{
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidname(result);
    }, [username])

    useEffect(()=>{
        const result = USER_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        const match = pwd == matchPwd;
        setValidname(match);
    }, [pwd, matchPwd])

    useEffect(()=>{
        setErrmsg('');
    }, [errmsg, pwd, matchPwd])

    useEffect(()=>{
        setAnnees([...Array(100).keys().map(i=>(2024-i))])
    },[])

    useEffect(()=>{
        const indexMois = Array.from({length:12},(_,i)=>i)
        setMois(indexMois)
    },[])
    //console.log(mois)
    //console.log(anneeSel)

    useEffect(()=>{
        if(anneeSel && moisSel){
            console.log(moisSel)
            const nbrJourPrec = new Date(anneeSel, parseInt(moisSel, 10),0).getDate()
            console.log(nbrJourPrec)
            const listJour = [...Array(nbrJourPrec).keys()].map(i=>i+1)
            setJours(listJour)
        }else{
            setJours([])
        }

    },[anneeSel, moisSel])
    console.log(jours)

    return (
        <div className="presentation">
            <h1>facebook</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="formInscription">
                <div className="headingInscription">
                    <h2>Creer un compte</h2>
                    <h3>C'est rapide et facile</h3>
                </div><hr />
                <label htmlFor="" >oik
                        <span className={validname ? "valid": "hide"}>+</span>
                        <span className={validname || !username ? "hide": "invalid"}>-</span>
                    </label>
                <div className="fistRowForm">
                    <input type="text" placeholder="Prenom" ref={userRef} onChange={(e)=>setUsername(e.target.value)} aria-describedby="uidnote" onFocus={()=>setUserFocus(true)} onBlur={() => setUserFocus(false)}
                    {...register("prenom", {require:"Veuillez saisir votre prenom", minLength:{value:5, message:"Veuillez saisir un prenom de plus de 5 caracteres"}})}
                    />
                    <input type="text" placeholder="Nom de famille" ref={userRef} onChange={(e)=>setUsername(e.target.value)} aria-describedby="uid2note"
                    {...register("famille", {require:"Veuillez saisir votre famille", minLength:{value:5, message:"Veuillez saisir un nom de famille de plus de 5 caracteres"}})}
                    />
                </div>
                <p id="uidnote" className={userFocus && username && !validname ? "instruction":"offscreen"}>
                    4 to 24 characters Must begin with a letter  Letters, numbers, underscores, hyphens allowed
                </p>
                <p id="uid2note" className={userFocus && username && !validname ? "instruction":"offscreen"}>
                    4 to 24 characters Must begin with a letter  Letters, numbers, underscores, hyphens allowed
                </p>
                <input type="text" placeholder="Adresse email" className="specialInput" onChange={(e)=>setUsername(e.target.value)}
                {...register("email", {require:"Veuillez saisir votre email", minLength:{value:5, message:"Veuillez saisir une adresse de plus de 5 caracteres"}})}
                />
                <input type="password" placeholder="Mot de passe" className="specialInput"
                {...register("motdePasse", {require:"Veuillez saisir un mot de passe", minLength:{value:5, message:"Veuillez saisir un mot de passe de plus de 5 caracteres"}})}
                
                />
                <label htmlFor="">Date de naissance</label><br />
                <select {...register("annee", { required: "Sélectionnez une année" })} onChange={(e)=>setAnneeSel(e.target.value)}>
                    <option value="">Année</option>
                    {
                        annees.map(val=>{
                            return <option key={val} value={val}>{val}</option>;
                        })
                    }
                 </select>

                 <select {...register("mois", { required: "Sélectionnez un mois" })} onChange={(e)=>setMoisSel(e.target.value)}>
                    <option value="">Mois</option>
                    {
                        mois.map((mois)=>{
                            const nomMois = new Date(0,mois).toLocaleString("fr-Fr", {month:"long"})
                            return(
                                <option key={mois} value={(mois+1).toString()}>{nomMois}</option>
                            )
                        })
                    }
                </select>

                <select {...register("jour", { required: "Sélectionnez un jour" })}>
                    <option value="">Jour</option>
                    {
                       jours.map((jour)=>{
                        return <option key={jour} value={jour}>{jour}</option>
                       }) 
                    }
                </select>

                <label htmlFor="">Genre</label><br />
                <div className="radioWrapper">
                    <div className="contentRadioButton">Masculin<input type="radio" name="genre" value="homme" placeholder="homme" className="inputRadio"
                    {...register("genre", { required: "Sélectionnez un genre" })}
                    /></div>
                    <div className="contentRadioButton">Feminin<input type="radio" name="genre" value="femme" placeholder="femme" className="inputRadio"
                    {...register("genre", { required: "Sélectionnez un genre" })}
                    /></div>
                </div>
                <div className="textWrap">
                <p>
                    En cliquant sur S'inscrire, vous acceptez nos <span>Conditions générales</span>
                    Decouvrez comment nous receuillons, utilisons et partageons vos Données en lisant notre
                    <span>Politique d'utilisation des Données</span> et comment nous utilisons les cookies et autres technologies
                    similaires en consultant notre <span>Politique d'utilisation des cookies</span> Vous recevrez peut-etre des notifications
                    par texto de notre part et vous pouvez à tout moment vous désabonner.
                </p>
                </div>
                <Bouton className={'bouton'}
                >
                    Inscription
                </Bouton>
                <div><Link to={"/connection"}>Vous avez déjà un compte</Link></div>
            </form>


        </div>
    )
}

export default Inscription
