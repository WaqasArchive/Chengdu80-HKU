import ApiService from "./Api";

const client = new ApiService({});

const api = {};

api.getReferencePrice = issuerDetails => client.post("/get_reference_price",issuerDetails);
api.addIPO = issuerDetails => client.post("/add_ipo",issuerDetails);

export default api;
