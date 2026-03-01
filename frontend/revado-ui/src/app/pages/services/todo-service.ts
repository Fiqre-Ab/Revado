import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private url = 'http://localhost:8080/users';
  constructor(private http: HttpClient) {}
  /*Todo*/
  getTodos(uid: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${uid}/todos`);
  }
  createTodo(uid: number, todo: any) {
    return this.http.post(`${this.url}/${uid}/todos`, todo);
  }
  toggleTodo(uid: number, tid: number) {
    return this.http.patch(`${this.url}/${uid}/todos/${tid}/complete`, {});
  }
  deleteTodo(uid: number, tid: number) {
    return this.http.delete(`${this.url}/${uid}/todos/${tid}`);
  }
  /*subtask*/ 
  createSubtask(uid: number, tid: number, sub: any) {
    return this.http.post(`${this.url}/${uid}/todos/${tid}/subtasks`, sub);
  }
  toggleSubtask(uid: number, tid: number, sid: number) {
    return this.http.patch(`${this.url}/${uid}/todos/${tid}/subtasks/${sid}/complete`, {});
  }
  deleteSubtask(uid: number, todoId: number, subtaskId: number): Observable<any> {
    return this.http.delete(`${this.url}/${uid}/todos/${todoId}/subtasks/${subtaskId}`);
}
}