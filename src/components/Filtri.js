import { useEffect, useState } from "react";

import { BsFillCheckSquareFill, BsFillSquareFill, BsCheckLg} from "react-icons/bs";

const Listaprodotti = ({cercanome, cercafiltri, ordina, stag, cate, unit}) => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const [catsele, setCatsele] = useState('seleziona');
    const [stasele, setStasele] = useState('seleziona');
    const [unisele, setUnisele] = useState('seleziona');

    const [cerca, setCerca] = useState('');

    const [seldisp, setSeldisp] = useState(false);
    const [seloff, setSeloff] = useState(false);

    const [ordin, setOrdin] = useState('seleziona');

    const aggiornamin = (event) => {
        //togli gli 0 davanti e se <0 metti 0
        //se non numero =0
        event.target.value=event.target.value*1;
        console.log(typeof event.target.value)

        if(isNaN(event.target.value)){
            event.target.value=0;
            console.log("NON numero");
            setMax(0);
        }
        if(event.target.value<0){
            event.target.value=0;
        }
        event.target.value = +event.target.value;

        setMin(event.target.value);
        console.log(min);
    }

    const aggiornamax = (event) => {
        //togli gli 0 davanti e se <0 metti 0
        //se non numero =0
        event.target.value=event.target.value*1;
        console.log(typeof event.target.value)

        if(isNaN(event.target.value)){
            event.target.value=0;
            console.log("NON numero");
            setMin(0);
        }
        if(event.target.value<min){
            event.target.value=min;
        }
        event.target.value = +event.target.value;

        setMax(event.target.value);
        console.log(max);
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

    const aggiornacerca= (event)=>{
        setCerca(event.target.value);
    }

    const reset= ()=>{
        setSeldisp(false);
        setSeloff(false);
        setMax(0);//distingui se da cercare o no
        setMin(0);//se entrambi 0 no altim si
        setCatsele('seleziona');
        setStasele('seleziona');
        setUnisele('seleziona');
        setOrdin('seleziona');
    }

const chiamacercanome= ()=>{
    cercanome(cerca);
    setCerca('');
    setOrdin('seleziona')
    }

    const seldispo=()=>{
        console.log('prima')
        console.log(seldisp)
        if(seldisp==true){
            console.log('passa nel true')
            setSeldisp(false);
        }else{
            console.log('passa nel false')
            setSeldisp(true);
        }
    }

    const seloffe=()=>{
        console.log('prima')
        console.log(seloff)
        if(seloff==true){
            console.log('passa nel true')
            setSeloff(false);
        }else{
            console.log('passa nel false')
            setSeloff(true);
        }
    }

    const chiamacercafiltri=()=>{
        //p min p max -->min 0  -->max>min altrim =
// no ricerca x quantita!!!!
    const f={
        o: seloff,
        d: seldisp,
        mi: min*1,
        ma: max*1,
        c: catsele,
        s: stasele,
        u: unisele
    }
        cercafiltri(f);
        reset();
    }

const ordine = (ordine) => {
    //setodine
    setOrdin(ordine);
    //chiama l'altra
    ordina(ordine);
}


//quando clicco sul nero reset!!!!  --> ok fatto no!!!!! anche la card cancella

//ogni volta che c'è map controlla no [] altrim schermo bianco
///////////

    return (<div className="card card-body" style={{backgroundColor: '#282c34', borderColor: '#fff2e6'}}>
                    <div className="input-group">
                        <input className="form-control" style={{'borderRadius': '4px 4px 4px 4px', maxWidth:'500px'}} type="text" placeholder="cerca nome" aria-label="Search" onChange={aggiornacerca} value={cerca}></input>
                        <button className="btn btn-outline-success" style={{marginLeft: '5px'}} onClick={chiamacercanome}>Cerca</button>
                    </div>
                        <hr style={{backgroundColor: '#fff2e6'}}></hr>

                <div className="form-inline">
                    <div className="input-group mb-2">
                        <button type="button" className="btn btn-info" style={{ 'height': '42px', 'width': '42px'}} onClick={seloffe}>
                            {seloff && <BsFillCheckSquareFill />}
                            {!seloff && <BsFillSquareFill />}
                        </button>
                        <input className="form-control" readOnly style={{ maxWidth:'200px', backgroundColor: 'transparent', height: '42px', color:'white', border: 'none' }} type="text" value='offerta'></input>

                        <button type="button" className="btn btn-info" style={{ 'height': '42px', 'width': '42px'}} onClick={seldispo}>
                            {seldisp && <BsFillCheckSquareFill />}
                            {!seldisp && <BsFillSquareFill />}
                        </button>
                        <input className="form-control" readOnly style={{ maxWidth:'200px', backgroundColor: 'transparent', height: '42px', color:'white', border: 'none' }} type="text" value='disponibile'></input>
                    </div>
                    <div className="input-group mb-2" style={{maxWidth:'500px'}}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{backgroundColor:'transparent', border:'none', color:'white'}}>prezzo</span>
                            <span className="input-group-text" style={{borderRadius: '4px 0px 0px 4px'}}>min</span>
                        </div>
                        <input type="text" className="form-control" value={min} onChange={aggiornamin}></input>

                            <span className="input-group-text" style={{borderRadius: '0px 0px 0px 0px'}}>-</span>
                        <input type="text" className="form-control" value={max} onChange={aggiornamax}></input>
                        <div className="input-group-append">
                            <span className="input-group-text">max</span>
                        </div>
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text" style={{backgroundColor:'transparent', border:'none', color:'white'}}>stagione</span>
                        <div className="input-group-append">
                                <button className="btn btn-secondary dropdown-toggle" style={{borderRadius: '4px 4px 4px 4px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {stasele}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {/* dal db se vuote?   */
                                    stag.map((element) => {
                                        return <button key={element} className="dropdown-item" onClick={()=>{selezstag(element)}}>{element}</button>
                                    })
                                    }

                                </div>
                        </div>
                    </div>
                    <div className="input-group mb-2">
                        <span className="input-group-text" style={{backgroundColor:'transparent', border:'none', color:'white'}}>categoria</span>
                        <div className="input-group-append">
                                <button className="btn btn-secondary dropdown-toggle" style={{borderRadius: '4px 4px 4px 4px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {catsele}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {/* dal db se vuote?   */
                                    cate.map((element) => {
                                        return <button key={element} className="dropdown-item" onClick={()=>{selezcate(element)}}>{element}</button>
                                    })
                                    }

                                </div>
                        </div>
                    </div>
                    <div className="input-group mb-2">
                        <span className="input-group-text" style={{backgroundColor:'transparent', border:'none', color:'white'}}>unità di misura</span>
                        <div className="input-group-append">
                                <button className="btn btn-secondary dropdown-toggle" style={{borderRadius: '4px 4px 4px 4px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {unisele}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {/* dal db se vuote?   */
                                    unit.map((element) => {
                                        return <button key={element} className="dropdown-item" onClick={()=>{selezunit(element)}}>{element}</button>
                                    })
                                    }

                                </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-outline-success" style={{marginLeft: '5px'}} onClick={chiamacercafiltri}>Cerca</button>
                
                <hr style={{backgroundColor: '#fff2e6'}}></hr>
                <div className="input-group">
                        <span className="input-group-text" style={{backgroundColor:'transparent', border:'none', color:'white'}}>ordine</span>
                        <div className="input-group-append">
                                <button className="btn btn-secondary dropdown-toggle" style={{borderRadius: '4px 4px 4px 4px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {ordin}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" onClick={()=>{ordine('a-z')}}>a-z</button>
                                    <button className="dropdown-item" onClick={()=>{ordine('z-a')}}>z-a</button>
                                    <button className="dropdown-item" onClick={()=>{ordine('crescente')}}>prezzo crescente</button>
                                    <button className="dropdown-item" onClick={()=>{ordine('decrescente')}}>prezzo decrescente</button>
                                </div>
                        </div>
                    </div>
            </div>
    )
};

export default Listaprodotti;
