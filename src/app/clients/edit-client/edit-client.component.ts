import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { ClientModelForm } from '../client.models';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
  providers: [
    {
      provide: SERVICES_TOKEN.HTTP.CLIENT,
      useClass: ClientsService,
    },
    {
      provide: SERVICES_TOKEN.SNACKBAR,
      useClass: SnackbarManagerService,
    },
  ],
})
export class EditClientComponent implements OnDestroy, OnInit {
  client: ClientModelForm = {
    name: '',
    email: '',
    phone: '',
  };
  private httpSubscriptions: Subscription[]=[];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly service: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbar: ISnackbarManagerService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackbar.show('ID do cliente não encontrado!');
      this.router.navigate(['clients/list']);
      return;
    }

    this.httpSubscriptions.push( this.service
      .findById(Number(id))
      .subscribe((client) => (this.client = client)));
  }

  onSubmitClient(client: ClientModelForm) {
    const { id, ...request } = client;
    if (!id) {
      this.snackbar.show('Erro ao atualizar cliente! ID não encontrado!');
      this.router.navigate(['clients/list']);
      return;
    }
    this.httpSubscriptions.push( this.service
      .update(id, { id, ...request })
      .subscribe((_) => {
        this.snackbar.show('Cliente atualizado com sucesso!');
        this.router.navigate(['clients/list']);
      }));
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
    this.httpSubscriptions = [];
  }
}
