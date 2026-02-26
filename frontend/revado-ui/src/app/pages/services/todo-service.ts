  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private baseUrl = 'http://localhost:8080/users';
  constructor(private http: HttpClient) {}

  /*TodoTask*/
  getTodos(userId: number): Observable<any[]> {
    /*this will be match with back end spring boot @GetMapping("/users/{userId}/todos") */
    return this.http.get<any[]>(`${this.baseUrl}/${userId}/todos`);
  }
  /*createTodo*/
  createTodo(userId: number, todo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/todos`, todo);
  }
  /*update the todo*/  
  toggleTodo(userId: number, todoId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}/todos/${todoId}/complete`, {});
  }

  /*toggle a subtask completion*/
  toggleSubtask(userId: number, todoId: number, subtaskId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}/todos/${todoId}/subtasks/${subtaskId}/complete`, {});
  }
  /*this will delete a todo*/
  deleteTodo(userId: number, todoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/todos/${todoId}`);
  }
  
  /*TodoCreate subtask*/
  createSubtask(userId: number, todoId: number, subtask: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/todos/${todoId}/subtasks`, subtask);
  }
}
