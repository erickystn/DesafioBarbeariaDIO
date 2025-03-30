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
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientModelTable } from '../../client.models';
import { Subscription } from 'rxjs';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule,MatTooltipModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    {provide: MatPaginatorIntl, useClass: CustomPaginator}
  ],
})
export class ClientTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() clients: ClientModelTable[] = [];
  @Output() onConfirmDelete = new EventEmitter<ClientModelTable>();
  @Output() onRequestUpdate = new EventEmitter<ClientModelTable>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<ClientModelTable>;
  private dialogManagerServiceSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.clients;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }
  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscription) {
      this.dialogManagerServiceSubscription.unsubscribe();
    }
  }

  delete(client: ClientModelTable) {
    this.dialogManagerService.showYesNoDialog(YesNoDialogComponent, {
      title: 'Exclusão de Cliente',
      content: `Você realmente deseja excluir o cliente ${client.name}?`,
    }).subscribe((result) => {
      if (result) {
        this.onConfirmDelete.emit(client);
        const updateList = this.dataSource.data.filter(c => c.id !== client.id);
        this.dataSource = new MatTableDataSource<ClientModelTable>(updateList);
      }
    })
  }
  update(client: ClientModelTable) {
    this.onRequestUpdate.emit(client);
  }

  formatPhone(phone: string): string {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
