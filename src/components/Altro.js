import { useEffect, useState } from "react";

import { BsXCircleFill} from "react-icons/bs";
import {FiPlus} from "react-icons/fi"
import { IconContext } from "react-icons";
import { getAltro } from "../api";

import axios from "../api/axios.js"

const sfondo='#fff2e6';

const stile={ color: '#d9534f', backgroundColor: "transparent", border: '0px', padding: '0px'}

const Altro = ({}) => {

    useEffect(() => {
        (async () => {
            const listaaltro = await getAltro();
            setLista(listaaltro);
            setSta(listaaltro.stagioni)
            setCat(listaaltro.categorie)
            setUni(listaaltro.unitamisura)

            //se list [] altro stato true false
        })(); 
        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

//cambia tutti da prodotto

    const [lista, setLista] = useState([]);
    //const [vuota, SetVuota] = useState(lista ? true : false);
    const [cat, setCat] = useState([]);
    const [sta, setSta] = useState([]);
    const [uni, setUni] = useState([]);

    const [quale, setQuale] = useState('');
    const [casella, setCasella] = useState('');


    const aggiornacasella= (event)=>{
        setCasella(event.target.value);
    }

    const salvanuova = async() => {
//distingui casi con quale
        if(quale=='categoria'){
            if(cat.includes(casella)){
                //msg errore
            }else{
                //salva db
                //casella ''
                //chiudi modal
        //non va        console.log(sta.includes(casella))
                    try{
                       const res= await axios.put('/altro/aggcat',{
                            //data: JSON.stringify({
                                "categoria": casella
                            //  })
                       });
                        console.log(res);
                        if(res.data && res.data.categorie){//risposta corretta
                            //diventa numero con push?!
                            setCat(cat.concat(casella.trimStart().trimEnd()))
                        }
                    }catch(e){
                        console.log(e);
                    }
                    setCasella('');
                    document.getElementById('chiudi').click()
//rerender?????????????????????????????
            }
        }
        if(quale=='stagione'){
            if(sta.includes(casella)){
                //msg errore
            }else{
                //salva db
                //casella ''
                //chiudi modal
                console.log(sta.includes(casella))
                    try{
                       const res= await axios.put('/altro/aggstag',{
                            //data: JSON.stringify({
                                "stagione": casella
                            //  })
                       });
                        console.log(res);
                        if(res.data && res.data.categorie){//risposta corretta
                            console.log(sta)
                            setSta(sta.concat(casella.trimStart().trimEnd()))
                        }
                    }catch(e){
                        console.log(e);
                    }
                    setCasella('');
                    document.getElementById('chiudi').click()
//rerender?????????????????????????????
                
            }
        }
        if(quale=='unità di misura'){
            if(uni.includes(casella)){
                //msg errore
            }else{
                //salva db
                //casella ''
                //chiudi modal
                //console.log(sta.includes(casella))
                    try{
                       const res= await axios.put('/altro/aggunit',{
                            //data: JSON.stringify({
                                "unitamisura": casella
                            //  })
                       });
                        //console.log(res);
                        if(res.data && res.data.categorie){//risposta corretta
                            setUni(uni.concat(casella.trimStart().trimEnd()))
                        }
                    }catch(e){
                        console.log(e);
                    }
                    setCasella('');
                    document.getElementById('chiudi').click()
//rerender?????????????????????????????
                
            }
        }

    }

    const elimcat = async(c) => {
        //se rispo ok eliminato altrim ?
        try{
            const res= await axios.put('/altro/elimcat',{
                 //data: JSON.stringify({
                     "categoria": c
                 //  })
            });
             console.log(res);
                if(res.data && res.data.categorie){//risposta corretta
                    const index =  cat.indexOf(c);
                    if (index > -1){
                        const a= Array.from(cat);
                        console.log(a.splice(index, 1));
                        setCat(a);
                    }
                }
         }catch(e){
             console.log(e);
         }
    }

    const elimsta = async(s) => {
        try{
            const res= await axios.put('/altro/elimstag',{
                 //data: JSON.stringify({
                     "stagione": s
                 //  })
            });
             console.log(res);
                if(res.data && res.data.categorie){//risposta corretta
                    const index =  sta.indexOf(s);
                    if (index > -1){
                        const a= Array.from(sta);
                        console.log(a.splice(index, 1));
                        setSta(a);
                    }
                }
         }catch(e){
             console.log(e);
         }

    }

    const elimuni = async(u) => {
        try{
            const res= await axios.put('/altro/elimunit',{
                 //data: JSON.stringify({
                     "unitamisura": u
                 //  })
            });
             console.log(res);
                if(res.data && res.data.categorie){//risposta corretta
                    const index =  uni.indexOf(u);
                    if (index > -1){
                        const a= Array.from(uni);
                        console.log(a.splice(index, 1));
                        setUni(a);
                    }
                }
         }catch(e){
             console.log(e);
         }
    }

    return <div>
    <div style={{ display: 'flex', 'flexDirection': 'row', flexWrap: 'wrap','justifyContent': 'center'}}>                
        <ul className="list-group" style={{color: '#282c34', padding: '5px'}}>
            <font color='#fff2e6'>categorie</font>
                {/*!vuota &&*/ cat.map((element) => {
                    let bor;
                    if(element==cat[0]){
                        bor='4px 4px 0px 0px';
                    }else{
                        bor='0px 0px 0px 0px';
                    }
                    return <li key={element} className="list-group-item" style={{backgroundColor: sfondo, 'borderRadius': bor}}>
                        {element}
                        <button type="button" className="btn btn-danger float-right" style={stile} onClick={()=>{elimcat(element)}}>
                            <IconContext.Provider value={{ size: '20px' }}>
                                <BsXCircleFill/>
                            </IconContext.Provider>
                        </button>
                    </li>
                })}
            <li className="list-group-item" style={{backgroundColor: sfondo}}>
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>{setQuale('categoria')}} style={{ 'height': '42px', 'width': '42px', 'alignContent': 'center', 'alignItems': 'center', 'verticalAlign': 'center'}}>
                    <FiPlus></FiPlus>
                </button>      
            </li>
        </ul>
        <ul className="list-group" style={{color: '#282c34', padding: '5px'}}>
        <font color='#fff2e6'>stagioni</font>
                {/*!vuota &&*/ sta.map((element) => {
                    let bor;
                    if(element==sta[0]){
                        bor='4px 4px 0px 0px';
                    }else{
                        bor='0px 0px 0px 0px';
                    }
                    return <li key={element} className="list-group-item" style={{backgroundColor: sfondo, 'borderRadius': bor}}>
                        {element}
                        <button type="button" className="btn btn-danger float-right" style={stile} onClick={()=>{elimsta(element)}}>
                            <IconContext.Provider value={{ size: '20px' }}>
                                <BsXCircleFill/>
                            </IconContext.Provider>
                        </button>
                    </li>
                })}
            <li className="list-group-item" style={{backgroundColor: sfondo}}>
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>{setQuale('stagione')}} style={{ 'height': '42px', 'width': '42px', 'alignContent': 'center', 'alignItems': 'center', 'verticalAlign': 'center'}}>
                    <FiPlus></FiPlus>
                </button>      
            </li>
        </ul>
        <ul className="list-group" style={{color: '#282c34', padding: '5px'}}>
        <font color='#fff2e6'>unità di misura</font>
                {/*!vuota &&*/ uni.map((element) => {
                    let bor;
                    if(element==uni[0]){
                        bor='4px 4px 0px 0px';
                    }else{
                        bor='0px 0px 0px 0px';
                    }
                    return <li key={element} className="list-group-item" style={{backgroundColor: sfondo, 'borderRadius': bor}}>
                        {element}
                        <button type="button" className="btn btn-danger float-right" style={stile} onClick={()=>{elimuni(element)}}>
                            <IconContext.Provider value={{ size: '20px' }}>
                                <BsXCircleFill/>
                            </IconContext.Provider>
                        </button>
                    </li>
                })}
            <li className="list-group-item" style={{backgroundColor: sfondo}}>
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>{setQuale('unità di misura')}} style={{ 'height': '42px', 'width': '42px', 'alignContent': 'center', 'alignItems': 'center', 'verticalAlign': 'center'}}>
                    <FiPlus></FiPlus>
                </button>      
            </li>
        </ul>
    </div>

    <div className="modal fade" style={{color:'#282c34'}} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: sfondo}}>
                    <h5 className="modal-title" id="exampleModalCenterTitle">Aggiungi {quale}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{backgroundColor: sfondo}}>
                <input type="text" id="nuo" className="form-control text-center" value={casella} onChange={aggiornacasella}></input>
                </div>
                <div className="modal-footer" style={{backgroundColor: sfondo, 'borderRadius': '0px 0px 4px 4px'}}>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{setCasella('')}}>annulla</button>
                    <button type="button" className="btn btn-primary" onClick={salvanuova}>salva</button>
                    <button type="button" id='chiudi' style={{display: 'none'}} className="btn btn-primary" data-dismiss='modal'></button>
                </div>
            </div>
        </div>
    </div>
</div>
};

export default Altro;

//se non c'è nulla solo +

//una modale una salva una elimina per tutti
//passa stato 'stagione' 'unità di misura' o 'categoria' e in base a quello fai cose diverse

//bordi arrotondati solo nel primo elemento!