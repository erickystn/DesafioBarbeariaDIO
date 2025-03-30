export interface ScheduleAppointmentMonthResponse {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointmentResponse[];
}

export interface ClientScheduleAppointmentResponse {
  id: number;
  clientId: number;
  clientName: string;
  day: number;
  startAt: Date;
  endAt: Date;
}

// export interface ClientScheduleAppointmentDetailResponse {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }

export interface SaveScheduleResponse {
  id: number;
  clientId: number;
  startAt: Date;
  endAt: Date;
}

export interface SaveScheduleRequest {
  clientId: number;
  startAt: Date;
  endAt: Date;
}
