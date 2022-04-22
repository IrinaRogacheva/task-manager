import http from "../http-common";

class UsersDataService {
  getByEmail(email: string) {
    return http.get(`/get_user_by_email/${email}`);
  }

  registerUser(email: string, password: string) {
    return http.post("/register", {email, password});
  }

  checkPassword(idUser: number, password: string) {
    return http.post(`/check_password/${idUser}`, {password});
  }

  loginUser(email: string, password: string) {
    return http.post("/login", {email, password}, {withCredentials: true});
  }

  checkIsLoggedIn() {
    return http.get("/login", {withCredentials: true});
  }

  changeEmail(idUser: number, email: string) {
    return http.put(`/change_email/${idUser}`, {email});
  }
}

export default new UsersDataService();