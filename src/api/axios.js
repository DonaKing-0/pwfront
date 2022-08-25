import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
        baseURL: "https://pwback.herokuapp.com",
        headers: {
          //'Authorization': sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
          }
        //headers['Content-Type']= "application/json";

});

export default instance;