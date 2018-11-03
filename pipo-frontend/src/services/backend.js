import ApiService from "./Api";

const client = new ApiService({});

const api = {};

api.getReferencePrice = issuerDetails => client.post("/get_reference_price",issuerDetails);
api.addIPO = issuerDetails => client.post("/add_ipo",issuerDetails);
api.getAllIPOs = () => client.get("/ipos");
api.addBid = (bidDetails) => client.post("/add_bid",bidDetails);
api.getInvestorBids = (investorId) => client.get(`/get_bids_investor?investor_id=${investorId}`);

export default api;
