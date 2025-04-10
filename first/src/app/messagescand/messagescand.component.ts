
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CandidatureService } from '../services/candidature.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-messagescand',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './messagescand.component.html',
  styleUrl: './messagescand.component.css'
})
export class MessagescandComponent {

}
