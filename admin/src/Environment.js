const DEV_MODE = true;

const Environment = {
    API_BASE: DEV_MODE ? "http://localhost:3001" : "http://localhost:3001",
    API_IMAGES: DEV_MODE ? "https://closet-novo-images-api.7richv.easypanel.host" : "https://closet-novo-images-api.7richv.easypanel.host",
}

export default Environment;