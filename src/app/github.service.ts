import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl = '/api/github';

  constructor(private http: HttpClient) { }

  getStatus(githubId: string | null) {
    return this.http.get(`${this.baseUrl}/status?githubId=${githubId}`);
  }

  
  removeIntegration(githubId: string) {
    localStorage.removeItem('githubId')
    return this.http.delete(`${this.baseUrl}/remove`, {body: { githubId}});
  }


}
