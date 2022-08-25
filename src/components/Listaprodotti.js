import { useEffect, useState } from "react";
import { getAltro, getProdotti } from "../api";
import Filtri from "./Filtri";
import Prodotto from "./Prodotto";

import axios from "../api/axios.js"

import { BsFillCheckSquareFill, BsFillSquareFill, BsCheckLg} from "react-icons/bs";
import {FiMinus, FiPlus} from "react-icons/fi"

const Listaprodotti = () => {

    const [cat, setCat] = useState([]);
    const [sta, setSta] = useState([]);
    const [uni, setUni] = useState([]);

    const [lista, setLista] = useState([]);
    const [list, setList] = useState([]);
    const [vuota, SetVuota] = useState(false);

    const [nome, setNome] = useState('');

    const [dispo, setDispo] = useState(false);
    const [off, setOff] = useState(false);

    const [quantita, setQuantita] = useState(0);
    const [prezzo, setPrezzo] = useState(0);

    const [catsele, setCatsele] = useState('seleziona categoria');
    const [stasele, setStasele] = useState('seleziona stagione');
    const [unisele, setUnisele] = useState('seleziona unità di misura');

    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        (async () => {
            const listapro = await getProdotti();
            console.log(listapro);
            setList(listapro);
            setLista(listapro);
            const listaaltro = await getAltro();
           // console.log(listaaltro)
            setSta(listaaltro.stagioni)
            setCat(listaaltro.categorie)
            setUni(listaaltro.unitamisura)

            //se list [] altro stato true false
            if(listapro==[]){//o list?
                SetVuota(true)  //retry?
            }else{
                SetVuota(false)
            }//non va       try catch?

            /*

            const axiosRetry = require('axios-retry');

  axiosRetry(axios, {
    retries: 3, // number of retries
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
      // if retry condition is not specified, by default idempotent requests are retried
      return error.response.status === 503;
    },
  });
            */
        })();
        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    const offe=()=>{

        console.log('prima')
        console.log(off)
        if(off==true){
            console.log('passa nel true')
            setOff(false);

            console.log('dopo')
            console.log(off)
        }else{
            console.log('passa nel false')
            setOff(true);

            console.log('dopo')
            console.log(off)
        }
    }

    const disp=()=>{

        console.log('prima')
        console.log(dispo)
        if(dispo==true){
            console.log('passa nel true')
            setDispo(false);

            console.log('dopo')
            console.log(dispo)
        }else{
            console.log('passa nel false')
            setDispo(true);

            console.log('dopo')
            console.log(dispo)
        }
    }

    const cambiaquantita = (event) => {
        //togli gli 0 davanti e se <0 metti 0
        //se non numero =0
        event.target.value=event.target.value*1;
        console.log(typeof event.target.value)

        if(isNaN(event.target.value)){
            event.target.value=0;
            console.log("NON numero")
        }
        if(event.target.value<0){
            event.target.value=0;
        }
        event.target.value = +event.target.value;

        setQuantita(event.target.value);
        console.log(quantita);
    }

    const menoq = () => {
        if(quantita>0){
            setQuantita(+quantita-1);
            console.log(quantita);
        }
    }

    const piuq = () => {
        setQuantita(+quantita+1);
        console.log(quantita);
    }

    const cambiaprezzo = (event) => {
        //togli gli 0 davanti e se <0 metti 0
        //se non numero =0
        event.target.value=event.target.value*1;
        console.log(typeof event.target.value)

        if(isNaN(event.target.value)){
            event.target.value=0;
            console.log("NON numero")
        }
        if(event.target.value<0){
            event.target.value=0;
        }
        event.target.value = +event.target.value;

        setPrezzo(event.target.value);
        console.log(prezzo);
    }

    const menop = () => {
        if(prezzo>0){
            setPrezzo(+prezzo-1);
            console.log(prezzo);
        }
    }

    const piup = () => {
        setPrezzo(+prezzo+1);
        console.log(prezzo);
    }

    const selezcate = (cat) => {
        setCatsele(cat);
        console.log(cat);
    }

    const selezstag = (sta) => {
        setStasele(sta);
        console.log(sta);
    }

    const selezunit = (uni) => {
        setUnisele(uni);
        console.log(uni);
    }

    const aggiornanome= (event)=>{
        setNome(event.target.value);
    }

    const reset= ()=>{
        setNome('');
        setDispo(false);
        setOff(false);
        setQuantita(0);
        setPrezzo(0);
        setCatsele('seleziona categoria');
        setStasele('seleziona stagione');
        setUnisele('seleziona unità di misura');
        setMsg('');
        setErr(false);
    }

    const salva= async()=>{
        //controlla tutto compilato
        if(nome=='' || unisele=='seleziona unità di misura' || catsele=='seleziona categoria' || stasele=='seleziona stagione'){
//altrimenti errore
            setMsg('Inserisci nome, categoria, stagione, unità di misura');
            setErr(true);
        }else{
            //prova post
            try{

                const body={
                    "nome": nome,
                    "offerta": off,
                    "disponibile": dispo,
                    "quantita": quantita,
                    "prezzo": prezzo,
                    "unita": unisele,   //ok tanto se non c'è db non salva
                    "stagione": stasele,       //invece no ricontrolla
                    "categoria": catsele
                }
                //non serve + ed in + incasina -->richiesta sta cat uni non valide
                /*if(catsele!='seleziona categoria'){
                    body.categoria=catsele;
                }
                if(stasele!='seleziona stagione'){
                    body.stagione=catsele;
                }
                if(unisele!='seleziona unità di misura'){
                    body.categoria=catsele;
                }*/
    //così non aggiorna
                const res= await axios.post('/prodotti',
                     //data: JSON.stringify({
                         body
                     //  })
                );
                console.log(res);
                if(res.data && res.data.nome){//risposta corretta
                    //inserisci +reset +chiui modal
                    setList(list.concat(res.data));
                    document.getElementById('chiudi1').click();
                    reset();
                }else{
                    //msg errore dovrebbe tornare?
                    if(res.data){
                        setMsg(res.data);
                        setErr(true);
                    }
                }
             }catch(e){
                 console.log(e);
             }
        //controlla errori

        //+inserisci il nuovo
        }
        
    }

    const cercanome= (cerca)=>{
        const cercati= lista.filter(prod => prod.nome.toLowerCase().includes(cerca.toLowerCase()));
        
        console.log(cercati)
        if(cercati){
            setList(cercati);
            SetVuota(false);
        }else{
            SetVuota(true);
        }
    }

    const cercafiltri=(filtri)=>{
        //q min q max -->min 0  -->max>min altrim =

        //non buono ma + filtri di fila
        let l= lista;//modifica? vecchia

        if(filtri.o==true){
            l=l.filter((p)=>{
                if(p.offerta && p.offerta==true){
                    return true;
                }else{
                    return false;
                }
            })
        }
        if(filtri.d==true){
            l=l.filter((p)=>{
                if(p.disponibile && p.disponibile==true){
                    return true;
                }else{
                    return false;
                }
            })
        }
        if(filtri.c!='seleziona'){
            l=l.filter((p)=>{
                if(filtri.c== p.categoria){//poi include
                    return true;
                }else{
                    return false;
                }
            })
        }
        if(filtri.s!='seleziona'){
            l=l.filter((p)=>{
                if(filtri.s== p.stagione){//poi include
                    return true;
                }else{
                    return false;
                }
            })
        }
        if(filtri.u!='seleziona'){
            l=l.filter((p)=>{
                if(filtri.u== p.unitamisura){//poi include
                    return true;
                }else{
                    return false;
                }
            })
        }

        if(filtri.mi!=0 && filtri.ma ==0){
            l=l.filter((p)=>{
                if(p.prezzo>=filtri.mi){//poi include
                    return true;
                }else{
                    return false;
                }
            })
        }
        if(filtri.ma !=0){
            l=l.filter((p)=>{
                if(p.prezzo>=filtri.mi && p.prezzo<=filtri.ma){//poi include
                    return true;
                }else{
                    return false;
                }
            })
        }
        //se max 0 min x -> maggiori min
        //altrim tra min e max

        if(l){
            setList(l);
            SetVuota(false);
        }else{
            SetVuota(true);
        }
    }

//quando clicco sul nero reset!!!!  --> ok fatto no!!!!! anche la card cancella

//ogni volta che c'è map controlla no [] altrim schermo bianco
///////////

    return (
        <div>
            <div className='d-flex justify-content-around'>
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">+ nuovo prodotto</button>

            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                filtri
            </button>
            
            </div>
            <div className="collapse" id="collapseExample">
                <Filtri cercanome={cercanome} cercafiltri={cercafiltri} stag={sta} cate={cat} unit={uni}></Filtri>
            </div>

            {vuota && 'Nessun prodotto'}
            {!vuota && <div style={{ display: 'flex', 'fleDirection': 'row', flexWrap: 'wrap','justifyContent': 'center'}}>
                    {

                list.map((element) => {
                    return <Prodotto key={element._id} element={element}></Prodotto>;
                })}

            </div>}

    <div className="modal fade" style={{color:'#282c34'}} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: '#fff2e6'}}>
                    <h5 className="modal-title" id="exampleModalCenterTitle">Aggiungi prodotto</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={reset}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{backgroundColor: '#fff2e6'}}>

                    {err && <font color='#b30000'>{msg}<br></br></font>}
                    Nome
                    <input type="text" id="nuo" className="form-control text-center" value={nome} onChange={aggiornanome}></input>
                    {/*<img className="card-img-top" src="https://file.cure-naturali.it/site/image/hotspot_article_first/29929.jpg" alt="Card image cap"/>*/}
                
                    <button type="button" className="btn btn-info" style={{'margin': '5px', 'height': '42px', 'width': '42px'}} onClick={offe}>
                        {off && <BsFillCheckSquareFill />}
                        {!off && <BsFillSquareFill />}
                    </button>
                    <font>offerta</font>
                    <br></br>

                    <button type="button" className="btn btn-info" style={{'margin': '5px', 'height': '42px', 'width': '42px'}} onClick={disp}>
                        {dispo && <BsFillCheckSquareFill />}
                        {!dispo && <BsFillSquareFill />}
                    </button>
                    <font>disponibile</font>
                    <br></br>

                    <div className="form-group">
                        Quantità<br></br>
                        <div className="input-group number-spinner" style={{width: `calc(100% - 30px)`}}>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-danger" style={{'height': '42px', 'width': '42px'}} onClick={menoq}>
                                        <FiMinus></FiMinus>
                                </button>
                            </div>
                            <input type="text" name="child" id="child" className="form-control text-center" value={quantita} onChange={cambiaquantita} min="0" ></input>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-info" style={{'height': '42px', 'width': '42px'}} onClick={piuq}>
                                        <FiPlus></FiPlus>
                                </button>                       
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        Prezzo<br></br>
                        <div className="input-group number-spinner" style={{width: `calc(100% - 30px)`}}>
                            <span className="input-group-prepend">
                                <button type="button" className="btn btn-danger" style={{'height': '42px', 'width': '42px'}} onClick={menop}>
                                        <FiMinus></FiMinus>
                                </button>
                            </span>
                            <input type="text" name="child2" id="child2" className="form-control text-center" value={prezzo} onChange={cambiaprezzo} min="0" ></input>
                            <span className="input-group-append">
                                <button type="button" className="btn btn-info" style={{'height': '42px', 'width': '42px'}} onClick={piup}>
                                        <FiPlus></FiPlus>
                                </button>                       
                            </span>
                        </div>
                    </div>

                    <div className="dropdown">
                        Unità di misura
                        <br></br>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {unisele}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                            {/* dal db se vuote?   */
                            uni.map((element) => {
                                return <button key={element} className="dropdown-item" onClick={()=>{selezunit(element)}}>{element}</button>
                            })
                            }
                        </div>
                    </div>

                    <div className="dropdown">
                        Categoria
                        <br></br>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {catsele}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {/* dal db se vuote?   */
                                cat.map((element) => {
                                    return <button key={element} className="dropdown-item" onClick={()=>{selezcate(element)}}>{element}</button>
                                })
                                }

                        </div>
                    </div>

                    <div className="dropdown">
                        Stagione
                        <br></br>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {stasele}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {/* dal db se vuote?   */
                                sta.map((element) => {
                                    return <button key={element} className="dropdown-item" onClick={()=>{selezstag(element)}}>{element}</button>
                                })
                                }

                        </div>
                    </div>

                </div>
                <div className="modal-footer" style={{backgroundColor: '#fff2e6', 'borderRadius': '0px 0px 4px 4px'}}>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={reset} >annulla</button>
                    <button type="button" className="btn btn-primary" onClick={salva}>salva</button>
                    <button type="button" id='chiudi1' style={{display: 'none'}} className="btn btn-primary" data-dismiss='modal'></button>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
};

export default Listaprodotti;
