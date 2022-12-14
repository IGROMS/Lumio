import createHttp from './BaseService';


const http = createHttp(true)

export const createContract = (body) => http.post('/contracts', body);

export const getContracts = (userId) => http.get('/contracts', userId);

export const getPanelContracts = (userId) => http.get('/panelContracts', userId)

export const getContract = (id) => http.get(`/contracts/${id}`)