import { fetchFesta, fetchFestaDetail } from "./src/FetchFesta/module.js";

fetchFesta().then(console.log);
fetchFestaDetail(5703).then(console.log);