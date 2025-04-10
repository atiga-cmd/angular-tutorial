import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CandidatureService } from '../services/candidature.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  candidatures: any[] = [];
  id_candidat: number = 1;

  constructor(private candidatureService: CandidatureService) { }

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures() {
    this.candidatureService.getCandidaturesByCandidat(this.id_candidat)
      .subscribe(
        (data) => {
          this.candidatures = data;
        },
        (error) => {
          console.error('Error retrieving candidatures:', error);
        }
      );
  }

  deleteCandidature(id_candidature: number) {
    this.candidatureService.deleteCandidature(id_candidature)
      .subscribe(
        (response) => {
          console.log('Candidature successfully deleted');
          this.loadCandidatures();
        },
        (error) => {
          console.error('Error deleting candidature:', error);
        }
      );
  }
}
