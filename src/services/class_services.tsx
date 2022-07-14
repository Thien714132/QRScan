import request from "../configs/Fetch";

export const getAllClasses = (token: string) =>
  request.get("/api/courses", {}, token);

export const getStudentClass = (token: string, id: string) =>
  request.get(`/api/courses/student/${id}`, {}, token);

export const getTeacherClass = (token: string, id: string) =>
  request.get(`/api/courses/teacher/${id}`, {}, token);

export const getLessonByCourse = (token: string, id: any) =>
  request.get(`/api/lesson/course/${id}`, {}, token);

export const getLessonDetail = (token: string, id: any) =>
  request.get(`/api/lesson/${id}`, {}, token);

export const createQRCode = (token: string, id: any, data: any) =>
  request.post(`/api/lesson/${id}/qrcode`, data, "POST", token);

export const getHistory = (token: string, id: any) =>
  request.get(`/api/history/lesson/${id}`, {}, token);

export const createHistory = (token: string, data: any) =>
  request.post("/api/history", data, "POST", token);

export const getCourseStatistic = (token: string, id: any) =>
  request.get(`/api/courses/${id}/statistic`, {}, token);

export const getHistoryByStudent = (token: string, id: any) =>
  request.get(`/api/history/student/${id}`, {}, token);

export const getClassDetail = (token: string, id: any) =>
  request.get(`/api/courses/${id}`, {}, token);

export const getHistoryByTeacher = (token: string, id: any) =>
  request.get(`/api/history/teacher/${id}`, {}, token);

export const chengePassword = (token: string, id: any, data: any) =>
  request.put(`/api/user/password/${id}`, data, token);

export const changeInfor = (token: string, id: any, data: any) =>
  request.put(`/api/user/${id}`, data, token);

export const addLesson = (token: string, data: any) =>
  request.post(`/api/lesson`, data, "POST", token);

export const deleteLesson = (token: string, id: any) =>
  request.delete(`/api/lesson/${id}`, {}, token);
