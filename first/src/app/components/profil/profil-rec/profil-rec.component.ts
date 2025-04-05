import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-rec',
  templateUrl: './profil-rec.component.html',
  styleUrls: ['./profil-rec.component.css'],
})
export class ProfilRecComponent implements OnInit {
  recruteur: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(localStorage.getItem('userId')); 
    
    console.log('userId',id)// Récupération de l'ID


    if (id) {
      this.userService.getRecruteurById(id).subscribe(
        (data) => {       
          this.recruteur = data as any;  
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil recruteur', error);
        }
      );
    }
  }


 
}
