import { FormService } from '../../../services/form.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SurveyCreatorModel } from 'survey-creator-core';
import { Model } from 'survey-core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Column } from '../../../models/column';
import { BulletinNaissanceService } from '../../../services/bulletin-naissance.service';
import { BulletinNaicensse } from 'src/app/model/bulletin/Buletin.interface';
import { BulletinService } from 'src/app/service/bulletin/bulletin.service';
import { PremiereCopieService } from '../../../services/premiere-copie.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss'],
})
export class BulletinComponent implements OnInit {
  defaultJson: any;
  formName: string = 'BulletinNaissance';
  bulletin: any;
  surveyModel: any;
  surveyCreatorModel: any;
  premierCopie: any;
  typePressonne: string = 'interne';
  readonly: boolean=false;
  interne:string;
  externe : string;

  // variable alphato
  buletinNaissance:BulletinNaicensse = {
    idPremierCopie: "",
    type: "",
    nomPersonne: "",
    prenomsPersonne: "",
    dateNaissPersonne: "",
    lieuNaissPersonne: "",
    nomPere: "",
    prenomsPere: "",
    nomMere: "",
    prenomsMere: "",
    dateCopie: "",
  }
  // end
  size= 10;
  page = 1;
  id:string | null;
  search: any;
  demande:boolean ;

  tableColumns: Array<Column> = [
    {
      columnDef: 'idbulletin',
      header: 'N° bulletin Copie',
      cell: (element: Record<string, any>) => `${element['idbulletin']}`,
    },
    {
      columnDef: 'nom',
      header: 'Nom et Prénoms',
      cell: (element: Record<string, any>) =>
        `${element['premierecopie']['enfant']['nomEnfant']} ${element['premierecopie']['enfant']['prenomsEnfant']}`,
    },
    {
      columnDef: 'datebulletin',
      header: "Date d'bulletin ",
      cell: (element: Record<string, any>) => `${element['datebulletin']}`,
    },
    {
      columnDef: 'DatePremiereCopie',
      header: 'Date 1ère Copie',
      cell: (element: Record<string, any>) =>
        `${element['premierecopie']['datePremierCopie']}`,
    },
  ];

  tableData: any = [];
  creatorOptions: any = {
    showLogicTab: true,
    isAutoSave: true,
  };

  constructor(
    public dialog: MatDialog,
    private bulletinService: BulletinNaissanceService,
    private formService: FormService,
    private router: Router,
    private activateRoute : ActivatedRoute,
    private bulletinservice: BulletinService,
    private premierCopieService: PremiereCopieService
  ) {}

  @ViewChild('htmlData') htmlData!: ElementRef;

  ngOnInit(): void {
    this.getParams();
    this.getAllBulletinNaissance(this.size, this.page);
    this.getAllPremierCopier(this.size,this.page);
    if (this.id != null) {
      console.log('====================================');
      console.log(this.typePressonne);
      console.log('====================================');
      this.demande = false
    }else{
      this.demande = true;
    }
  }
  getParams() {
    this.activateRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.changerId(this.id);
    })
  }

  handleSelectedValue(value:any) {
    this.typePressonne=value;
    if (this.typePressonne == "interne") {
      this.buletinNaissance = {
        idPremierCopie: "",
        type: "",
        nomPersonne: "",
        prenomsPersonne: "",
        dateNaissPersonne: "",
        lieuNaissPersonne: "",
        nomPere: "",
        prenomsPere: "",
        nomMere: "",
        prenomsMere: "",
        dateCopie: "",
      };
      this.readonly = true;
    }
    else if(this.typePressonne == "externe"){
      this.buletinNaissance = {
        idPremierCopie: "",
        type: "",
        nomPersonne: "",
        prenomsPersonne: "",
        dateNaissPersonne: "",
        lieuNaissPersonne: "",
        nomPere: "",
        prenomsPere: "",
        nomMere: "",
        prenomsMere: "",
        dateCopie: "",
      };
      this.readonly = false;
    }
    
  }

  public getAllPremierCopier(size:number,page:number){
    this.premierCopieService.getCertificates(size, page).subscribe(data => {
      this.premierCopie = data.data;
    });
  }
  changerId(value:any){
    this.premierCopieService.getCertificateByID(value).subscribe(data=>{
      this.buletinNaissance.idPremierCopie = data.idPremierCopie;
      this.buletinNaissance.nomPersonne = data.enfant.nomEnfant;
      this.buletinNaissance.prenomsPersonne = data.enfant.prenomsEnfant;
      this.buletinNaissance.dateNaissPersonne = data.enfant.datenaissEnfant;
      this.buletinNaissance.lieuNaissPersonne = data.enfant.lieunaissEnfant;
      this.buletinNaissance.nomPere = data.pere.nomPere;
      this.buletinNaissance.prenomsPere = data.pere.prenomsPere;
      this.buletinNaissance.nomMere = data.mere.nomMere;
      this.buletinNaissance.prenomsMere = data.mere.prenomsMere;
      this.buletinNaissance.dateCopie = data.datePremierCopie;
      
    })
  }
  getAllPremierByParams(value:any){
    this.premierCopieService.getCertificateByID(value).subscribe(data=>{
      
      this.buletinNaissance.idPremierCopie = data.idPremierCopie;
      
      this.buletinNaissance.nomPersonne = data.enfant.nomEnfant;
      this.buletinNaissance.prenomsPersonne = data.enfant.prenomsEnfant;
      this.buletinNaissance.dateNaissPersonne = data.enfant.datenaissEnfant;
      this.buletinNaissance.lieuNaissPersonne = data.enfant.lieunaissEnfant;
      this.buletinNaissance.nomPere = data.pere.nomPere;
      this.buletinNaissance.prenomsPere = data.pere.prenomsPere;
      this.buletinNaissance.nomMere = data.mere.nomMere;
      this.buletinNaissance.prenomsMere = data.mere.prenomsMere;
      this.buletinNaissance.dateCopie = data.datePremierCopie;
    })
  }

  OpenDialog(){
    const dialogRef = this.dialog.open(AfficheCopieComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '90%',
      width: '85%',
      panelClass: 'full-screen-modal',
      data : [this.buletinNaissance, this.creatorOptions]
    });

  } 
  public getAllBulletinNaissance(size:number, page:number) {
    this.bulletinService.getAllBulletin(size,page).subscribe((data: any) => {
      this.tableData = data.data;
    });
  }

  public saveBulletinNaissance(){
    this.bulletinservice.saveBulletin(this.buletinNaissance).subscribe(data=>{
      this.buletinNaissance = data;
    });
  }
}



@Component({
  selector: 'bulletin-naissance',
  templateUrl: 'bulletin-naissance.component.html',
})
export class AfficheCopieComponent {
  constructor(@Inject (MAT_DIALOG_DATA) public data: any, private bulletinservice: BulletinNaissanceService,
   public dialog: MatDialog, private router:Router  ) {}
sender:any; 
option: any;
options: any;
today = new Date();
jour:any;
mois:any;
moisString:any;
annee:any;
dateCreation:any;

  ngOnInit() {  
  
	  this.sender = this.data[0],
	  this.options = this.data[1],
	  this.option = { month: 'long' };
	  this.mois = this.today.toLocaleString('fr-FR', this.option);

		this.jour = this.today.getDate();
		this.moisString = this.mois;
		this.annee = this.today.getFullYear();	
  }

  saveBulletin(){
    console.log('=============== saveBulletin =====================');
    console.log(this.data[0]);
    
    console.log('====================================');
    this.bulletinservice.addBuletinNessanace(this.data[0]).subscribe(data=>{
      const dialogRef = this.dialog.closeAll();
      this.router.navigate(['/dashboard/bulletin-naissance-list']);
    })
  
  }
}
