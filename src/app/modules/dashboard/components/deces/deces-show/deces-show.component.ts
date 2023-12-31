import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PremiereCopieService } from '../../../services/premiere-copie.service';
import { CopieComponent } from '../../../pages/copie/copie.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DecesService } from '../../../services/deces.service';

@Component({
  selector: 'app-deces-show',
  templateUrl: './deces-show.component.html',
  styleUrls: ['./deces-show.component.scss']
})
export class DecesShowComponent implements OnInit {
  id: any;
  certificates: any;
  

  constructor(private activatedroute: ActivatedRoute, private router: Router, private deceService: DecesService) { }
  @ViewChild('htmlData', { static: false }) copiecomponent: CopieComponent;

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getCertificatesbyID(this.id);
    });
  }
  getCertificatesbyID(id: number) {
    this.deceService.getDecesById(id)
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
    console.log(DATA);
    // console.log(DATA);
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('angular-demo.pdf');
    // });

    const doc = new jsPDF();
    html2canvas(DATA).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      doc.setFont('times', 'normal');

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('pdfName.pdf');
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
