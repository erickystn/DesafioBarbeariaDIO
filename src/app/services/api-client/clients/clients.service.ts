import { Injectable } from '@angular/core';
import { IClientService } from './iclients.service';
import { Observable } from 'rxjs';
import {
  SaveClientRequest,
  SaveClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
  ListClientResponse,
  DetailClientResponse,
} from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ClientsService implements IClientService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Save a new client.
   * @param request - The client data to save.
   * @returns An observable that emits the saved client data.
   */
  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(
      `${this.baseUrl}clients`,
      request
    );
  }

  /**
   * Update a client by ID.
   * @param id - The ID of the client to update.
   * @param request - The updated client data.
   * @returns An observable that emits the updated client data.
   */
  update(
    id: number,
    request: UpdateClientRequest
  ): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(
      `${this.baseUrl}clients/${id}`,
      request
    );
  }

  /**
   * Delete a client by ID.
   * @param id - The ID of the client to delete.
   * @returns An observable that completes when the client is deleted.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}clients/${id}`);
  }
  /**
   * Get a list of clients.
   * @returns An observable that emits an array of client data.
   */
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.baseUrl}clients`);
  }
  /**
   * Get a client by ID.
   * @param id - The ID of the client to retrieve.
   * @returns An observable that emits the client data.
   */
  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.baseUrl}clients/${id}`);
  }
}
