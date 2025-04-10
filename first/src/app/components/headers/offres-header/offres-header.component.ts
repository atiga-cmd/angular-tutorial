import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offres-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offres-header.component.html',
  styleUrls: ['./offres-header.component.css']
})
export class OffresHeaderComponent { }
