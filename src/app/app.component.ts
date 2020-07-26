import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBucketComponent } from './add-bucket/add-bucket.component'
import { DeleteCardComponent } from './delete-card/delete-card.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isInput: boolean;
  bucketTitle: string;
  bucketArray = [];
  isDisable: boolean;
  isHide: boolean = false;
  isHideTwo: boolean;
  duplicateName: boolean;
  bucketOne: string;
  bucketTwo: string;
  bucketOneEnable: boolean;
  bucketTwoEnable: boolean;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }
  statusForm = new FormGroup({
    status: new FormArray([])
  })
  progressForm = new FormGroup({
    progress: new FormArray([])
  })

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddBucketComponent, dialogConfig).afterClosed().subscribe(res => {
      this.bucketTitle = res;
      
      if (this.bucketArray.includes(this.bucketTitle)) {
        this.duplicateName = true;
      } else { this.duplicateName = false }
      if (this.bucketTitle && !this.duplicateName) {
        this.addBucket();
      }
      if(this.bucketArray.length ===1){
        this.bucketOne= 'to do';
        this.bucketOneEnable=true;
      }
      if(this.bucketArray.length ===2){
        this.bucketTwo= 'progress';
        this.bucketTwoEnable=true;
      }
    });
  }
  addBucket() {
    this.bucketArray.push(this.bucketTitle);
    if (this.bucketArray.length === 3) {
      this.isDisable = true;
    }
  }

  openInput() {
    this.isHide = true;
    this.isHideTwo= true;
  }

  addStatus(status: HTMLInputElement, bucket:string) {
    if (bucket === 'to do')
    {
      this.titles.push(new FormControl(status.value));
    }
    console.log('value ',status.value);
    if (bucket === 'progress')
    {
      this.progress.push(new FormControl(status.value));
    }
    status.value = ''
  }

  removeStatus(status: FormControl) {
    this.dialog.open(DeleteCardComponent).afterClosed().subscribe(res => {
      const delConf = res;
      if (delConf === 'Yes') {
        let index = this.titles.controls.indexOf(status);
        this.titles.removeAt(index);
      }
    })
  }

  removeBucket(i) {
    this.dialog.open(DeleteCardComponent).afterClosed().subscribe(res => {
      const delConf = res;
      if (delConf === 'Yes') {
        this.bucketArray.splice(i, 1);
        this.isDisable = false;
      }
    })

  }

  get titles() {
    return this.statusForm.get('status') as FormArray
  }

  get progress() {
    return this.progressForm.get('progress') as FormArray
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }
}
