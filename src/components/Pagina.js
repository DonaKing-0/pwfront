import { useState, useEffect } from "react";
import Altro from "./Altro";
import Listaprodotti from './Listaprodotti'
import Listautenti from "./Listautenti";
import Listaordinazioni from "./Listaordinazioni";

let bp;
let bu;
let bo;
let ba;

const Pagina = () => {

    useEffect(() => {
        bp= document.getElementById('bp');
        bu= document.getElementById('bu');
        bo= document.getElementById('bo');
        ba= document.getElementById('ba');
      }, []);

    const [prod, setProd] = useState(true);
    const [uten, setUten] = useState(false);
    const [ordi, setOrdi] = useState(false);
    const [altro, setAltro] = useState(false);

    const mostra = (m) => {
        if(m=='p'){
            setProd(true);
            setAltro(false);
            setUten(false);
            setOrdi(false);
            console.log(bu.classList)
            bp.classList.add('active');
            bu.classList.remove('active');
            bo.classList.remove('active');
            ba.classList.remove('active');
        }
        if(m=='u'){
            setProd(false);
            setAltro(false);
            setUten(true);
            setOrdi(false);
            bp.classList.remove('active');
            bu.classList.add('active');
            bo.classList.remove('active');
            ba.classList.remove('active');        
        }
        if(m=='o'){
            setProd(false);
            setAltro(false);
            setUten(false);
            setOrdi(true);
            bp.classList.remove('active');
            bu.classList.remove('active');
            bo.classList.add('active');
            ba.classList.remove('active');
        }
        if(m=='a'){
            setProd(false);
            setAltro(true);
            setUten(false);
            setOrdi(false);
            bp.classList.remove('active');
            bu.classList.remove('active');
            bo.classList.remove('active');
            ba.classList.add('active');
        }
    }

    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{marginBottom:'100px'}}>
            <a className="navbar-brand" href="#">logo</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav" aria-label="Basic example">
                    <button type="button" id="bp" className="btn btn-outline-success nav-item nav-link active" style={{margin: '1px'}} onClick={()=>{mostra('p')}}>Prodotti</button>
                    <button type="button" id="bu" className="btn btn-outline-success nav-item nav-link" style={{margin: '1px'}} onClick={()=>{mostra('u')}}>Utenti</button>
                    <button type="button" id="bo" className="btn btn-outline-success nav-item nav-link" style={{margin: '1px'}} onClick={()=>{mostra('o')}}>Ordinazioni</button>
                    <button type="button" id="ba" className="btn btn-outline-success nav-item nav-link" style={{margin: '1px'}} onClick={()=>{mostra('a')}}>Altro</button>
                </div>
            </div>
        </nav>

        <header className="App-header">
            <hr style={{height: '30px', backgroundColor: 'transparent'}}></hr>

           {prod && <Listaprodotti></Listaprodotti>}
           {uten && <Listautenti></Listautenti>}
           {ordi && <Listaordinazioni></Listaordinazioni>}
           {altro && <Altro></Altro>}

        </header>
        
    </div>
};
export default Pagina;

//pag corrente cambia colore scritta
//style={{'color': tutte}} onClick={()=>{filtra('tutte')}} 
/*
this.classList.remove/add('active')
*/