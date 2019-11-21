import axios from "axios";

const api = axios.create({
    
    baseURL: "https://postwit-api-web2.herokuapp.com/posts/feed/"
});



export default api;