import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [PostComponent]
})
export class PostModule {
}
