import { useState } from "react";

import axios from "../api/axios.js"

import { BsFillPencilFill, BsXCircleFill, BsFillCheckSquareFill, BsFillSquareFill, BsCheckLg} from "react-icons/bs";

const sfondo='#fff2e6';

const stile={ color: '#5bc0de', backgroundColor: "transparent", border: '0px', padding: '0px'}

const Ordinazione = ({ element }) => {
//cambia tutti da prodotto


    const [pronto, setPronto] = useState(element.pronto ? element.pronto : false);
    const [ritirato, setRitirato] = useState(element.ritirato ? element.ritirato : false);//dati veri

//default altrimenti se ci sono usa altre
//element.color ? element.color : /*element.color*/'#282c34'

    const ritir= async()=>{
        console.log('prima')
        console.log(ritirato)
        if(ritirato==true){
            console.log('passa nel true')
            try{
                const res= await axios.put('/prenotaz/ritir/'+element._id,{
                     //data: JSON.stringify({
                         "ritirato": false
                     //  })
                });
                 console.log(res);
                    if(res.data.ritirato!=undefined){//risposta corretta
                        setRitirato(false);
                        console.log(ritirato);
                    }
             }catch(e){
                 console.log(e);
             }

        }else{
            console.log('passa nel false')
            try{
                const res= await axios.put('/prenotaz/ritir/'+element._id,{
                     //data: JSON.stringify({
                         "ritirato": true
                     //  })
                });
                 console.log(res);
                    if(res.data.ritirato!=undefined){//risposta corretta
                        //se sono false cosi non va
                        setRitirato(true);
                        console.log(ritirato);
                    }
             }catch(e){
                 console.log(e);
             }
        }
    }

    const pront= async()=>{
        console.log('prima')
        console.log(pronto)
        if(pronto==true){
            console.log('passa nel true')
            try{
                const res= await axios.put('/prenotaz/pronto/'+element._id,{
                     //data: JSON.stringify({
                         "pronto": false
                     //  })
                });
                 console.log(res);
                    if(res.data.ritirato!=undefined){//risposta corretta
                        setPronto(false);
                        console.log(pronto);
                    }
             }catch(e){
                 console.log(e);
             } 

        }else{
            console.log('passa nel false')
            try{
                const res= await axios.put('/prenotaz/pronto/'+element._id,{
                     //data: JSON.stringify({
                         "pronto": true
                     //  })
                });
                 console.log(res);
                    if(res.data.ritirato!=undefined){//risposta corretta
                        setPronto(true);
                        console.log(pronto);
                    }
             }catch(e){
                 console.log(e);
             } 
        }
    }

    return <tr>                

                <td>
                    <button type="button" className="btn btn-info" style={stile} onClick={pront}>
                        {pronto && <BsFillCheckSquareFill />}
                        {!pronto && <BsFillSquareFill />}

                    </button>
                </td>
                

                <td>
                    <button type="button" className="btn btn-info" style={stile} onClick={ritir}>
                        {ritirato && <BsFillCheckSquareFill />}
                        {!ritirato && <BsFillSquareFill />}
                    </button>
                </td>
                {/*<td>{element._id}</td>*/}
                <td>{element.username}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            vedi
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <font class="dropdown-item disabled">nome - quantità </font>
                            {
                            element.lista.map((elem) => {
                                const testo=elem.nome+ ' - '+ elem.quantita;
                                return <font class="dropdown-item disabled">{testo} </font>
                            })}
                        </div>

                    </div>
                </td>
        </tr>
};

export default Ordinazione;
