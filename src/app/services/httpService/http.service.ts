import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

/**
 * Сервис обработки запросов
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * Путь к серверу
   */
  private readonly server: string = '';

  /**
   * Конструктор
   * @param http экземпляр класса HttpClient
   */
  public constructor(private http: HttpClient) {
    this.server = 'http://localhost:3000';
  }

  /**
   * функция получения данных с сервера
   * @return Array данных
   */
  public getData(): any {
    const arrayRequests = [
      this.http.get(this.server + '/sankey'),
      this.http.get(this.server + '/sections'),
    ];
    return forkJoin(arrayRequests);
  }
}
