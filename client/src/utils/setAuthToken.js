import axios from 'axios';

const setAuthToken = (token)=>{
    //If token exist, include it to the headers sent from now onwards
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    //Else, delete any details of the token in the headers
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;