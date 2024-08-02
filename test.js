import { fetchFesta, fetchFestaDetail } from "./FetchFesta/module.js";

fetchFesta().then(console.log);
fetchFestaDetail(5703).then(console.log);