
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
export class MessagescandComponent implements OnInit {
  messages: any[] = [];
  idCandidat: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.idCandidat = +storedId;
      this.chargerMessages();
    } else {
      console.warn("Aucun ID de candidat trouvé dans le localStorage !");
    }
  }

  chargerMessages() {
    this.http.get<any[]>(`http://localhost:5000/api/messages-candidat/${this.idCandidat}`).subscribe(data => {
      this.messages = data;
    });
  }
}
