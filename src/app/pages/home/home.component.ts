import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import {  NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Form: FormGroup
  displayData = []

  // ngmodal
  closeResult = '';
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) { 
    this.Form = this.fb.group({
      status: [''],
      phase: [''],
      month: [''],
    })
    this.displayData = [... this.DataList]
// console.log(this.Form.value(status));
}
  

  ngOnInit(): void {
  }
  //openmodal
  open(content) {
    this.modalService.open(content, { size: 'lg' ,ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  DataList:any = [
    {id:1,status:'Active', supplierName:'Jakub Zavazal', month:'March', phase:'Deployment', internalOrder:'1223341', amount:5121},
    {id:2,status:'Active', supplierName:'Jonathan Holden', month:'April', phase:'Research', internalOrder:'24565334', amount:5121},
    {id:3,status:'Pending Approval', supplierName:'Miguel Zavala', month:'March', phase:'Deployment', internalOrder:'234567', amount:4430},
    {id:4,status:'Pending Approval', supplierName:'Vlad Titus Tudor', month:'February', phase:'Development', internalOrder:'2334567', amount:3320},
    {id:5,status:'Waiting Compensation', supplierName:'Aleksey Romanyuk', month:'February', phase:'Development', internalOrder:'2334987', amount:5120},
    {id:6,status:'Waiting Compensation', supplierName:'Carlos Francisco Rosas Ceballos', month:'April', phase:'Research', internalOrder:'2356780', amount:5300},
  ]
  totalSum(index: number){
    let sum = 0
    for (let i = 0; i < this.displayData.length; i++) {
         sum += this.DataList[i].amount
    }
    return  sum
  }
  // onSearch(value:string){
  //   console.log(value);
  //   let name = this.DataList.supplierName
  //   if (name.indexOf(value) !== -1) {
      
  //   this.displayData = this.DataList.filter(data => data.name === value )

  //     console.log(this.displayData);
  //     }
  // }


  filter(phase){
    this.displayData = this.DataList.filter(data => data.phase === phase )
    // console.log(this.displayData);
  }

  onSearch(value:string){
    console.log(value);
   let texto = value.toLowerCase()
   for(let data of this.DataList){
     let name = data.supplierName.toLowerCase()
     if(name.indexOf(texto) != -1){
       console.log(name);
      //  this.displayData = this.DataList.filter(data => data.supplierName === name)

     }
   }
  //  console.log(this.DataList.supplierName);
  }
}
