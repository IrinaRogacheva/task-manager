import { Tag } from "../entries";
import http from "../http-common";

class TagsDataService {
  getTags(idUser: number) {
    return http.get(`/get_tags/${idUser}`);
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

  addUserInTag(idUser: number, idTag: number) {
    return http.post("/add_user_in_tag", {id_user: idUser, id_tag: idTag});
  }

  deleteTag(idTag: number) {
    return http.delete(`/delete_tag/${idTag}`);
  }

  updateTag(updatedTag: Tag) {
    return http.put(`/update_tag`, updatedTag);
  }
}

export default new TagsDataService();