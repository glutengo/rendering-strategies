import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PostListComponent]
})
export class PostListModule { }
