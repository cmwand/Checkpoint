import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IgdbService {
  private gamesUrl = environment.igdb.gamesUrl;

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
      limit 20;
    `;

    try {
      const response = await this.http.post<any[]>(this.gamesUrl, body, { headers }).toPromise();
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
      fields id, name, summary, first_release_date, cover.url, screenshots.url, involved_companies.company.name, category, parent_game.name, parent_game.id;
      where id = ${gameId};
    `;

    try {
        const response = await this.http.post<any[]>(this.gamesUrl, body, { headers }).toPromise();
        if (response && response.length > 0) {
            const game = response[0];
            
            if (game.screenshots) {
                game.screenshots = game.screenshots.map((screenshot: any) => ({
                    ...screenshot,
                    url: screenshot.url.replace(/t_[^/]+/, 't_original')
                }));
            }
            if (game.cover && game.cover.url) {
                game.cover.url = game.cover.url.replace(/t_[^/]+/, 't_original');
            }

            return game;
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
        return null;
    }
}
}
