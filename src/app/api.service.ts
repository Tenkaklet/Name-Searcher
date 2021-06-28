import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://api.datamuse.com/words?';

  constructor(private http: HttpClient) { }

  getSimilar(sentence: any) {
    return this.http.get(this.apiUrl + 'ml=' + sentence);
  }

  relatedSpelling(word: string) {
    const related = word.substr(0, 1);
    return this.http.get(`${this.apiUrl}ml=${word}&sp=${related}*`);
  }

  adjectives(word: string) {
    return this.http.get(`${this.apiUrl}rel_jjb=${word}`);
  }

  searchDomains(keywords: string) {
    return this.http.get(`https://domainr.p.rapidapi.com/v2/search?mashape-key=g5EmMklvTxmshaeUxb08554AxZkep10CmVYjsn79N8yPZgem0B&query=${keywords}`);
  }

  checkAvailability(site: string) {
    return this.http.get(`https://domainr.p.rapidapi.com/v2/status?mashape-key=g5EmMklvTxmshaeUxb08554AxZkep10CmVYjsn79N8yPZgem0B&domain=${site}`);
  }
}
