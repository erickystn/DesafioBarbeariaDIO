import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientTableComponent } from '../components/client-table/client-table.component';
import { ClientModelTable } from '../client.models';
import { Router } from '@angular/router';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { subscribeOn, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
  providers: [
    {
      provide: SERVICES_TOKEN.HTTP.CLIENT,
      useClass: ClientsService,
    },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListClientsComponent implements OnInit, OnDestroy {
  private httpSubsctriptions: Subscription[] = [];
  clients: ClientModelTable[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly service: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbar: ISnackbarManagerService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.httpSubsctriptions.push(
      this.service.list().subscribe((clients) => (this.clients = clients))
    );
  }
  ngOnDestroy(): void {
    this.httpSubsctriptions.forEach((sub) => sub.unsubscribe());
  }

  delete(client: ClientModelTable) {
    this.httpSubsctriptions.push(
      this.service.delete(client.id).subscribe((_) => {
        this.snackbar.show(`${client.name} foi removido com suceso!`);

      })
    );
  }

  update(client: ClientModelTable) {
    this.router.navigate(['clients/edit-client/', client.id]);
  }
}
