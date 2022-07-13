import { Component, Input, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { find } from 'rxjs';
import { Utility } from 'src/app/helper/utility';
import { AlertsService } from 'src/app/services/alerts.service';
import { CsvService } from 'src/app/services/csv.service';
import { UploadService } from '../../upload.service';
@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {

  constructor(private uploadService: UploadService,
    private ngxCsvParser: NgxCsvParser,
    public csvService: CsvService,
    public alertService: AlertsService,
    public router: Router
  ) { }

  @Input() alertData: any;

  utility: Utility = new Utility();
  private TAG = 'CSV-COMPONENT';
  private file: any;
  private fileUrl: string | undefined;
  public fileName: string | undefined;
  private csvResult: any = []
  public csvHeaders: any = [];
  public csvSample: any = [];
  public isFormForEditing: boolean = false;
  // not_selected completed error
  public csvEvalutionStatus: any = 'not_selected';
  isClickedPriview: boolean = false
  isClickedCreate: boolean = false
  labelMessage: string = ''
  setPreview: boolean = false

  // (type_data,csv_data). The values exact what have to name atribue of ckeck box
  public struture: Array<InputStruture | any> = [
    { name: 'name', label: 'Name', checkedValue: 'csv_data', checked: true, required: true, index: 0 },
    { name: 'roll_number', label: 'Roll Number', checkedValue: 'csv_data', checked: true, required: true, index: 1 }, // (type_data,csv_data). The values exact what have to name atribue of ckeck box
    { name: 'phone_number', label: 'Mobile Number', checkedValue: 'csv_data', checked: true, required: true, index: 2 },
    { name: 'email_id', label: 'Email', checkedValue: 'csv_data', checked: true, required: true, index: 3 },
    { name: 'alert_name', label: 'Alert name', checkedValue: 'csv_data', checked: true, required: false, index: 4 }
  ]

  public bindData: BindData = {
    name: { key: '', value: '', type: '' },
    roll_number: { key: '', value: '', type: '' },
    phone_number: { key: '', value: '', type: '' },
    email_id: { key: '', value: '', type: '' },
    alert_name: { key: '', value: '', type: '' },
  };

  public formErrorHandler: DinamicObject = {
    name: "",
    roll_number: "",
    email_id: '',
    phone_number: ''
  }

  public sampleFormData: DinamicObject = {
    name: "",
    roll_number: "",
    email_id: '',
    phone_number: '',
    alert_name: ""
  }

  private sampleFormErrorHandler: DinamicObject = {
    name: "",
    roll_number: "",
    email_id: '',
    phone_number: '',
    alert_name: ""
  }

  ngOnInit(): void {
    if (this.alertService.isAlertDataAvailable) {
      this.isFormForEditing = true
      this.csvEvalutionStatus = 'completed'
      this.fileUrl = this.alertData.csv_file
      this.fileName = this.alertData.csv_file_name
      this.bindData = JSON.parse(this.alertData.binding_data)
      this.csvHeaders = this.alertData.csv_headers
      this.csvSample = JSON.parse(this.alertData.csv_sample)
      this.struture.forEach((s) => {
        if (s.name === 'name') {
          s.checkedValue = this.bindData['name'].type
        } else if (s.name === 'roll_number') {
          s.checkedValue = this.bindData['roll_number'].type
        } else if (s.name === 'phone_number') {
          s.checkedValue = this.bindData['phone_number'].type
        } else if (s.name === 'email_id') {
          s.checkedValue = this.bindData['email_id'].type
        } else if (s.name === 'alert_name') {
          s.checkedValue = this.bindData['alert_name'].type
        }
      })

    }
    // console.log({ tag: this.TAG + ' ngOnInit', alertDataBindData: JSON.parse(this.alertData.binding_data) });
    // console.log({ tag: this.TAG + ' ngOnInit', bindData: this.bindData, struture: this.struture });
    // console.log({ tag: this.TAG + ' ngOnInit', csvSample: this.csvSample });

  }

  public setInputData(data: InputKeyValue) {
    let typeOfInput = this.addInputTypeInToBindData(data.key);
    this.bindData[data.key] = { key: data.key, value: data.value.trim(), type: typeOfInput };
    // this.filerSvgHeader(data.value)
    this.validateFromBindData(data.key, typeOfInput, this.findTheLabel(data.key));
    // this.phoneNumberValidation('+43284723,+4328472,+432847342,+43238342,+43298342,233345,23434223')
    this.isClickedPriview = false;
    this.isClickedCreate = false;
    this.labelMessage = ''
    this.setPreview = false;

    // console.log({
    //   TAG: 'csv-componet', bindData: this.bindData,
    //   struture: this.struture,
    //   formErrorHandler: this.formErrorHandler
    // });
  }

  setRadioButtonData(data: bindDataField) {
    this.struture.forEach(st => {
      if (st.index == data.index) {
        st.checkedValue = data.value
        this.bindData[st.name] = { key: '', value: '', type: data.value };
        this.validateFromBindData(st.name, data.value, this.findTheLabel(st.name));
      }

    })
    console.log({
      tag: this.TAG + ' setRadioButtonData', prams: data,
      struture: this.struture,
      formErrorHandler: this.formErrorHandler,
      bindData: this.bindData
    });

  }


  async onChangeCsv(e: any) {
    this.file = e.target.files[0];
    // console.log({ tag: 'csv_componet', file: this.file });
    this.uploadService.uploadFileBodyLess(this.file).subscribe((data) => {
      let sample = data ? data.sample_data ? data.sample_data : {} : {};
      for (const key in sample) {
        this.csvHeaders.push(`${key}`)
      }
      this.csvEvalutionStatus = 'completed';
      this.csvSample = sample;
      this.fileUrl = data.file_path
      this.fileName = data.file_name
      console.log({ tag: this.TAG + " onChangeCsv", fileUrl: this.fileUrl, fileName: this.fileName, });
    })

  }

  onClickSubmit() {
    console.log({ tag: this.TAG + " onClickSubmit" });
    const formValidationIsOk: boolean = this.evaluteFormData(this.bindData)
    if (formValidationIsOk) {
      this.generateSampleFormData()
      if (this.evaluteSampleFormData(this.sampleFormData)) {
        let data = {
          bindData: this.bindData,
          sampleFromData: this.sampleFormData,
          csv_file: this.fileUrl,
          csv_file_name: this.fileName,
          csv_headers: this.csvHeaders,
          csv_sample: this.csvSample
        }
        this.uploadService.uploadData(data, 'http://localhost:3000/alert/create_by_csv', 'post')
      } else {
        window.alert("sample validation of csv file has been failed , please check your csv file uploaded")
      }
      // console.log({
      //   tag: "form svg componen-onClickCreate",
      //   bindData: this.bindData, errorData: this.formErrorHandler, formValidationIsOk
      // });

    } else {
      console.log({ tag: "form svg componen-onClickCreate", message: 'test got field' });
    }

    this.isClickedPriview = false;
    this.isClickedCreate = false;
    this.labelMessage = ''
    // if (formValidationIsOk) {
    //   this.uploadService.uploadFile(this.file, this.formData)
    // } else {
    //   window.alert('please match all the field  correspondent to the csv file uploaded ');
    // }
  }
  onClickCreatePreview() {
    const formValidationIsOk: boolean = this.evaluteFormData(this.bindData)
    if (formValidationIsOk) {
      this.generateSampleFormData()
      if (this.evaluteSampleFormData(this.sampleFormData)) {
        this.isClickedPriview = true;
        this.setPreview = true;
      } else {
        window.alert("validation has been failed on sample csv file  , please check your csv file uploaded")
      }
    }
    console.log({ tag: this.TAG + ' onClickCreatePreview', csvSample: this.csvSample });

    // console.log({
    //   tag: this.TAG + " onClickCreatePreview",
    //   sampleFormData: this.sampleFormData,
    //   sampleFormErrorHandler: this.sampleFormErrorHandler,
    //   bindData: this.bindData,
    //   formErrorHandler: this.formErrorHandler
    // });

  }
  onClickUpdate() {
    console.log({ tag: this.TAG + " onClickUpdate" });
    const formValidationIsOk: boolean = this.evaluteFormData(this.bindData)
    if (formValidationIsOk) {
      this.generateSampleFormData()
      if (this.evaluteSampleFormData(this.sampleFormData)) {
        let data = {
          bindData: this.bindData,
          sampleFromData: this.sampleFormData,
          csv_file: this.fileUrl,
          csv_headers: this.csvHeaders,
          csv_sample: this.csvSample
        }
        this.uploadService.uploadData(data, `http://localhost:3000/alert/create_by_csv/${this.alertData._id}`, 'put')
      } else {
        window.alert("sample validation of csv file has been failed , please check your csv file uploaded")
      }
      // console.log({
      //   tag: "form svg componen-onClickUpdate",
      //   bindData: this.bindData, errorData: this.formErrorHandler, formValidationIsOk
      // });

    } else {
      console.log({ tag: "form svg componen-onClickUpdate", message: 'test got field' });
    }

    this.isClickedPriview = false;
    this.isClickedCreate = false;
    this.labelMessage = ''
  }
  onClickDelete() {
    console.log({ tag: this.TAG + ' onClickDelete', });
    this.uploadService.uploadData(null,
      `http://localhost:3000/alert/${this.alertData._id}?csv_file=${this.fileUrl}`,
      'delete',
      () => { this.router.navigate(["/"]) }
    )
  }
  // onClickCreate() {
  //   this.isClickedCreate = true;
  //   this.labelMessage = this.csvService.submitSuccess.isSubmitSuccess ? '' : this.csvService.submitSuccess.message
  //   console.log({ tag: this.TAG + " onClickCreate", info: this.isClickedCreate });
  // }

  // filerSvgHeader(p: any) {
  //   const result = this.svgHeaders.filter((a: any) => a !== p);
  //   this.svgHeaders = result
  // }

  // setBindingHtmlData(result: any) {
  //   this.csvHeaders = result[0];
  //   console.log({ tag: "form svg componen-setBindingHtmlData", svgHeaders: this.svgHeaders });

  // }

  evaluteFormData(bindData: any): boolean {
    let resultKeeper = [];
    for (const key in bindData) {
      if (key === 'name' || key === 'roll_number' || key === 'email_id' || key === 'phone_number') {
        let FormType = bindData[key].type ? bindData[key].type : 'csv_data';
        let isBindDataOK = this.validateFromBindData(key, FormType, this.findTheLabel(key));
        if (isBindDataOK) {
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

  evaluteSampleFormData(formData: any): boolean {
    let resultKeeper = [];
    for (const key in formData) {
      if (key === 'name' || key === 'roll_number' || key === 'email_id' || key === 'phone_number') {
        let FormType = formData[key].type ? formData[key].type : 'csv_data';
        let isformDataOK = this.validateSampleFromData(key, FormType);
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


  validateSampleFromData(key: any, label: string): boolean {
    // console.log({ tag: this.TAG + ' validateFromData ---line 153', errHand: this.formErrorHandler });

    let isTestOk: boolean = true;
    if (this.sampleFormData[key] && this.sampleFormData[key].length > 0) {
      if (key == 'email_id') {
        let emailError = this.utility.emailValidation(this.sampleFormData[key]);
        this.sampleFormErrorHandler[key] = emailError ? "please enter valid email address" : ''
        isTestOk = emailError ? false : true

      } else if (key == 'phone_number') {
        let foundErr = this.utility.phoneNumberValidation(this.sampleFormData[key])
        this.sampleFormErrorHandler[key] = foundErr ? "Please enter valid phone numbers" : ""
        isTestOk = foundErr ? false : true
      }
      else {
        isTestOk = true
        this.sampleFormErrorHandler[key] = ""
      }
    } else {
      isTestOk = false
      this.sampleFormErrorHandler[key] = `${label} is required`
    }

    // console.log({ tag: this.TAG + ' validateFromData ---line 184', errHand: this.formErrorHandler });
    return isTestOk;
  }

  // async fileChangeListener(file: any): Promise<void> {

  //   if (file || file != undefined) {
  //     let header: boolean = false;
  //     console.log({ tag: 'csvComponent', file });
  //     try {
  //       const csvParser = await this.ngxCsvParser.parse(file, { header: header, delimiter: ',' });
  //       const parserPipe = await csvParser.pipe();
  //       const pipeSuscripe = await parserPipe.subscribe({
  //         next: (result): void => {
  //           // console.log('csvComponent-Result', result);
  //           this.csvResult = result;
  //           this.csvEvalutionStatus = 'completed'

  //           console.log('csvComponent-Result--------------', result);
  //           this.setBindingHtmlData(result);
  //         },
  //         error: (error: NgxCSVParserError): void => {
  //           this.csvEvalutionStatus = 'error'
  //           console.log('csvComponent-Error', error);
  //           window.alert('Error caused while reading csv ,check console for mor info');

  //         }
  //       });

  //     } catch (err) {
  //       console.log(err);

  //     }



  //   } else {
  //     window.alert('please select csv file');
  //   }
  // }

  addInputTypeInToBindData(key: any) {
    let type: any = 'csv_data';
    this.struture.map(e => {
      if (e.name == key) {
        type = e.checkedValue
      }
    })
    return type;
  }

  validateFromBindData(key: any, type: any, label: string): boolean {

    let isTestOk: boolean = true;
    if (key != "alert_name") {
      if (this.bindData[key].value && this.bindData[key].value.length > 0) {
        if (type == 'type_data') {
          if (key == 'email_id') {
            let emailError = this.emailValidation(this.bindData[key].value);
            this.formErrorHandler[key] = emailError ? "please enter valid email address" : ''
            isTestOk = emailError ? false : true

          } else if (key == 'phone_number') {
            let foundErr = this.phoneNumberValidation(this.bindData[key].value)
            this.formErrorHandler[key] = foundErr ? "Please enter valid phone numbers" : ""
            isTestOk = foundErr ? false : true
          }
          else {
            isTestOk = true
            this.formErrorHandler[key] = ""
          }
        } else if (type == 'csv_data') {
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
    return isTestOk;
  }

  emailValidation(email: any): boolean {
    let errFound = true;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // console.log({ tag: this.TAG + ' emailvarification', retunofmatach: email.match(validRegex), test: text.match(validRegex) });
    // let emailerr = "please enter valid email address";
    if (email.match(validRegex) != null) {
      // console.log({ tag: this.TAG + ' emailVarification-succseee' });
      // emailerr = ""
      errFound = false
    }
    return errFound
  }

  phoneNumberValidation(text: any): boolean {

    const splited = text.split(',')
    const lengthOfSpited = splited.length;
    let errorFound: boolean = false;
    // let test = []
    for (let i = 0; i < lengthOfSpited; i++) {
      let str = splited[i];
      if (isNaN(str)) {
        errorFound = true;
        i = lengthOfSpited + 1;
        // test.push('n')
      } else {
        if (str.charAt(0) === '+' || str.charAt(0) >= 0) {
          if (str.length < 15 && str.length > 5) {
            // test.push('Yes')
          } else {
            errorFound = true;
            i = lengthOfSpited + 1;
            // test.push('no')
          }
        } else {
          errorFound = true;
          i = lengthOfSpited + 1;
          // test.push('no')
        }
      }

    }
    // console.log({ tag: this.TAG + ' phoneNumberValidation', slicedtype: typeof splited, splited, test, errorFound });

    return errorFound
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

  generateSampleFormData() {
    for (const key in this.sampleFormData) {
      let field = this.bindData[key];
      if (field) {
        if (field.type) {
          if (field.type === 'csv_data') {
            this.sampleFormData[key] = this.csvSample[field.value];
          } else if (field.type === 'type_data') {
            this.sampleFormData[key] = field.value;
          }
        }
      }
    }
  }

}


interface DinamicObject {
  [key: string]: any,
}

interface BindData {
  [key: string]: bindDataField,
}

interface Data {
  value: string;
  viewValue: string;
}
interface bindDataField {
  key: any,
  value: any
  index?: string | number
  type?: any
}

interface InputKeyValue {
  key: string,
  value: any,
  check_box?: any
}

interface InputStruture {
  name: string,
  label: string,
  checkedValue?: string,
  index?: number | string,
  checked?: boolean
  required?: boolean
}

interface FEH {
  name_err: string
  roll_number_err: string,
  email_err: string
}

interface SampleFormData {
  name: string,
  roll_number: string,
  email_id: string,
  mobile_number: string
}