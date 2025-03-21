import { useState } from "react";


const Btnyu = ({bclicked}) => {
    let val = false
    let [valid, setValid] = useState(false)
    setValid(!valid)

    return(
        <>
            <button onClick={() => bclicked(valid)}>Afficher</button>
        </>
    )
}

export default Btnyu;