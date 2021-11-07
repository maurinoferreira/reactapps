import axios from 'axios';

//https://api.hgbrasil.com/weather?key=da0789e7&lat=-23.682&lon=-46.875

export const key = 'da0789e7';

const api = axios.create({
    baseUrl: 'https://api.hgbrasil.com'
});

export default api;