@echo off

call ng g c clients/new-client
call ng g c clients/list-clients
call ng g c clients/edit-client
call ng g c clients/components/client-form
call ng g c clients/components/client-table

type nul > src/app/clients/client.models.ts

call ng g c schedules/schedules-month
call ng g c schedules/components/schedule-calendar

type nul > src/app/schedules/schedule.models.ts

call ng g c commons/components/card-header
call ng g c commons/components/menu-bar
call ng g c commons/components/yes-no-dialog

call ng g s services/dialog-manager
call ng g s services/snackbar-manager

call ng g s services/api-client/clients/clients

call ng g s services/api-client/schedules/schedules

type nul > src/app/services/idialog-manager.service.ts
type nul > src/app/services/isnackbar-manager.service.ts
type nul > src/app/services/service.token.ts

type nul > src/app/services/api-client/clients/iclients.service.ts
type nul > src/app/services/api-client/clients/client.models.ts

type nul > src/app/services/api-client/schedules/schedules.service.ts
type nul > src/app/services/api-client/schedules/schedule.models.ts

call npm install @angular/cdk bootstrap ngx-mask