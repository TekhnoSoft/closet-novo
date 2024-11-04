class StatusResponse {
    static isOk () {
        return 200;
    }
    static isError () {
        return 400;
    }
}

export default StatusResponse;