import myAxios from "../utils/http";
import api from "../utils/api"

export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; token: string}> => {
	const response = await myAxios.post(api.login, {
		email,
		password
	});

	return response.data;
}

export const setToken = (token: string) => {
	localStorage.setItem("token", token);
}

export const removeToken = () => {
	localStorage.removeItem("token");
}

export const getToken = () => localStorage.getItem('token');