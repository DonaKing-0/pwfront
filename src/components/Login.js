import { useEffect, useState } from "react";

import axios from "../api/axios.js"

const sfondo='#fff2e6';

const stile={ color: '#d9534f', backgroundColor: "transparent", border: '0px', padding: '0px'}

const Altro = ({setlog}) => {

//cambia tutti da prodotto

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState('');

    const aggiornausername= (event)=>{
        setUsername(event.target.value);
    }
    const aggiornapass= (event)=>{
        setPass(event.target.value);
    }

    const controllo = async() => {
        //prova chiamare
        //risposta ok token -->salvalo e vai avanti
        //altrim errore
    try{
        const res= await axios.post('/al/adminlogin',{}, {
            auth: {
                username: username,
                password: pass
              }
        });
        console.log(res);
        if(res.data && res.data.token){//risposta corretta

            setPass('');
            setUsername('');
            setErr(false);
            setMsg('');

            sessionStorage.setItem('token', 'Bearer '+res.data.token)
            //console.log(sessionStorage.getItem('token'));

            setlog(false);
        }
    }catch(e){
        console.log(e);
            setMsg('Credenziali non valide');
            setErr(true);
    }
    }

const ov={
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    'backgroundColor': 'rgba(0,0,0,0.5)',
    'zIndex': 2,//?
    display:'flex',
    'justifyContent': 'center',
}

    const bgimg={ 
        backgroundImage: 'url(https://images2.alphacoders.com/108/1081121.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }

      /*
quando pigiato pulsante controlla
se risposta ok + token -->setta token
vai altra pagina --> come?
{true false} x tutti e 2? -->ma sicuro? si può abilitare da chrome?
      */

    return <div className="App-header" style={bgimg}>

        <div style={ov}>
    <div style={{ display: 'flex', 'flexDirection': 'row', flexWrap: 'wrap','justifyContent': 'center', color: '#282c34', alignContent: 'center', alignItems: 'center'}}>                

        <div className="card w-75" style={{backgroundColor: sfondo, flexDirection:'row', alignItems: 'center'}}>
        <img src="https://cutewallpaper.org/25/anime-wolf-wallpaper-galaxy-shadow/wolf-wallpapers.png" className="card-img-top align-middle" style={{ width: '30%', height: '30%' }}></img>

            <div className="card-body">
                <h5 className="card-title">Accedi</h5>
                {err && <font color='#b30000'>{msg}<br></br></font>}
                Username
                <input type="text" id="nom" className="form-control text-center" value={username} onChange={aggiornausername}></input>
                Password
                <input type="text" id="cog" className="form-control text-center" value={pass} onChange={aggiornapass}></input>
<br></br>
                <a className="btn btn-primary" onClick={controllo}>login</a>
            </div>
        </div>

    </div>

    </div>
</div>
};

export default Altro;