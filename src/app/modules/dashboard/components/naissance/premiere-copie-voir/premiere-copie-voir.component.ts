import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { PremiereCopieService } from '../../../services/premiere-copie.service';
import { CopieComponent } from '../../../pages/copie/copie.component';


@Component({
  selector: 'app-premiere-copie-voir',
  templateUrl: './premiere-copie-voir.component.html',
  styleUrls: ['./premiere-copie-voir.component.scss']
})
export class PremiereCopieVoirComponent implements OnInit {
  id: any;
  certificates: any;
  

  constructor(private activatedroute: ActivatedRoute, private router: Router, private premierecopieservice: PremiereCopieService) { }
  @ViewChild('htmlData', { static: false }) copiecomponent: CopieComponent;

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getCertificatesbyID();
    });
  }
  getCertificatesbyID() {
    this.premierecopieservice.getCertificateByID(this.id)
      .subscribe(data => {
        this.certificates = data;
        console.log(this.certificates);
      })
  }


  // ngAfterViewInit(){
  //   this.HtmlData = this.copiecomponent.HtmlData;
  //   const htmlDataElement = this.HtmlData.nativeElement.querySelector('#htmlData');
  //   console.log(htmlDataElement);

  // }

  OpenCopie = false;
  toggleModal() {
    this.OpenCopie = !this.OpenCopie;
  }



  downloadPdf() {

    // this.copiecomponent.generatePDF();
  }

  public openPDF(): void {

    let DATA: any = document.getElementById('htmlData')!.innerHTML;
    

    const doc = new jsPDF();
    html2canvas(DATA).then(canevas => {
      const imgData = canevas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canevas.height * imgWidth / canevas.width;
      let heightLeft = imgHeight;

      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      doc.setFont('times', 'normal');
      //  doc.text(DATA.innerHTML, 10, 10);

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      if(imgData){
      	console.log("canevas generer !")
      }
      //doc.save('pdfName.pdf');
    });
  }

  printPage() {
    var printContents = document.getElementById('htmlData')!.innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }



}
