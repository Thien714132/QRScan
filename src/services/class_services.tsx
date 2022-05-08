import request from "../configs/Fetch";

export const getAllClasses = (token: string) =>
  request.get("/api/courses", {}, token);

export const getStudentClass = (id: string) =>
  request.get(`/api/courses/student/${id}`, {}, null);

export const getTeacherClass = (id: string) =>
  request.get(`/api/courses/teacher/${id}`, {}, null);

export const getLessonByCourse = (token: string, id: any) =>
  request.get(`/api/lesson/course/${id}`, {}, token);

export const getLessonDetail = (token: string, id: any) =>
  request.get(`/api/lesson/${id}`, {}, token);

export const createQRCode = (id: any, data: any) =>
  request.post(`/api/lesson/${id}/qrcode`, data, "POST", null);

export const getHistory = (token: string, id: any) =>
  request.get(`/api/history/lesson/${id}`, {}, token);

export const createHistory = (data: any) =>
  request.post("/api/history", data, "POST", null);

export const getCourseStatistic = (token: string, id: any) =>
  request.get(`/api/courses/${id}/statistic`, {}, token);

export const getHistoryByStudent = (token: string, id: any) =>
  request.get(`/api/history/student/${id}`, {}, token);

export const getClassDetail = (token: string, id: any) =>
  request.get(`/api/courses/${id}`, {}, token);
