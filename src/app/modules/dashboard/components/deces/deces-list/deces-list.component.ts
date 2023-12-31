import { Component, OnInit } from '@angular/core';
import { DecesService } from '../../../services/deces.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-deces-list',
  templateUrl: './deces-list.component.html',
  styleUrls: ['./deces-list.component.scss']
})
export class DecesListComponent implements OnInit {

  tableColumns: Array<any> = [
    {
      columnDef: 'idActeDeces',
      header: 'Numèro',
      cell: (element: Record<string, any>) => `${element['idActeDeDeces'] }`
    },
    {
      columnDef: 'Nom et Prènoms  ',
      header: 'Nom et Prènoms ',
        cell: (element: Record<string, any>) => {
        const nomEnfant = element['nomDefunt']
        const prenomEnfant = element['prenomDefunt']
        const NomEnfant = nomEnfant.toUpperCase()
        return `${NomEnfant} ${prenomEnfant}`
      },
    },
    {
      columnDef: 'Nome et Prènoms ',
      header: 'Nome et Prènoms Declarant',
      cell: (element: Record<string, any>) => {
        const NomFemme = element['nomDeclarant']
        const prenomsFemme = element['prenomsDeclarant']
        const Nomfemme = NomFemme.toUpperCase()
        return `${Nomfemme} ${prenomsFemme}`
      },
    },
    {
      columnDef: 'dateDeces',
      header: 'Date de Deces',
     cell: (element: Record<string, any>) => {
        const datenaissEnfant = element['dateDeces'];
        const dateObj = new Date(datenaissEnfant);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
        return formattedDate;
      }
    }
  ];
  search:string;
  tableData: any;
  mariage: any = [];
  size: any ='';
  page = 0;

  constructor(private decesservice:DecesService, private router:Router) { }
  

  ngOnInit(): void {
    this.getAllDeces();
    console.log(this.tableData)
  }

  getAllDeces(){
    this.decesservice.getAllDeces().subscribe(data=>{
      this.tableData = data.data;
      console.log('====================================');
      console.log(this.tableData);
      console.log('====================================');
    })
  }
  showRow(element: any) {
    this.router.navigate(['/dashboard/show-deces', element.idActeDeDeces])

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.search = filterValue
    if(this.search == '') {
      this.getAllDeces();
    }else{
      this.decesservice.Search(this.search).subscribe((data)=>{
        this.tableData = data.data;
        console.log('====================================');
        console.log(this.tableData);
        console.log('====================================');
      })
    }
  }

  editRow(element: any) {
  }

  deleteRow(element: any){

  }
  handlePageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllDeces();
  }

  Search(){
    console.log('====================================');
    console.log(this.search);
    console.log('====================================');
    this.decesservice.Search(this.search).subscribe((data)=>{
      this.tableData = data;
    })
  }
}
