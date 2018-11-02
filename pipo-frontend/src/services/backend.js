import ApiService from "./Api";

const client = new ApiService({});

const api = {};

api.getNotes = () => client.get("/note");
api.signUpIssuer = issuerDetails => client.post("/referencePrice",issuerDetails);

export default api;
