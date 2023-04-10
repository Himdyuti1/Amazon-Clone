import axios from "axios";

const instance=axios.create({
    baseURL:'https://amazon-clone-api-7r6f.onrender.com'
});

export default instance;