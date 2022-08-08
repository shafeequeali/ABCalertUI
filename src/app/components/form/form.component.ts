import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/upload.service';
import { Utility } from '../../helper/utility'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {


  constructor(private uploadService: UploadService, private router: Router) { }
  TAG = 'FormComponent'
  @Input() alertData: any = {}
  @Input() isAlertDataAvailable: boolean | undefined = false

  utility: Utility = new Utility();
  public struture: Array<InputStruture> = [
    { name: 'name', label: 'Name', required: true, index: 0 },
    { name: 'roll_number', label: 'Roll Number', required: true, index: 1 }, // (type_data,csv_data). The values exact what have to name atribue of ckeck box
    { name: 'phone_number', label: 'Mobile Number', required: true, index: 2 },
    { name: 'email_id', label: 'Email', required: true, index: 3 },
    { name: 'alert_name', label: 'Alert name', required: false, index: 4 }
  ]

  public formData: FormStyle = {
    name: '',
    roll_number: '',
    phone_number: '',
    email_id: '',
    alert_name: '',
    alert_status: '',
    created_date: '',
    modified_date: '',
    processed_date: '',
    _id: ''
  };

  public formErrorHandler: FormStyle = {
    name: "",
    roll_number: "",
    email_id: '',
    phone_number: ''
  }

  //true or false
  public setPreview: boolean = false;
  public previewData: FormStyle = {
    name: '',
    roll_number: '',
    email_id: '',
    alert_name: ''
  }
  public isPreviewClicked: boolean = false;
  ngOnInit(): void {
    if (this.isAlertDataAvailable) {
      // this.formData = this.alertData;
      for (const key in this.formData) {
        this.formData[key] = this.alertData[key]
      }
      console.log({
        tag: this.TAG + " ngOnInit trigerd",
        alertData: this.alertData,
        formDAta: this.formData,
        errHand: this.formErrorHandler
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    // console.log({ tag: this.TAG + " ngOnChanges trigerd" });
  }

  setInputData(data: InputKeyValue) {
    this.formData[data.key] = data.value.trim();
    this.validateFromData(data.key, this.findTheLabel(data.key))
    this.setPreview = false;
    console.log({
      TAG: 'FORM -setInputData',
      // Datatype: typeof data.value,
      // value: data.value, formData: this.formData,
      // errData: this.formErrorHandler
    });
  }

  onClickPreview() {
    // console.log({ tag: "form svg componen-onClickPreview", message: 'test got field' });
    const formValidationIsOk: boolean = this.evaluteFormData(this.formData)
    if (formValidationIsOk) {
      for (const key in this.previewData) {
        this.previewData[key] = this.formData[key]
      }
      this.setPreview = true
      console.log({
        tag: "form svg componen-onClickPreview",
        bindData: this.formData, errorData: this.formErrorHandler, previewData: this.previewData, formValidationIsOk
      });
    } else {
      this.setPreview = false;
      this.isPreviewClicked = true;
      console.log({ tag: "form svg componen-onClickPreview", message: 'test got field' });
    }
  }

  onClickCreate() {
    // console.log({ tag: "form svg componen-onClickCreate",  });
    const formValidationIsOk: boolean = this.evaluteFormData(this.formData)
    if (formValidationIsOk) {

      this.uploadService.uploadData(this.formData, 'alert/create_by_form')

      console.log({
        tag: "form svg componen-onClickCreate",
        bindData: this.formData, errorData: this.formErrorHandler, formValidationIsOk
      });
    } else {

      console.log({ tag: "form svg componen-onClickCreate", message: 'test got field' });
    }
  }

  onClickUpdate() {
    // console.log({ tag: "form svg componen-onClickCreate",  });
    if (this.isAlertDataAvailable) {
      const formValidationIsOk: boolean = this.evaluteFormData(this.formData)
      if (formValidationIsOk) {
        // console.log({
        //   tag: "form form componen-onClickUpdate",
        //   formDat: this.formData, errorData: this.formErrorHandler, formValidationIsOk,
        //   _id: `http://localhost:3000/alert/create_by_form/${this.formData['_id']}`
        // });
        this.uploadService.uploadData(this.formData,
          `alert/create_by_form/${this.formData['_id']}`, 'put')

      } else {

        console.log({
          tag: "form form componen-onClickUpdate",
          message: 'test got field', formData: this.formData,
          errHand: this.formErrorHandler
        });
      }
    } else {
      console.log({
        tag: "form svg componen-onClickUpdate",
        message: 'isAlertDataAvailable --is false',
        value: this.isAlertDataAvailable
      });
    }

  }
  onClickDelete() {
    console.log({ tag: this.TAG + ' onClickDelete' });
    this.uploadService.uploadData(null,
      `alert/${this.formData['_id']}`,
      'delete',
      ()=>{this.router.navigate(["/"])}
      )
  }

  validateFromData(key: any, label: string): boolean {
    // console.log({ tag: this.TAG + ' validateFromData ---line 153', errHand: this.formErrorHandler });

    let isTestOk: boolean = true;
    if (key != "alert_name" || key != "created_date" || key != "modified_date" || key != "processed_date") {
      if (this.formData[key] && this.formData[key].length > 0) {
        if (key == 'email_id') {
          let emailError = this.utility.emailValidation(this.formData[key]);
          this.formErrorHandler[key] = emailError ? "please enter valid email address" : ''
          isTestOk = emailError ? false : true

        } else if (key == 'phone_number') {
          let foundErr = this.utility.phoneNumberValidation(this.formData[key])
          this.formErrorHandler[key] = foundErr ? "Please enter valid phone numbers" : ""
          isTestOk = foundErr ? false : true
        }
        else {
          isTestOk = true
          this.formErrorHandler[key] = ""
        }
      } else {
        isTestOk = false
        this.formErrorHandler[key] = `${label} is required`
      }
    } else {
      isTestOk = true
    }
    // console.log({ tag: this.TAG + ' validateFromData ---line 184', errHand: this.formErrorHandler });
    return isTestOk;
  }
  findTheLabel(key: any): string {
    let label = 'field';
    this.struture.map((s) => {
      if (s.name == key) {
        label = s.label
      }
    })
    return label
  }


  evaluteFormData(formData: any): boolean {
    let resultKeeper = [];
    for (const key in formData) {
      if (key === "email_id" || key === "name" || key === "phone_number" || key === "roll_number") {
        let isformDataOK = this.validateFromData(key, this.findTheLabel(key));
        if (isformDataOK) {
          resultKeeper.push('ok')
        } else {
          resultKeeper.push('not')
        }
      }

    }
    let finder = resultKeeper.find((re) => re === 'not')
    if (finder) {
      return false
    } else {
      return true
    }
  }
}

interface InputKeyValue {
  key: string,
  value: any
}
interface FormStyle {
  [key: string]: any,
}
interface InputStruture {
  name: string,
  label: string,
  required: boolean,
  index: number
}