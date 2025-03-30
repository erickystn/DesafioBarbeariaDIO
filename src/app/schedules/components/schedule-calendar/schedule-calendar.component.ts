import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointmentMonthModel,
  SelectClientModel,
} from '../../schedule.models';
import { CommonModule } from '@angular/common';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.css',

  providers: [
    provideNativeDateAdapter(),
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class ScheduleCalendarComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  private subscriptions: Subscription[] = [];

  displayedColumns: String[] = ['startAt', 'endAt', 'client', 'actions'];
  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>;
  addingSchudele: boolean = false;
  newSchedule: SaveScheduleModel = {
    startAt: undefined,
    endAt: undefined,
    clientId: undefined,
  };

  clientSelectFormControl = new FormControl();

  @Input() monthSchedule!: ScheduleAppointmentMonthModel;
  @Input() clients: SelectClientModel[] = [];

  @Output() onDateChange = new EventEmitter<Date>();
  @Output() onConfirmDelete =
    new EventEmitter<ClientScheduleAppointmentModel>();
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _selected: Date = new Date();
  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManageService: IDialogManagerService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable();
    }
  }
  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private buildTable() {
    const appointments = this.monthSchedule?.scheduledAppointments.filter(
      (a) =>
        this.monthSchedule.year === this._selected.getFullYear() &&
        this.monthSchedule.month - 1 === this._selected.getMonth() &&
        a.day === this._selected.getDate()
    );

    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
      appointments
    );
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onTimeChange(time: Date) {
    const endAt = new Date(time);
    endAt.setHours(endAt.getHours() + 1);
    this.newSchedule.endAt = endAt;
  }

  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(
      this.dialogManageService
        .showYesNoDialog(YesNoDialogComponent, {
          title: 'Exclusão de Agendamento',
          content: 'Confirma a exclusão desse agendamento?',
        })
        .subscribe((result) => {
          if (result) {
            this.onConfirmDelete.emit(schedule);
            const updatedList = this.dataSource.data.filter(
              (c) => c.id !== schedule.id
            );
            this.dataSource =
              new MatTableDataSource<ClientScheduleAppointmentModel>(
                updatedList
              );
          }
        })
    );
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(
      this.newSchedule.startAt!.getHours(),
      this.newSchedule.startAt!.getMinutes()
    );
    endAt.setHours(
      this.newSchedule.endAt!.getHours(),
      this.newSchedule.endAt!.getMinutes()
    );

    const saved: ClientScheduleAppointmentModel = {
      id: -1,
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find((c) => c.id === this.newSchedule.clientId!)!
        .name,
    };

    this.onScheduleClient.emit(saved);
    this.buildTable();
    form.resetForm();
    this.newSchedule = {
      clientId: undefined,
      endAt: undefined,
      startAt: undefined,
    };
  }

  get selected(): Date {
    return this._selected;
  }

  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this.onDateChange.emit(selected);
      this.buildTable();
      this._selected = selected;
    }
  }
}
