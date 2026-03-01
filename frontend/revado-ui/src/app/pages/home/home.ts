import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo-service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CheckboxModule,ButtonModule, CheckboxModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  greeting: string = 'Revado';
  todos: any[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  userId: number = 0;

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.userId = this.getUserIdFromToken();
    this.loadTodos();
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    try {
      const payloadPart = token.split('.')[1];
      const payload = JSON.parse(atob(payloadPart));
      return Number(payload.sub) || 0; 
    } catch {
      return 0;
    }
  }

  loadTodos() {
    this.todoService.getTodos(this.userId).subscribe(data => {
      this.todos = data;
      this.cdr.detectChanges(); 
    });
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;

    this.todoService
      .createTodo(this.userId, {
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        completed: false
      })
      .subscribe(() => {
        this.newTodoTitle = '';
        this.newTodoDescription = '';
        this.loadTodos();
      });
  }

  toggleTodo(todoId: number) {
    this.todoService.toggleTodo(this.userId, todoId).subscribe(() => this.loadTodos());
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(this.userId, todoId).subscribe(() => this.loadTodos());
  }

  addSubtask(todoId: number, title: string) {
    if (!title.trim()) return;
    this.todoService
      .createSubtask(this.userId, todoId, { title, completed: false })
      .subscribe(() => this.loadTodos());
  }

  toggleSubtask(todoId: number, subtaskId: number) {
    this.todoService.toggleSubtask(this.userId, todoId, subtaskId).subscribe(() => this.loadTodos());
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
deleteSubtask(todoId: number, subtaskId: number) {
  if (confirm("delete this subtask?")) {
    this.todoService.deleteSubtask(this.userId, todoId, subtaskId).subscribe({
      next: () => this.loadTodos(),
      error: (err) => console.error("not delete subtask", err)
    });
  }
}
}