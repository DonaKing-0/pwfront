import axios from "./axios.js"

/*
axios.get('/user', {
    params: {
      ID: 12345
    }
  })

  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
*/


///
///togli!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///
sessionStorage.setItem('token', process.env.REACT_APP_BEARER)
console.log(sessionStorage.getItem('token'));

const getProdotti= async ()=>{
    
    try{
        const {data: list}= await axios.get('/prodotti');
        return list;
    }catch(e){
        console.log(e);
        return [];
    }
}

const getUtenti= async ()=>{
    try{
       const {data: list}= await axios.get('/users');
        return list;
    }catch(e){
        console.log(e);
        return [];
    }
}

const getAltro= async ()=>{
    try{
       const {data: list}= await axios.get('/altro/uno');
        return list;
    }catch(e){
        console.log(e);
        return [];
    }
}

const getOrdinazioni= async ()=>{
    try{
       const {data: list}= await axios.get('/prenotaz');
        return list;
    }catch(e){
        console.log(e);
        return [];
    }
}

export  {
    getProdotti, 
    getUtenti,
    getAltro,
    getOrdinazioni
};


/*
setItem(key, value): memorizza la coppia key/value.
getItem(key): lettura del valore dalla key.
removeItem(key): rimuove la key, ed il relativo value.
clear(): ri

// imposta un nuovo valore
localStorage.test = 2;

// legge il valore
alert( localStorage.test ); // 2

// rimuove il valore
delete localStorage.test;
*/