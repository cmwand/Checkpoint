// IgdbService

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IgdbService {
  private apiUrl = environment.igdb.apiUrl;

  constructor(private http: HttpClient) {}

  async searchGames(query: string): Promise<any[]> {
    const headers = new HttpHeaders({
      'Client-ID': environment.igdb.clientId,
      'Authorization': `Bearer ${environment.igdb.token}`,
      'Content-Type': 'application/json',
    });

    const body = `
      search "${query}";
      fields id, name, cover.url, first_release_date;
      limit 10;
    `;

    try {
      const response = await this.http.post<any[]>(this.apiUrl, body, { headers }).toPromise();
      return response || [];
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      return [];
    }
  }

  async getGameDetails(gameId: number): Promise<any> {
    const headers = new HttpHeaders({
      'Client-ID': environment.igdb.clientId,
      'Authorization': `Bearer ${environment.igdb.token}`,
      'Content-Type': 'application/json',
    });
  
    const body = `
      fields name, summary, cover.url;
      where id = ${gameId};
    `;
  
    try {
      const response = await this.http.post<any[]>(this.apiUrl, body, { headers }).toPromise();
      return response && response.length > 0 ? response[0] : null;
    } catch (error) {
      console.error('Erro ao buscar detalhes do jogo:', error);
      return null;
    }
  }
  
}
