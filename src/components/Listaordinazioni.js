import { useEffect, useState } from "react";
import { getOrdinazioni } from "../api";
import Ordinazione from "./Ordinazione";

let tu;
let npr;
let nri;
let nopr;

const Listaordinazioni = () => {

    useEffect(() => {
        (async () => {
            const listaor = await getOrdinazioni();
            console.log(listaor)
            setLista(listaor);
            setList(listaor);
            //se list [] altro stato true false
            tu= document.getElementById('tu');
            npr= document.getElementById('npr');
            nri= document.getElementById('nri');
            nopr= document.getElementById('nopr');
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
    const [list, setList] = useState([]);


    const scelta = (m) => {
        if(m=='t'){
            setLista(list);
            tu.classList.add('active');
            npr.classList.remove('active');
            nri.classList.remove('active');
            nopr.classList.remove('active');
        }
        if(m=='np'){
            const cercati= list.filter(o => o.pronto==false);
            
            console.log(cercati)
            if(cercati){
                setLista(cercati);
            tu.classList.remove('active');
            npr.classList.add('active');
            nri.classList.remove('active');
            nopr.classList.remove('active');    
            }  
        }
        if(m=='nr'){
            const cercati= list.filter(o => o.ritirato==false);
            
            console.log(cercati)
            if(cercati){
                setLista(cercati);
            tu.classList.remove('active');
            npr.classList.remove('active');
            nri.classList.add('active');
            nopr.classList.remove('active');
            }
        }
        if(m=='npnr'){
            const cercati= list.filter(o => o.pronto==false && o.ritirato==false);
            
            console.log(cercati)
            if(cercati){
                setLista(cercati);
            tu.classList.remove('active');
            npr.classList.remove('active');
            nri.classList.remove('active');
            nopr.classList.add('active');
            }
        }
    }

    return (
        <div>
            {vuota && 'Nessun utente'}
            {!vuota && <div className="btn-group" role="group" aria-label="Basic example" style={{marginBottom:'5px'}}>
                <button type="button" id="tu" className="btn btn-secondary active" onClick={()=>{scelta('t')}} /*style={{borderColor: '#5bc0de'}}*/>tutte</button>
                <button type="button" id="npr" className="btn btn-secondary" onClick={()=>{scelta('np')}} /*style={{borderColor: '#5cb85c'}}*/>non pronte</button>
                <button type="button" id="nri" className="btn btn-secondary" onClick={()=>{scelta('nr')}}>non ritirate</button>
                <button type="button" id="nopr" className="btn btn-secondary" onClick={()=>{scelta('npnr')}}>non p e non r</button>

            </div>}
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

//aggiorna anche list e listaaltrimenti finche nn si cambia
// pagina non ricarica
//quelle modificate cambiando filtro non sono mod