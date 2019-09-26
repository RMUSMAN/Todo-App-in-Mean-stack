import { Component, OnInit } from '@angular/core';
import {ListService } from '../services/list-service.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 id:any= '';
  form: FormGroup;
  editForm: FormGroup;
  todoForm: FormGroup;
  todoEditForm: FormGroup;
  submitted = false;
  edit=false;
  todoEdit= false;
  showTodos=false;
  ListId:any='';
  TodoId:any='';
  Lists: any= [];
  Todos:any=[];
  new:any='';
  setClickedRow : Function;
  constructor(public list:ListService,
    public router: Router,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute
  ) {

    this.setClickedRow = function(index){
      this.selectedRow = index;
  }
   }

  
  ngOnInit() {
    this.form = this.formBuilder.group({
    name: ['', Validators.required],
  });
  this.editForm = this.formBuilder.group({
    name: ['', Validators.required],
  });
  this.todoForm = this.formBuilder.group({
    title: ['', Validators.required],
    dueDate: ['', Validators.required],

  });
  this.todoEditForm = this.formBuilder.group({
    title: ['', Validators.required],
   

  });
    this.loadList();
  
  }
  get f() { return this.form.controls; }
  get fNew() { return this.editForm.controls; }
  get t() { return this.todoForm.controls; }
  get TodoEdit() { return this.todoForm.controls; }
  loadList(){
    return this.list.getLists().subscribe(data=>this.Lists=data);
}
addList(){

  this.submitted = true;
  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }
   return this.list.createList(this.form.value).subscribe(data=> {
    this.loadList(),
    this.form.setValue({
      name: ''
    });

  });
}

editList(id, name){
 // alert('SUCCESS!! :-)\n\n' + JSON.stringify(name));
  //this.list.getList(this.id).subscribe(data=>this.listData = data);

  this.editForm.setValue({
    name: name
  });
  this.id=id;
 this.edit=true;

}


updateList(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.editForm.invalid) {
      return;
  }
  this.list.updateList(this.id, this.editForm.value).subscribe(data=>
    {
      this.loadList(),
      this.edit=false,
      this.editForm.setValue({
        name: ''
      });

    })
    
  
}
 // if(window.confirm('Are u sure you want to update ')){
 // this.list.updateList(id, this.listData).subscribe(data=>this.router.navigate(['/list-profile']));


delete(listId){
   this.list.DeleteList(listId).subscribe(data=>this.loadList());
}

todosOfList(id){
  this.ListId=id;
  return this.list.getTodos(id).subscribe(data=>{
    this.Todos=data;
    this.showTodos=true;
  
  });

}
addTodo(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.todoForm.invalid) {
      return;
  }
  
this.new = this.todoForm.value.dueDate.year + '-' + this.todoForm.value.dueDate.month + '-' + this.todoForm.value.dueDate.day;
 
  this.todoForm.setValue({
    title: this.todoForm.value.title,
    dueDate: this.new
  });
   return this.list.createTodo(this.ListId, this.todoForm.value).subscribe(data=> {
    this.todosOfList(this.ListId),
     this.todoForm.setValue({
       title: '',
       dueDate:''
     });

   });
}

editTodo(id, title){

  this.todoEditForm.setValue({
    title: title,
  });
  this.TodoId=id;
  this.todoEdit= true;
}
updateTodo(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.todoEditForm.invalid) {
      return;
  }
  this.list.updateTodo(this.TodoId, this.todoEditForm.value).subscribe(data=>
    {
      this.todosOfList(this.ListId),
      this.todoEdit=false,
      this.todoEditForm.setValue({
        title: ''
      });

    })

}

deleteTodo(todoId){
  this.list.DeleteTodo(todoId).subscribe(data=>this.todosOfList(this.ListId));
}

markTodo(id, marked){
  var mark={
    "marked":!marked
  }
  this.list.markTodo(id, mark).subscribe(data=>this.todosOfList(this.ListId));


}

}
