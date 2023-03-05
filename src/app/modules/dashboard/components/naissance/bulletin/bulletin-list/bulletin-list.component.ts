import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Column } from 'src/app/modules/dashboard/models/column';
import { BulletinNaissanceService } from 'src/app/modules/dashboard/services/bulletin-naissance.service';
@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.scss']
})
export class BulletinListComponent implements OnInit {
  @Output() askEvent = new EventEmitter<any>();

  constructor( private router: Router,  private bulletinservice: BulletinNaissanceService) { }

  tableColumns: Array<Column> = [
    {
      columnDef: 'idPremierCopie',
      header: 'N° Première Copie',
      cell: (element: Record<string, any>) => `${element['idPremierCopie']}`
    },
    {
      columnDef: 'descriptionRow',
      header: 'Description',
      cell: (element: Record<string, any>) => `${element['descriptionRow']} `,
    
    },
    {
      columnDef: 'mention',
      header: 'Mention',
      cell: (element: Record<string, any>) => `${element['type']}`
    },
    {
      columnDef: 'DatePremiereCopie',
      header: 'Date Copie',
      cell: (element: Record<string, any>) => `${element['dateCopie']}`
    }
  ];

  tableData: any = [];

  search: any = "";


  ngOnInit(): void {
    this.getAllService();
  }

  getAllService(){
    this.bulletinservice.getAllBulletin()
    .subscribe(data=>{
      this.tableData = data
      this.tableData.map((d:any)=>{
        d.descriptionRow = d.nomPersonne + ' ' + d.prenomsPersonne
      })
    })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.search = filterValue
  }

  showRow(element: any) {
    this.router.navigate(['/dashboard/premiere-copie-voir', element.idPremierCopie ])

  }

  AskRow(element : any) {
    this.askEvent.emit(element);
  }

  // editRow(element: any) {
  //   console.log('Edit row', element);
  //   this.premierecopieservice.updateCertificate(element.idPremierCopie, element)
  //     .subscribe(data=> {
  //       this.getfirstCertificates(this.size, this.page)
        
  //     })
  // }

  // deleteRow(element: any) {
  //   this.premierecopieservice.deleteCertificate(element.idPremierCopie)
  //     .subscribe(data=> { 
  //       this.getfirstCertificates(this.size, this.page)
  //       console.log('Delete row', data);
  //     })
  
  // }

}
