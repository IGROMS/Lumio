import createHttp from "./BaseService";

const http = createHttp(false)

export const login = (data) => http.post("/login", data)