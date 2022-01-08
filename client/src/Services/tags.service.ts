import { Tag } from "../entries";
import http from "../http-common";

class TagsDataService {
  getTags() {
    return http.get('/get_tags');
  }

  getById(id: number) {
    return http.get(`/get_tag/${id}`);
  }

  getCountOfTasks(id: number) {
    return http.get(`/get_count_of_tasks_in_tag/${id}`);
  }

  addTag(tag: Tag) {
    return http.post("/add_tag", tag);
  }
}

export default new TagsDataService();