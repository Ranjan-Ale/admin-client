import axios from "axios";

const myAxios = axios.create({
	withCredentials: true
})

export default myAxios;