import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Todo} from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'http://127.0.0.1:8000/todo';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
           
    })
  }

  constructor(private http: HttpClient) { }
 
  getTodos(): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl, this.httpOptions);
  }

  createTodo(Todo):Observable<Todo>{

    return this.http.post<Todo>(this.apiUrl, JSON.stringify(Todo), this.httpOptions);
  }
  
  getTodo(id):Observable<Todo>{
  
    return this.http.get<Todo>(this.apiUrl + id, this.httpOptions);
  }
  
  updateTodo(id, Todo):Observable<Todo>{
  
    return this.http.put<Todo>(this.apiUrl + id, JSON.stringify(Todo) , this.httpOptions);
  }
  
  DeleteProfile(id){
  
    return this.http.delete<Todo>(this.apiUrl + id, this.httpOptions);
  }


  
}
