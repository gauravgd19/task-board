import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBucketComponent } from './add-bucket/add-bucket.component';
import { FormsModule } from '@angular/forms';
import { DeleteCardComponent } from './delete-card/delete-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBucketComponent,
    DeleteCardComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule,
    FormsModule,
    DragDropModule
  ],
  entryComponents: [AddBucketComponent, DeleteCardComponent],
  exports: [DragDropModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
