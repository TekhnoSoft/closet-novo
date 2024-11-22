const DEVELOPMENT_MODE = false;

const Environment = {
    API_BASE: (DEVELOPMENT_MODE) ? "http://localhost:3001" : "https://closet-novo-backend.7richv.easypanel.host",
    API_IMAGES: (DEVELOPMENT_MODE) ? "http://localhost:3002" : "https://closet-novo-images-api.7richv.easypanel.host",
    HEADERS_CLIENTE: { 
        headers: { 
            CLOSETNOVO_CLIENTE_ACCESS_TOKEN : localStorage.getItem("closetnovo_cliente_token")
        } 
    },
    HEADERS_PARCEIRO: { 
        headers: { 
            CLOSETNOVO_PARCEIRO_ACCESS_TOKEN : localStorage.getItem("closetnovo_parceiro_token")
        } 
    }
}

export default Environment;