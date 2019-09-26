import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { List } from '../models/List';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  apiUrl = 'http://127.0.0.1:3000/list/';
  apiUrltodo = 'http://127.0.0.1:3000/todo/';
  apitodo = 'http://127.0.0.1:3000/todo/mark/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }

  constructor(private http: HttpClient) { }

  getLists(): Observable<List> {
    return this.http.get<List>(this.apiUrl, this.httpOptions);
  }

  createList(list): Observable<List> {

    return this.http.post<List>(this.apiUrl, JSON.stringify(list), this.httpOptions);
  }

  getList(id): Observable<List> {

    return this.http.get<List>(this.apiUrl + id, this.httpOptions);
  }

  updateList(id, list): Observable<List> {

    return this.http.patch<List>(this.apiUrl + id, JSON.stringify(list), this.httpOptions);
  }

  DeleteList(id) {

    return this.http.delete<List>(this.apiUrl + id, this.httpOptions);
  }

  getTodos(id): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrltodo + id, this.httpOptions);
  }
  createTodo(id, todo): Observable<Todo> {

    return this.http.post<Todo>(this.apiUrltodo + id, JSON.stringify(todo), this.httpOptions);
  }
  updateTodo(id, Todo): Observable<Todo> {

    return this.http.patch<Todo>(this.apiUrltodo + id, JSON.stringify(Todo), this.httpOptions);
  }

  DeleteTodo(id) {

    return this.http.delete<Todo>(this.apiUrltodo + id, this.httpOptions);
  }
 markTodo(id, marked) {

    return this.http.patch<Todo>(this.apitodo + id, JSON.stringify(marked), this.httpOptions);
  }


}
