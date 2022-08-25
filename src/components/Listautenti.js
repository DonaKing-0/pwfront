import { useEffect, useState } from "react";
import { getUtenti } from "../api";
import Utente from "./Utente";

const Listautenti = () => {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        (async () => {
            const listaut = await getUtenti();
            console.log(listaut)
            setLista(listaut);
            //se list [] altro stato true false
        })(); 
        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    const stileleggi = {
        backgroundColor: '#282c34',
        borderRadius: '10px',
        border: 'none',
        color: 'white',
        fontSize: '20px',
    };
    const [vuota, SetVuota] = useState(false);

    return (
        <div>
            {vuota && 'Nessun utente'}
            {!vuota && <table className="table table-striped table-hover table-dark">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
                    </tr>
                </thead>
                <tbody>
                    {

                lista.map((element) => {
                    return <Utente key={element._id} element={element}></Utente>;
                })}

                </tbody>
            </table>}
        </div>
    )
};

export default Listautenti;
