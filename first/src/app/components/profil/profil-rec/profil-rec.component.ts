
/*
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // très important pour *ngIf

@Component({
  selector: 'app-profil-rec',
  templateUrl: './profil-rec.component.html',
  styleUrls: ['./profil-rec.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule], // RouterModule pour routerLink + CommonModule pour *ngIf
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


 
}*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-rec',
  templateUrl: './profil-rec.component.html',
  styleUrls: ['./profil-rec.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class ProfilRecComponent implements OnInit {
  recruteur: any;
  userId: string | null = null; // 🔥 ajouter cette ligne

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); // 🔥 lire localStorage ici

    const id = Number(this.userId);
    console.log('userId', id);

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
