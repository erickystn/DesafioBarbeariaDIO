import { Injectable } from "@angular/core";
import { IScheduleService } from "./ischedules.service";
import { Observable } from "rxjs";
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from "./schedule.models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class ScheduleService implements IScheduleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> {
   return this.http.post<SaveScheduleResponse>(
      `${this.baseUrl}schedules`, request);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}schedules/${id}`);
  }
  listInMonth(
    year: number,
    month: number
  ): Observable<ScheduleAppointmentMonthResponse[]> {
    return this.http.get<ScheduleAppointmentMonthResponse[]>(
      `${this.baseUrl}schedules/?year=${year}&month=${month}`
    );
  }
  findById(id: number): Observable<SaveScheduleResponse> {
    throw new Error('Method not implemented.');
  }
}
