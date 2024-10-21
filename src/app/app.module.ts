import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { BlogMainComponent } from './Components/blog-main/blog-main.component';
import { TruncatePipe } from './CustomPipes/truncate.pipe';
import { BlogCardComponent } from './Components/blog-card/blog-card.component';
import { BlogAddEditComponent } from './Components/blog-add-edit/blog-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    BlogMainComponent,
    TruncatePipe,
    BlogCardComponent,
    BlogAddEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
