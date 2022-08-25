import { useEffect, useState } from "react";
import { getOrdinazioni } from "../api";
import Ordinazione from "./Ordinazione";

const Listaordinazioni = () => {

    useEffect(() => {
        (async () => {
            const listaor = await getOrdinazioni();
            console.log(listaor)
            setLista(listaor);
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
    const [lista, setLista] = useState([]);

    return (
        <div>
            {vuota && 'Nessun utente'}
            {!vuota && <table className="table table-striped table-hover table-dark">
                <thead>
                    <tr>
                    <th scope="col">pronto</th>
                    <th scope="col">ritirato</th>
                    {/*<th scope="col">id</th>*/}
                    <th scope="col">username</th>
                    <th scope="col">lista</th>
                    </tr>
                </thead>
                <tbody>
                    {

                lista.map((element) => {
                    return <Ordinazione key={element._id} element={element}></Ordinazione>;
                })}

                </tbody>
            </table>}
        </div>
    )
};

export default Listaordinazioni;
