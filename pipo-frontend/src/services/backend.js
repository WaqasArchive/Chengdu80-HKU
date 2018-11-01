import ApiService from "./Api";

const client = new ApiService({});

const api = {};

api.getNotes = () => client.get("/note");
api.signUpIssuer = issuerDetails => client.post("https://webhook.site/e3502cb3-817d-4ec0-92b6-0ba1077da398",issuerDetails);

export default api;
