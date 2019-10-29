import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { url } from 'inspector';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
 /** DELETE: delete the hero from the server */

 ID:number = 0;
 httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };
 /* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
 deleteHero (hero: Hero): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}
  
  addHero(arg0: Hero):Observable<Hero> {

    return this.http.post<Hero>(this.heroesUrl,arg0,this.httpOptions).pipe(
      tap(_=>this.log('added Hero object'),
      catchError(this.handleError('error with added hero object')))
    )
  }
  
  /** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
    private heroesUrl = 'api/heroes';
  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
    getHero(id: number):Observable<Hero> {
    this.ID=id;
      this.log(`fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url);

  }

  getHeroes():Observable< Hero[]>{
    //TODO: send the message _after_fetching the heroes
    this.log(" fetched heroes");
    return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeores',[])));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
