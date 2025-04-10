import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recruteur-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruteur-header.component.html',
  styleUrls: ['./recruteur-header.component.css']
})
export class RecruteurHeaderComponent { }
