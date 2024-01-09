import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;
     education: string[]=[
      "Matric",
      "Diploma",
      "Intermediate",
      "Graduate",
      "Post Graduate",

     ];

     constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef:MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
      this.empForm = this._fb.group({
        firstName:'',
        lastName:'',
        email:'',
        dob:'',
        gender:'',
        education:'',
        company:'',
        package:'',
       experience:'',
        action:'',


      });
     }
     ngOnInit(): void {
         this.empForm.patchValue(this.data);
     }
     OnFormSubmit(){
       if(this.empForm.valid){
        if(this.data){ 
          this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val : any)=>{
            alert("employee details updated")
             this._dialogRef.close(true);
          },
          error:( err:any) =>{
            console.log(err)
          }
        });
     }
         
         else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val : any)=>{
            alert("employee added sucessfully")
             this._dialogRef.close(true);
          },
          error:( err:any) =>{
            console.error(err)
          }
        
        });

       // console.log(this.empForm.value)
       }
     }
     }}
