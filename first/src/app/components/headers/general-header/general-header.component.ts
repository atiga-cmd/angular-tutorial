import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-header',
standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './general-header.component.html',
  styleUrl: './general-header.component.css'
})
export class GeneralHeaderComponent {

}
