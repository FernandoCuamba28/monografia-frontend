import axios from 'axios';
const http = axios.create({
    baseURL:'http://localhost/AtendimentoConnect/public/api',
    // baseURL:'https://atendimentoplus.herokuapp.com/api/'
    // baseURL:'  https://controle-de-horas.herokuapp.com/api'
     
});
export default http;


