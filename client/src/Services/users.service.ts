import http from "../http-common";

class UsersDataService {
  getByEmail(email: string) {
    return http.get(`/get_user_by_email/${email}`);
  }
}

export default new UsersDataService();