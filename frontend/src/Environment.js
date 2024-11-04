const DEVELOPMENT_MODE = true;

const Environment = {
    API_BASE: (DEVELOPMENT_MODE) ? "http://localhost:3001" : "http://localhost:3001",
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