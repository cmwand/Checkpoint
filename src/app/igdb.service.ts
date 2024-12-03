import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class IgdbService {
  private gamesUrl = environment.igdb.gamesUrl;
  private trendingUrl = environment.igdb.trendingUrl;
  private headers = new HttpHeaders({
    'Client-ID': environment.igdb.clientId,
    'Authorization': `Bearer ${environment.igdb.token}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  searchGames(query: string): Observable<any[]> {
    const body = `
      search "${query}";
      fields id, name, cover.url, first_release_date;
      limit 20;
    `;
    return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
  }


  getGameDetails(gameId: number): Observable<any | null> {
    const body = `
      fields id, name, summary, first_release_date, cover.url, platforms.id, platforms.name, genres.id, genres.name, screenshots.url, involved_companies.company.name, category, parent_game.name, parent_game.id;
      where id = ${gameId};
    `;

    return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers }).pipe(
      map(response => {
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
      }),
    );
  }

  getTrendingGames(): Observable<any[]> {
    const popularityBody = `
      fields game_id, value, popularity_type;
      sort value desc;
      where popularity_type = 1 | popularity_type = 3;
      limit 20;
    `;
  
    return this.http.post<any[]>(this.trendingUrl, popularityBody, { headers: this.headers }).pipe(
      map((popularityData) => {
        if (!popularityData || popularityData.length === 0) {
          throw new Error("Nenhum dado de popularidade encontrado.");
        }
        const gameIds = popularityData.map((item) => item.game_id);
        return gameIds;
      }),
      switchMap((gameIds) => {
        const detailsBody = `
          fields id, name, cover.url, first_release_date, summary, rating, genres.name, platforms.name;
          where id = (${gameIds.join(',')});
        `;
        return this.http.post<any[]>(this.gamesUrl, detailsBody, { headers: this.headers });
      }),
      map((games) => {
        if (!games || games.length === 0) {
          throw new Error("Nenhum detalhe de jogo encontrado.");
        }
        games.forEach(game => {
          if (game.cover && game.cover.url) {
            game.cover.url = game.cover.url.replace(/t_[^/]+/, 't_original');
          }
        });
  
        return games;
      })
    );
  }
  
  

  ////////////////////////////////////// Sessão Componentes PLAYSTATION/SONY //////////////////////////////////////////////////////////////////
  getPs1Games() {
    const body = `fields name, cover.url, rating, rating_count;
                sort aggregated_rating desc;
                where rating != null 
                & platforms = (7) 
                & category = (0) 
                & rating_count > 50 
                & rating >= 8;`;
    return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getPs2Games() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (8) 
              & category = (0, 8, 10)
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getPs3Games() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (9) 
              & category = (0, 8) 
              & aggregated_rating_count > 8
              & total_rating >= 8 
              & first_release_date >= 1163203200
              & first_release_date <= 1415664000;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getPspGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (38) 
              & category = (0, 8) 
              & rating_count > 156
              & total_rating >= 8 
              & first_release_date >= 1102819200
              & first_release_date <= 1355107200;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getPsvitaGames() {
  const body = `fields name, cover.url, rating, rating_count;
 sort rating desc;
              where rating != null 
              & platforms = (46) 
              & category = (0, 8) 
              & rating_count > 156
              & total_rating >= 8 
  & first_release_date >= 1324089600
  & first_release_date <= 1576540800;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getPs4Games() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (48) 
              & category = (0, 8, 10) 
              & aggregated_rating_count > 8
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getPs5Games() {
  const body = `fields name, cover.url, rating, rating_count;
              sort aggregated_rating desc;
              where rating != null 
              & platforms = (167) 
              & category = (0, 8, 10) 
              & aggregated_rating_count > 8
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}
/////////////////////////////////////////////////////  Sessão Componentes XBOX  /////////////////////////////////////////////////////////////////////
getXboxGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (11) 
              & category = (0, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getXbox360Games() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (12) 
              & category = (0, 8, 10)
              & rating_count > 120
              & total_rating >= 8
              & first_release_date >= 1163203200
              & first_release_date <= 1415664000;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getXboxoneGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (49) 
              & category = (0, 8, 10)
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getXboxsxGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (169) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}
///////////////////////////////////////////////     Sessão Componentes Nintendo   //////////////////////////////////////////////////////////////////////////

getNesGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (18) 
              & category = (0, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getSnesGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (19) 
              & category = (0, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getn64Games() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (4) 
              & category = (0, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getGbcGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (22) 
              & category = (0, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getGbaGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (24) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getGcGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (21) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getNdsGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (20) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getWiiGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (5) 
              & category = (0, 10) 
              & rating_count > 120
              & total_rating >= 8 
              & first_release_date >= 1163203200
              & first_release_date <= 1415664000;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getn3dsGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (37) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8 
  & first_release_date >= 1324089600
  & first_release_date <= 1576540800;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getWiiuGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (41) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8 
              & first_release_date >= 1324089600
              & first_release_date <= 1735689599;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getSwitchGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (130) 
              & category = (0, 8) 
              & rating_count > 120
              & total_rating >= 8
              & first_release_date >= 1324089600;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}
////////////////////////////////////////////////////////// Componentes PC e Mobile ///////////////////////////////////////////////////////////////////////////
getPcGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (6) 
              & category = (0, 8, 10)
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}

getMobileGames() {
  const body = `fields name, cover.url, rating, rating_count;
              sort rating desc;
              where rating != null 
              & platforms = (34) 
              & category = (0, 8, 10) 
              & rating_count > 120
              & total_rating >= 8;`;
  return this.http.post<any[]>(this.gamesUrl, body, { headers: this.headers });
}
}
