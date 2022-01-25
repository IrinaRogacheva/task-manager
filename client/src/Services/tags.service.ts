import { Tag } from "../entries";
import http from "../http-common";

class TagsDataService {
  getTags() {
    return http.get('/get_tags');
  }

  getById(id: number) {
    return http.get(`/get_tag/${id}`);
  }

  getTagNameById(id: number) {
    return http.get(`/get_tag_name/${id}`);
  }

  getCountOfTasks(id: number) {
    return http.get(`/get_count_of_tasks_in_tag/${id}`);
  }

  addTag(tag: Tag) {
    return http.post("/add_tag", tag);
  }

  deleteTag(idTag: number) {
    return http.delete(`/delete_tag/${idTag}`);
  }

  updateTag(updatedTag: Tag) {
    return http.put(`/update_tag`, updatedTag);
  }
}

export default new TagsDataService();