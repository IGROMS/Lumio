import createHttp from './BaseService';

const http = createHttp(true)

export const createTicket = (body) => http.post('/tickets', body);
export const getTickets = () => http.get('/tickets');
export const buyTicket = (ticketId, body) => http.post(`/tickets/buy/${ticketId}`, body);
export const getAllTickets = () => http.get('/tickets/all')