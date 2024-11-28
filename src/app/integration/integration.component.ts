import { Component } from '@angular/core';
import { GithubService } from '../github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent {
  status: any = {};
  githubId: string | null = '';

  constructor(
    private location: Location,
    private router: Router,
    private githubService:  GithubService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        console.log('githubId', params['githubId'])
        this.githubId = params['githubId'];
        if (this.githubId) {
          localStorage.setItem('githubId', this.githubId)
        }
      })
      
    }


  ngOnInit() {
    this.githubId = localStorage.getItem('githubId')
    this.githubService.getStatus(this.githubId).subscribe( data => {
      this.status = data;
    });
  }

  connect() {
    window.location.href = 'http://localhost:3000/api/github/authenticate';
  }

  removeIntegration() {
    if (this.status?.integration?.githubId) {
      this.githubService.removeIntegration(this.status.integration.githubId).subscribe(() => {
        this.status = { connected: false};
      })
    }
    this.githubId = '';
    this.location.replaceState(this.router.url.split('?')[0]);
    
  }


}
