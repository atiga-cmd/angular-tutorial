import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seconnecter-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seconnecter-header.component.html',
  styleUrls: ['./seconnecter-header.component.css']
})
export class SeconnecterHeaderComponent { }

