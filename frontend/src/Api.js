import axios from "axios";
import Environment from "./Environment";

const API_BASE = Environment.API_BASE;

const Api = {
    general: {},
    user: {
        auth: async () => {
            return await axios.get(`${API_BASE}/users/auth`, Environment.HEADERS_CLIENTE).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        login: async ({email, password}) => {
            return await axios.post(`${API_BASE}/users/login`, {email, password}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        register: async ({data}) => {
            return await axios.post(`${API_BASE}/users/register`, {data}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        get: async (forceToken) => {
            let headers = (forceToken) ?  {headers:{CLOSETNOVO_CLIENTE_ACCESS_TOKEN : forceToken}} : Environment.HEADERS_CLIENTE;
            return await axios.get(`${API_BASE}/users/get`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
    },
    admin: {}
}

export default Api;