import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToImageService {

  private apiUrl = 'API_URL';
  private apiKey = 'API_KEY';

  constructor(private http: HttpClient) {}

  generateImage(prompt: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.post(this.apiUrl, { inputs: prompt }, { headers, responseType: 'blob' });
  }
}


