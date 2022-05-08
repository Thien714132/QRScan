import request from "../configs/Fetch";

export const login = (data: any) =>
  request.post("/api/user/login", data, "POST", null);

export const getUser = (token: string, id: string) =>
  request.get(`/api/user/${id}`, {}, token);
