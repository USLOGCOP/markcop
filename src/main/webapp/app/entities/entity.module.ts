import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.MarkcopProjectModule),
      },
      {
        path: 'label',
        loadChildren: () => import('./label/label.module').then(m => m.MarkcopLabelModule),
      },
      {
        path: 'ticket',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.MarkcopTicketModule),
      },
      {
        path: 'attachment',
        loadChildren: () => import('./attachment/attachment.module').then(m => m.MarkcopAttachmentModule),
      },
      {
        path: 'comment',
        loadChildren: () => import('./comment/comment.module').then(m => m.MarkcopCommentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MarkcopEntityModule {}
