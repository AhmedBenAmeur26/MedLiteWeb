import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef, EventEmitter, Output, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table'; 

import * as alertifyjs from 'alertifyjs'
import { Router } from '@angular/router';
import { LoadingComponent } from '../../Shared/loading/loading.component';
import { I18nService } from '../../Shared/i18n/i18n.service';

declare const PDFObject: any;
@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css', '.../../../src/assets/css/StyleApplication.css'], providers: [ConfirmationService, MessageService]
})
export class BanqueComponent implements OnInit, AfterViewInit {
  IsLoading = true;
  openModal!: boolean;

  constructor(public i18nService: I18nService,private router: Router, private loadingComponent: LoadingComponent, private confirmationService: ConfirmationService, private messageService: MessageService, private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {


  }

  @ViewChild('modal') modal!: any;

  pdfData!: Blob;
  isLoading = false;
  cols!: any[];
  
  ngOnInit(): void {
    this.GetColumns();
    this.GelAllBanque();

  }
  ngAfterViewInit() {
    this.cdr.detectChanges();

    setTimeout(() => {
      // This will now work correctly because the view is initialized.
      if (this.modal && this.modal.el) { // Check if modal and its el are defined.
        const inputs = this.modal.el.nativeElement.querySelectorAll('input[required="true"]');
        inputs.forEach((input: HTMLInputElement) => {
          input.addEventListener('blur', () => {
            this.validateInput(input);
          });
        });
      } else {
        console.error("Modal element  xxx not found!"); // Handle the case where the modal is not found.
      }
    }, 0);

  }
  validateInput(input: HTMLInputElement) {
    if (input.required && input.value === '') {
      input.style.borderColor = 'red'; // Or any color you prefer
      input.classList.add('invalid-input'); // Add a class for more styling options
    } else {
      input.style.borderColor = ''; // Reset border color
      input.classList.remove('invalid-input'); // Remove the invalid class
    }
  }


  GetColumns() {
    this.cols = [
      { field: 'TypeOP',   header: this.i18nService.getString('CodeSaisie') || 'CodeSaisie', width: '5%', filter: "true" },
      { field: 'SourceDepenese', header: this.i18nService.getString('DesignationAr') || 'DesignationArabic', width: '5%', filter: "true" },
      { field: 'codeEtatApprouver', header: this.i18nService.getString('DesignationLt') || 'DesignationLatin', width: '5%', filter: "false" },
      { field: 'dateCreate', header: this.i18nService.getString('Actif') || 'Actif', width: '5%', filter: "true" },

    ];
  }
  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() {
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/');
    this.closed.emit(parentUrl);
    this.router.navigate([parentUrl]);
  }

  CloseModalPrint() {
    this.visibleModalPrint = false;
  }


  handleRenderPdf(data: any) {
    const pdfObject = PDFObject.embed(data, '#pdfContainer');
  }


  clear(table: Table) {
    table.clear();
    this.searchTerm = '';
  }

  clearForm() {


    if (this.modal && this.modal.el) {
      // Reset form values and border colors
      const inputs = this.modal.el.nativeElement.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        input.value = '';
        this.validateInput(input);
      });
      this.code == undefined;
      this.designationAr = '';
      this.designationLt = '';
      this.actif = false;
      this.visibleModal = false;
      this.codeSaisie = '';
      this.onRowUnselect(event);

    }


  }
  check_actif = false;
  check_inactif = false;

  formHeader = ".....";
  searchTerm = '';
  visibleModal: boolean = false;
  visibleModalPrint: boolean = false;
  visDelete: boolean = false;
  code!: number | null;
  codeSaisie: any;
  designationAr: string = 'NULL';
  designationLt: string = "NULL";
  rib!: string;
  actif!: boolean;
  visible!: boolean;

  selectedBanque!: any;


  onRowSelect(event: any) {
    this.code = event.data.code;
    this.actif = event.data.actif;
    this.visible = event.data.visible;
    this.codeSaisie = event.data.codeSaisie;
    this.designationAr = event.data.designationAr;
    this.designationLt = event.data.designationLt;
    this.rib = event.data.rib;

    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
  }



  DeleteBanque(code: any) {
    // this.param_service.DeleteBanque(code) .subscribe(
    //   (res:any) => {
    //     alertifyjs.set('notifier', 'position', 'top-left');
    //     alertifyjs.success('<i class="success fa fa-chevron-down" aria-hidden="true" style="margin: 5px 5px 5px;font-size: 15px !important;;""></i>' + "Success Deleted");

    //     this.ngOnInit();
    //     this.check_actif = true;
    //     this.check_inactif = false;
    // this.visDelete = false;

    //   }
    // )
  }
  clearSelected(): void {
    this.code == undefined;
    this.codeSaisie = '';
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false;
    this.visible = false;
  }


  showRequiredNotification() {  
    const fieldRequiredMessage = this.i18nService.getString('fieldRequired') ;  // Default to English if not found
    alertifyjs.notify(
      `<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/images/images/required.gif" alt="image" >` + 
      fieldRequiredMessage
    );
  }
  showChoseAnyRowNotification() {  
    const fieldRequiredMessage = this.i18nService.getString('SelctAnyRow') ;  // Default to English if not found
    alertifyjs.notify(
      `<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/images/images/required.gif" alt="image" >` + 
      fieldRequiredMessage
    );
  }

  ActifString!:string;
  public onOpenModal(mode: string) {

    this.ActifString  =  this.i18nService.getString('ActifString');
    this.visibleModal = false;
    this.visDelete = false; 
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#Modal');
      this.formHeader = this.i18nService.getString('Add') ;
      this.onRowUnselect(event);
      this.clearSelected();
      this.actif = false;
      this.visible = false;
      this.visibleModal = true;
      this.code == undefined;


    }
    if (mode === 'edit') {


      if (this.code == undefined) { 
        this.clearForm();
        this.onRowUnselect(event);
        if(sessionStorage.getItem("lang") == "ar"){
          alertifyjs.set('notifier', 'position', 'top-left');
        }else{
          alertifyjs.set('notifier', 'position', 'top-right');
        }
       
        this. showChoseAnyRowNotification(); 
        this.visDelete == false && this.visibleModal == false
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = this.i18nService.getString('Modifier') ; 

        this.visibleModal = true;
        this.onRowSelect;

      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        alertifyjs.set('notifier', 'position', 'top-left');
        this. showChoseAnyRowNotification(); 
        this.visDelete == false && this.visibleModal == false
      } else {

        {
          button.setAttribute('data-target', '#ModalDelete');
          this.formHeader = this.i18nService.getString('Delete') ; 
          this.visDelete = true;

        }
      }

    }

    if (mode === 'Print') {


      button.setAttribute('data-target', '#ModalPrint');
      this.formHeader = "Imprimer Liste Banque"
      this.visibleModalPrint = true;
      // this.RemplirePrint();


    }

  }


  userCreate = "soufien";
  // datecreate !: Date;
  currentDate = new Date();

  ajusterHourAndMinutes() {
    let hour = new Date().getHours();
    let hours;
    if (hour < 10) {
      hours = '0' + hour;
    } else {
      hours = hour;
    }
    let min = new Date().getMinutes();
    let mins;
    if (min < 10) {
      mins = '0' + min;
    } else {
      mins = min;
    }
    return hours + ':' + mins
  }
  datform = new Date();

  PostBanque() {
    if (this.modal && this.modal.el) { // Check for modal and its element
      let isValid = true;
      const requiredInputs = this.modal.el.nativeElement.querySelectorAll('input[required="true"]');
      requiredInputs.forEach((input: HTMLInputElement) => {
        this.validateInput(input); // Validate each required field
        if (input.required && input.value === '') {
          isValid = false; // If any field is invalid, set isValid to false.
        }
      });








      if (!this.designationAr || !this.designationLt || !this.codeSaisie) {
        alertifyjs.set('notifier', 'position', 'top-left');
        this. showRequiredNotification(); 
      } else {


        let body = {
          codeSaisie: this.codeSaisie,
          designationAr: this.designationAr,
          designationLt: this.designationLt,
          userCreate: this.userCreate,
          rib: this.rib,

          dateCreate: new Date().toISOString(), //
          code: this.code,
          actif: this.actif,
          visible: this.visible,

        }
        if (this.code != null) {
          body['code'] = this.code;

          // this.param_service.UpdateBanque(body) .subscribe(

          //   (res: any) => {
          //     alertifyjs.set('notifier', 'position', 'top-left');
          //                 alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم التحيين");

          //     this.visibleModal = false;
          //     this.clearForm();
          //     this.ngOnInit();
          //     this.check_actif = true;
          //     this.check_inactif = false;
          //     this.onRowUnselect(event);
          //     this.clearSelected();

          //   }
          // );


        }
        else {
          // this.param_service.PostBanque(body) .subscribe(
          //   (res:any) => {
          //     alertifyjs.set('notifier', 'position', 'top-left'); 
          //     alertifyjs.notify('<img  style="width: 30px; height: 30px; margin: 0px 0px 0px 15px" src="/assets/files/images/ok.png" alt="image" >' + "تم الحفظ بنجاح");
          //     this.visibleModal = false;
          //     this.clearForm();
          //     this.ngOnInit();
          //     this.code;
          //     this.check_actif = true;
          //     this.check_inactif = false;
          //     this.onRowUnselect(event);
          //     this.clearSelected();

          //   }
          // )
        }
      }

    } else {
      // Display an error message or prevent submission
      console.log("Form is invalid. Please fill in all required fields.");
      // ... your error handling logic ... (e.g., display a toast message)
    }
  }


  Voids(): void {
    // this.cars = [

    // ].sort((car1, car2) => {
    //   return 0;
    // });

  }



  public remove(index: number): void {
    this.listDesig.splice(index, 1);
    console.log(index);
  }






  compteur: number = 0;
  listDesig = new Array<any>();

  // cars!: Array<Matiere>;
  // brands!: SelectItem[];
  // clonedCars: { [s: string]: Matiere } = {}; 
  dataBanque = new Array<any>();
  GelAllBanque() {
    // this.param_service.GetBanque().subscribe((data: any) => {

    this.loadingComponent.IsLoading = false;
    this.IsLoading = false;

    //   this.dataBanque = data;
    //   this.onRowUnselect(event);

    // }) 
  }


    

}


