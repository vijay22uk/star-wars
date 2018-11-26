class APICaller {
    apiRequest(options) {
        let { url, method, data, headers } = options;
        let newHeaders = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, headers);
        return fetch(url, { method: method || "GET", headers: newHeaders, body: data });
    }
    
}
export default new APICaller();