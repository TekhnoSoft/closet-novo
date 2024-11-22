import axios from "axios";
import Environment from "./Environment";

const API_BASE = Environment.API_BASE;

const Api = {
    general: {
        homeviews: async () => {
            return await axios.get(`${API_BASE}/homeviews/get`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        categories: async () => {
            return await axios.get(`${API_BASE}/categories/get`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        brands: async () => {
            return await axios.get(`${API_BASE}/brands/get`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        calcularFrete: async ({ cep, ids_product }) => {
            return await axios.post(`${API_BASE}/frete/calcular-preco`, { cep, ids_product }).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        product: async ({ id }) => {
            return await axios.get(`${API_BASE}/product/get/${id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        productsByCategory: async ({ category_id, product_id }) => {
            return await axios.get(`${API_BASE}/product/find-by-category/${category_id}/${product_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        productsSearch: async ({ data }) => {
            return await axios.post(`${API_BASE}/product/search`, { data }).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        productPriceRange: async () => {
            return await axios.get(`${API_BASE}/product/price-range`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        }
    },
    user: {
        auth: async () => {
            return await axios.get(`${API_BASE}/users/auth`, Environment.HEADERS_CLIENTE).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        login: async ({ email, password }) => {
            return await axios.post(`${API_BASE}/users/login`, { email, password }).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        register: async ({ data }) => {
            return await axios.post(`${API_BASE}/users/register`, { data }).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        get: async (forceToken) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.get(`${API_BASE}/users/get`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        favotires: async (forceToken) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.get(`${API_BASE}/favorite/get`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        favoriteThis: async ({ forceToken, product_id }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.post(`${API_BASE}/favorite/this`, { product_id }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        changePassword: async ({ forceToken, oldPassword, newPassword }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.post(`${API_BASE}/users/change-password`, { oldPassword, newPassword }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        myProducts: async ({ forceToken }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.get(`${API_BASE}/product/my-products`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        deleteMyProduct: async ({ forceToken, id }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.delete(`${API_BASE}/product/delete-my-products/${id}`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        myAddresses: async ({ forceToken }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.get(`${API_BASE}/users/my-addresses`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        deleteMyAddress: async ({ forceToken, id }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.delete(`${API_BASE}/users/delete-my-address/${id}`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        addAddress: async ({ forceToken, data }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.post(`${API_BASE}/users/address/add`, { data }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        updateAddress: async ({ forceToken, data }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.put(`${API_BASE}/users/address/update`, { data }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        switchAddress: async ({ forceToken, id }) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.post(`${API_BASE}/users/switch-address`, { addressId: id }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        uploadFile: async ({ forceToken, file }) => {
            const formData = new FormData();
            formData.append('file', file);
            return await axios.post(`${Environment.API_IMAGES}/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'api-key': 'F4692B6D6D44EF8B6AAF3DB6B59C9',
                    'token': forceToken,
                },
            }).catch(err => {
                return err;
            });
        },
        getFile: async ({forceToken, id}) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.get(`${API_BASE}/files/${id}`, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        addProduct: async ({forceToken, data}) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.post(`${API_BASE}/product/add`, { data }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        updateProduct: async ({forceToken, data}) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            console.log(data)
            return await axios.put(`${API_BASE}/product/update`, { data }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        addSpecificProduct: async ({forceToken, data}) => {
            let headers = (forceToken) ? { headers: { CLOSETNOVO_CLIENTE_ACCESS_TOKEN: forceToken } } : Environment.HEADERS_CLIENTE;
            return await axios.post(`${API_BASE}/product/specific-product/add`, { data }, headers).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
    },
    admin: {}
}

export default Api;