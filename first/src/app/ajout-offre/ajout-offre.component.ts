/*

import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjoutOffre } from '../ajout-offre.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-ajout-offre',
  templateUrl: './ajout-offre.component.html',
  styleUrls: ['./ajout-offre.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AjouterOffreComponent implements OnInit {
  nomEntreprise: string = '';
  local: string = '';
  typePoste: string = '';
  missions: string = '';
  competences: string = '';
  domaine: string = '';
  salaire: number = 0;
  statut: string = 'active'; 
  datePublication: string = new Date().toISOString().split('T')[0];
  recruteurId: string | null = null;

  constructor(
    private http: HttpClient,
    private ajoutOffreService: AjoutOffre, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}


  ngOnInit(): void {
    // Vérifiez si nous sommes sur la plateforme du navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.recruteurId = localStorage.getItem('userId');
    }
    console.log('Recruteur ID récupéré:', this.recruteurId);  // Vérification de la récupération de l'ID
  }
  ajouterOffre() {
    console.log('📤 بداية إرسال العرض...');
  
    if (this.recruteurId) {
      const offre = {
        nomEntreprise: this.nomEntreprise,
        local: this.local,
        typePoste: this.typePoste,
        missions: this.missions,
        competences: this.competences,
        domaine: this.domaine,
        salaire: this.salaire,
        statut: this.statut,
        datePublication: new Date().toISOString().split('T')[0], // تاريخ اليوم
        id_rec: parseInt(this.recruteurId)
      };
  
      console.log('✅ العرض المُرسل:', offre);
  
      this.ajoutOffreService.ajouterOffre(offre).subscribe({
        next: (response) => {
          console.log('🎯 العرض أُضيف بنجاح', response);
  
          // 🧹 نفرغ الفورم بعد نجاح الإضافة
          this.resetForm();
  
          // 🔀 ننتقل تلقائيًا إلى صفحة mes-offres
          this.router.navigate(['/mes-offres']).then(() => {
            console.log('✅ تم الانتقال إلى صفحة mes-offres');
          });
        },
        error: (error) => {
          console.error('❌ خطأ أثناء إضافة العرض', error);
          alert('حدث خطأ أثناء إضافة العرض.');
        }
      });
    } else {
      console.log('❌ لم يتم العثور على معرف المُشغل (recruteur)');
      alert('يجب عليك تسجيل الدخول لإضافة عرض.');
    }
  }
  
  resetForm() {
    this.nomEntreprise = '';
    this.local = '';
    this.typePoste = '';
    this.missions = '';
    this.competences = '';
    this.domaine = '';
    this.salaire = 0;
    this.statut = 'active'; // يمكنك أيضاً إعادة الحالة للوضع الإفتراضي
  }
}  */

  import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjoutOffre } from '../ajout-offre.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-ajout-offre',
  templateUrl: './ajout-offre.component.html',
  styleUrls: ['./ajout-offre.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AjouterOffreComponent implements OnInit {
  nomEntreprise: string = '';
  local: string = '';
  typePoste: string = '';
  missions: string = '';
  competences: string = '';
  domaine: string = '';
  salaire: number = 0;
  statut: string = 'active'; 
  datePublication: string = new Date().toISOString().split('T')[0];
  
  // Propriété utilisée dans le composant
  recruteurId: string | null = null;

  // Ajoutez un getter pour exposer la propriété sous le nom userId (option 2)
  get userId(): string | null {
    return this.recruteurId;
  }

  constructor(
    private http: HttpClient,
    private ajoutOffreService: AjoutOffre, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Vérifier que nous sommes sur la plateforme du navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.recruteurId = localStorage.getItem('userId');
    }
    console.log('Recruteur ID récupéré:', this.recruteurId);
  }
  
  ajouterOffre() {
    console.log('📤 début de l\'envoi de l\'offre...');
  
    if (this.recruteurId) {
      const offre = {
        nomEntreprise: this.nomEntreprise,
        local: this.local,
        typePoste: this.typePoste,
        missions: this.missions,
        competences: this.competences,
        domaine: this.domaine,
        salaire: this.salaire,
        statut: this.statut,
        datePublication: new Date().toISOString().split('T')[0],
        id_rec: parseInt(this.recruteurId)
      };
  
      console.log('✅ Offre envoyée:', offre);
  
      this.ajoutOffreService.ajouterOffre(offre).subscribe({
        next: (response) => {
          console.log('🎯 Offre ajoutée avec succès', response);
          this.resetForm();
          this.router.navigate(['/mes-offres']).then(() => {
            console.log('✅ Navigation vers la page mes-offres réussie');
          });
        },
        error: (error) => {
          console.error('❌ Erreur lors de l\'ajout de l\'offre', error);
          alert('Une erreur est survenue lors de l\'ajout de l\'offre.');
        }
      });
    } else {
      console.log('❌ Aucun identifiant de recruteur trouvé.');
      alert('Vous devez être connecté pour ajouter une offre.');
    }
  }
  
  resetForm() {
    this.nomEntreprise = '';
    this.local = '';
    this.typePoste = '';
    this.missions = '';
    this.competences = '';
    this.domaine = '';
    this.salaire = 0;
    this.statut = 'active';
  }
}
