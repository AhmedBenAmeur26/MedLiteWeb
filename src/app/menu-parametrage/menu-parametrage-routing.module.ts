import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuParametrageComponent } from './menu-parametrage.component';
import { CaisseComponent } from './caisse/caisse.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { BanqueComponent } from './banque/banque.component';
import { I18nService } from '../Shared/i18n/i18n.service';
import { NationaliterComponent } from './nationaliter/nationaliter.component';
import { VilleComponent } from './ville/ville.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { SocieteComponent } from './societe/societe.component';
import { ResponsableRemiseComponent } from './responsable-remise/responsable-remise.component';
import { PrestationComponent } from './prestation/prestation.component';
import { OperationComponent } from './operation/operation.component';
import { MedecinComponent } from './medecin/medecin.component';
import { TypeIntervenantComponent } from './type-intervenant/type-intervenant.component';
import { ModeReglementComponent } from './mode-reglement/mode-reglement.component';
 
 

const routes: Routes = [
  { path: '', component: MenuParametrageComponent }
  ,{
    path: 'nationalite',
    component: NationaliterComponent ,
    data:{title:'Nationalité' , icon :'bx bx-map-pin'}
  },
  {
    path: 'ville',
    component: VilleComponent ,
    data:{title:'Ville',icon:'bx bx-map'}
  },
  {
    path: 'cabinet',
    component: CabinetComponent ,
    data:{title:'Cabinet',icon:'bx bxs-door-open'}
  },
  {
    path: 'responsable_remise',
    component: ResponsableRemiseComponent ,
    data:{title:'Responsable remise',icon:'bx bx-user'}
  },
  {
    path: 'societe',
    component: SocieteComponent ,
    data:{title:'Societe',icon:'bx bxs-arch'}
  },
  {
    path: 'caisse',
    component: CaisseComponent ,
    data:{title:'Caisse',icon:'bx bx-list-ul'}
  }
  ,
  {
    path: 'fournisseur',
    component: FournisseurComponent ,
    data:{title:'Fournisseur',icon:'bx bxs-user-badge'}
  }
  ,
  {
    path: 'prestation',
    component: PrestationComponent ,
    data:{title:'Prestation',icon:'bx bx-first-aid'}
  },
  {
    path: 'operation',
    component: OperationComponent ,
    data:{title:'Opération',icon:'bx bx-health'}
  }
  ,
  {
    path: 'type_intervenant',
    component: TypeIntervenantComponent ,
    data:{title:'Type intervenant',icon:'bx bx-menu-alt-left'}
  },
  {
    path: 'medecin',
    component: MedecinComponent ,
    data:{title:'Medecin',icon:'bx bx-group'}
  },
  {
    path: 'banque',
    component: BanqueComponent ,
    data:{title:'Banque',icon:'bx bxs-bank'}
  }
  ,
  {
    path: 'mode_reglement',
    component: ModeReglementComponent ,
    data:{title:'ModeReglement',icon:'bx bx-credit-card'}
  }

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuParametrageRoutingModule { 
  constructor(private i18nService: I18nService) {
    this.translateRouteTitles();
  }

  translateRouteTitles() {
    routes.forEach(route => {
      if (route.data && route.data['title']) {
        route.data['title'] = this.i18nService.getString(route.data['title']);
      }
    });
  }
  

}