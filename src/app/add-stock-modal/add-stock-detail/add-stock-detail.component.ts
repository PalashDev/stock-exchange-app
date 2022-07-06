import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { company } from 'src/app/Models/company';
import { AppToastService } from 'src/app/services/app-toast.service';
import {PostService} from 'src/app/services/post.service'

@Component({
  selector: 'app-add-stock-detail',
  templateUrl: './add-stock-detail.component.html',
  styleUrls: ['./add-stock-detail.component.css']
})
export class AddStockDetailComponent implements OnInit {
  submitted = false;
  faBusinessTime = faBusinessTime;
  myInterval: any;
  curDateTime: DateTime = DateTime.local();
  displayDateTime: string = this.curDateTime.toLocaleString(DateTime.DATETIME_SHORT);
  constructor(public activeModal: NgbActiveModal, private fb :FormBuilder,public service:PostService,
    public toastService: AppToastService){} 
  
  ngOnInit() {
    this.curTimefunc()
    this.myInterval = setInterval(() => {
      this.curTimefunc()
    }, 1000)
  }

  // if using setInterval then be sure to clean up else it will keep
  // firing after the component is destroyed
  ngOnDestory() {
    clearInterval(this.myInterval)
  }

  curTimefunc() {
     this.curDateTime = DateTime.local();
     this.displayDateTime = this.curDateTime.toLocaleString(DateTime.DATETIME_SHORT);
     this.stockForm.controls.stockDate.setValue(this.curDateTime)
  }

    stockForm =  this.fb.group({
      companyCode :  ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(5),  Validators.pattern("^[0-9]*$")]],
      stockDate: [ this.curDateTime]
  });

  get f(): { [key: string]: AbstractControl } {
    return this.stockForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    // submit to the db and print toaster msg on successfull save
    console.log(this.stockForm)
    if (this.stockForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.stockForm.value, null, 2));
    this.service.saveStock(this.stockForm.value).subscribe(
      x=>  this.toastService.showSuccess("Stock added succesfully"),
      x=>  this.toastService.showError(x)
    );
  }

  companies :company[] = [
    new company('company1','c01', 'Tiger', 1000, 'tgt.kz', 'BSE')
  ]

}
