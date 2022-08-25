import { useEffect, useState } from "react";

import axios from "../api/axios.js"

import { BsFillPencilFill, BsXCircleFill, BsFillCheckSquareFill, BsFillSquareFill, BsCheckLg} from "react-icons/bs";
import {FiMinus, FiPlus} from "react-icons/fi"
import { getAltro } from "../api";

const sfondo='#fff2e6';

const stilescrivi={
    check:{'margin': '5px', 'height': '42px', 'width': '42px'},
    num:{
        bott:{ 'height': '40px', 'width': '40px'},
        test:{borderRadius: '0px'}
    },
    selez:{}
}

const stileleggi={
    check:{backgroundColor: "transparent", border: 'none', color: '#282c34'},
    num:{
        bott:{display: 'none'},
        test:{borderRadius: '5px'}
    },
    selez:{backgroundColor: "transparent", color: '#282c34'}
}

const Opzioni = ({ element }) => {
//cambia tutti da prodotto
    const [stile, setStile] = useState(stileleggi);
    const [vedi, setVedi] = useState('block');

    const [dispo, setDispo] = useState(element.disponibile ? element.disponibile : false);
    const [off, setOff] = useState(element.offerta ? element.offerta : false);
    const [read, setRead] = useState(true);

    const [quantita, setQuantita] = useState(element.quantita ? element.quantita : 0);
    const [prezzo, setPrezzo] = useState(element.prezzo ? element.prezzo : 0);

    const [catsele, setCatsele] = useState(element.categoria ? element.categoria : 'seleziona categoria');
    const [stasele, setStasele] = useState(element.stagione ? element.stagione : 'seleziona stagione');
    const [unisele, setUnisele] = useState(element.unitamisura ? element.unitamisura : 'seleziona unità di misura');

//default altrimenti se ci sono usa altre
//element.color ? element.color : /*element.color*/'#282c34'

const [cat, setCat] = useState([]);
const [sta, setSta] = useState([]);
const [uni, setUni] = useState([]);

useEffect(() => {
    (async () => {
        const listaaltro = await getAltro();
       // console.log(listaaltro)
        setSta(listaaltro.stagioni)
        setCat(listaaltro.categorie)
        setUni(listaaltro.unitamisura)
        //se list [] altro stato true false
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

    const cambia = () => {

        setRead(false);
        setStile(stilescrivi);
    }

    const elimina = async() => {
        //se tutto ok 
        //setVedi('none');
        try{
            const res= await axios.delete('/prodotti/id/'+element._id);
             console.log(res);
             if(res.data==''){//risposta corretta
                 setVedi('none');
             }
         }catch(e){
             console.log(e);
         }
    }

    const salva = async() => {
        //se seleziona ...cat uni sta -->  non salvarle
        //ogni elem se c'è cambia s e no no -->no non possibile aggiungere elem mancanti
        try{

            const body={
                "nome": element.nome,
                "offerta": off,
                "disponibile": dispo,
                "quantita": quantita,
                "prezzo": prezzo,
    //            "unitamisura": unisele,   //ok tanto se non c'è db non salva
  //              "stagione": stasele,       //invece no ricontrolla
//                "categoria": catsele
            }

            if(catsele!='seleziona categoria'){
                body.categoria=catsele;
            }
            if(stasele!='seleziona stagione'){
                body.stagione=catsele;
            }
            if(unisele!='seleziona unità di misura'){
                body.categoria=catsele;
            }
//così non aggiorna
            const res= await axios.put('/prodotti/id/'+element._id,
                 //data: JSON.stringify({
                     body
                 //  })
            );//in back controlla categorie stagioni unita misura! in modifica
             console.log(res);
             if(res.data && res.data.nome){//risposta corretta
                 
             }else{
                //msg errore dovrebbe tornare?
                //rimettere valori vecchi
                setDispo(element.disponibile ? element.disponibile : false);
                setOff(element.offerta ? element.offerta : false);
                setPrezzo(element.prezzo ? element.prezzo : 0);
                setQuantita(element.quantita ? element.quantita : 0);
                setCatsele(element.categoria ? element.categoria : 'seleziona categoria');
                setStasele(element.stagione ? element.stagione : 'seleziona stagione');
                setUnisele(element.unitamisura ? element.unitamisura : 'seleziona unità di misura');
             }
         }catch(e){
             console.log(e);
         }
        setRead(true);
        setStile(stileleggi);
    }

    return <div className="card text-start" style={{width: "18rem", color: '#282c34', textAlign: 'left', backgroundColor: sfondo, margin: '5px', display: vedi}}>
                <div className="float-left card-title" style={{ height: '3rem', width: '100%',padding: '10px', alignItems:'center', verticalAlign: 'center', 'fontSize':'20px'}}>
                    {element.nome}
                    <button type="button" className="btn btn-danger float-right" style={{ 'height': '42px', 'width': '42px', 'alignContent': 'center', 'alignItems': 'center', 'verticalAlign': 'center'}} data-toggle="tooltip" title="elimina" data-placement="bottom" onClick={elimina}>
                        <BsXCircleFill />
                    </button>
                        {read && <button type="button" className="btn btn-secondary float-right" style={{'marginRight': '5px', 'height': '42px', 'width': '42px','alignContent': 'center', 'alignItems': 'center', 'verticalAlign': 'center'}} onClick={cambia} data-toggle="tooltip" title="modifica" data-placement="bottom"><BsFillPencilFill /></button>}
                        {!read && <button type="button" className="btn btn-secondary float-right" style={{'marginRight': '5px', 'height': '42px', 'width': '42px','alignContent': 'center', 'alignItems': 'center', 'verticalAlign': 'center'}} onClick={salva} data-toggle="tooltip" title="salva" data-placement="bottom"><BsCheckLg /></button>}
                    
                </div>
                <img className="card-img-top" style={{ width: '286px'}} src="https://file.cure-naturali.it/site/image/hotspot_article_first/29929.jpg" alt="Card image cap"/>
                
                <div className="card-body">

                <button type="button" disabled={read} className="btn btn-info" style={stile.check} onClick={offe}>
                    {off && <BsFillCheckSquareFill />}
                    {!off && <BsFillSquareFill />}
                    
                </button>
                <font>offerta</font>
                <br></br>

                <button type="button" disabled={read} className="btn btn-info" style={stile.check} onClick={disp}>
                    {dispo && <BsFillCheckSquareFill />}
                    {!dispo && <BsFillSquareFill />}
                    
                </button>
                <font>disponibile</font>
                <br></br>

                <div className="form-group">
                    Quantità<br></br>
                   <div className="input-group number-spinner" style={{width: `calc(100% - 30px)`}}>
                        <div className="input-group-prepend">
                            <button type="button" className="btn btn-danger" style={stile.num.bott} onClick={menoq}>
                                    <FiMinus></FiMinus>
                            </button>
                        </div>
                        <input type="text" readOnly={read} name="child" id="child" className="form-control text-center" style={stile.num.test} value={quantita} onChange={cambiaquantita} min="0" ></input>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-info" style={stile.num.bott} onClick={piuq}>
                                    <FiPlus></FiPlus>
                            </button>                       
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    Prezzo<br></br>
                   <div className="input-group number-spinner" style={{width: `calc(100% - 30px)`}}>
                        <span className="input-group-prepend">
                            <button type="button" className="btn btn-danger" style={stile.num.bott} onClick={menop}>
                                    <FiMinus></FiMinus>
                            </button>
                        </span>
                        <input type="text" readOnly={read} name="child2" id="child2" className="form-control text-center" style={stile.num.test} value={prezzo} onChange={cambiaprezzo} min="0" ></input>
                        <span className="input-group-append">
                            <button type="button" className="btn btn-info" style={stile.num.bott} onClick={piup}>
                                    <FiPlus></FiPlus>
                            </button>                       
                        </span>
                    </div>
                </div>

                <div className="dropdown">
                    Unità di misura
                    <br></br>
                    <button className="btn btn-secondary dropdown-toggle" style={stile.selez} disabled={read} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <button className="btn btn-secondary dropdown-toggle" style={stile.selez} disabled={read} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <button className="btn btn-secondary dropdown-toggle" style={stile.selez} disabled={read} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                
            </div>;
};

export default Opzioni;

        //modifica img??

        
        
        
        //+facile quando aggiunto prodotto in front -->se c'è già sommo qta 
//non agg prod

//enabled=false + stile?

//rivedi tooltips

//se dati non ci son?

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStHS32SFj_Ph5SIZZB7G5f66PuJ5zH-5JgsQ&usqp=CAU
//stile immagine
//286 186

//https://ortofruttaregina.it/wp-content/uploads/2020/11/mirtilli.jpg
//https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=2000