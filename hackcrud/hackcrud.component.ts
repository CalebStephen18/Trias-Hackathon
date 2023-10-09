import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hackcrud',
  templateUrl: './hackcrud.component.html',
  styleUrls: ['./hackcrud.component.scss']
})
export class HackcrudComponent {
  TaskArray : any[] = [];
  isResultLoaded = false;     
  isUpdateFormActive = false;

  task: string ="";
  date: string = "";
  currentTaskID = "";


  constructor(private http: HttpClient ) 
  {
    this.getAllTasks();
    this.currentTaskID = "";
  }

  ngOnInit(): void {
  }

  getAllTasks()
  { 
    this.http.get("http://localhost:8080/api/task/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.TaskArray = resultData.data;
    });
  }

  register()
  {
    let bodyData = {
      "task" : this.task,
      "date" : this.date,
    };

    this.http.post("http://localhost:8080/api/task/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task added successfully")
        this.getAllTasks();
    });

    this.task = "";
    this.date = "";
    this.currentTaskID = "";
  }

  setUpdate(data: any) 
  {
   this.task = data.task;
   this.date = data.date;
   this.currentTaskID = data.id;
  }

  UpdateRecords()
  {
    let bodyData = 
    {
      "task" : this.task,
      "date" : this.date,
    };
    
    this.http.put("http://localhost:8080/api/task/update/" + this.currentTaskID, bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task Updated")
        this.getAllTasks();
      
    });
    this.task = "";
    this.date = "";
    this.currentTaskID = "";
  }
 
  save()
  {
    if(this.currentTaskID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }


  setDelete(data: any)
  {
    this.http.delete("http://localhost:8080/api/task/delete/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task Deleted")
        this.getAllTasks();
    });
  }

}