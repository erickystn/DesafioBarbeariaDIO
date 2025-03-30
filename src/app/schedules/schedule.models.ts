export interface ScheduleAppointmentMonthModel {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointmentModel[];
}

export interface ClientScheduleAppointmentModel {
  id: number;
  clientId: number;
  clientName: string;
  day: number;
  startAt: Date;
  endAt: Date;
}

export interface SaveScheduleModel {
  clientId?: number;
  startAt?: Date;
  endAt?: Date;
}

export interface SelectClientModel {
  id: number;
  name: string;
}
