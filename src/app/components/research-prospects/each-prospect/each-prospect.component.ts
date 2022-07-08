import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Prospect } from 'src/app/models/prospect.model';
import { PhonesService } from 'src/app/services/phones/phones.service';

@Component({
  selector: 'app-each-prospect',
  templateUrl: './each-prospect.component.html',
  styleUrls: ['./each-prospect.component.scss']
})
export class EachProspectComponent implements OnInit {
  @Input() prospect!: Prospect;
  changeNumberForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private phonesService: PhonesService
  ) { }

  ngOnInit(): void {
    this.changeNumberForm = this.formBuilder.group({
      number: ["", Validators.required]
    })
  }

  onChangePhoneNumber() : Subscription {
    console.log(this.changeNumberForm.value);
    console.log(this.prospect.phone.id)
    return this.phonesService.updatePhoneNumber(this.prospect.phone.id, { number: this.changeNumberForm.value["number"]})
  }
}
