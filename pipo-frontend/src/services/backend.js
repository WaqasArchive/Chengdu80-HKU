import ApiService from "./Api";

const client = new ApiService({});

const api = {};

api.getNotes = () => client.get("/note");

export default api;
