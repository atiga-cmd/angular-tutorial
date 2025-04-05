import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidat-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './candidat-header.component.html',
  styleUrls: ['./candidat-header.component.css']
})
export class CandidatHeaderComponent { }
