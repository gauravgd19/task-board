import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBucketComponent } from './add-bucket/add-bucket.component'
import { DeleteCardComponent } from './delete-card/delete-card.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isHideThree: boolean;
  duplicateName: boolean;
  bucketOne: string;
  bucketTwo: string;
  bucketThree: string;
  bucketOneEnable: boolean;
  bucketTwoEnable: boolean;
  bucketThreeEnable: boolean;
  borderInput: boolean;
  dialogConfig;
  isDark: boolean;
  noNameCard: string = 'Please enter card name';
  duplicateMessage: string = 'List name already exists!';

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private _snackBar: MatSnackBar) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

  }

  ngOnInit() {

  }

  toggleTheme(): void {
    if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
      this.overlay.getContainerElement().classList.remove("dark-theme");
      this.overlay.getContainerElement().classList.add("light-theme");
    } else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
      this.overlay.getContainerElement().classList.remove("light-theme");
      this.overlay.getContainerElement().classList.add("dark-theme");
    } else {
      this.overlay.getContainerElement().classList.add("light-theme");
    }
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
    this.isDark = !this.isDark;
  }

  statusForm = new FormGroup({
    toDo: new FormArray([])
  })
  progressForm = new FormGroup({
    progress: new FormArray([])
  })
  doneForm = new FormGroup({
    done: new FormArray([])
  })
  openDialog() {
    this.dialog.open(AddBucketComponent, this.dialogConfig).afterClosed().subscribe(res => {
      this.bucketTitle = res;

      if (this.bucketArray.includes(this.bucketTitle)) {
        this.duplicateName = true;
        this.openSnackBar(this.duplicateMessage, 'dismiss')
        this.duplicateMessage = "List name already exists!"
      } else { this.duplicateName = false }
      if (this.bucketTitle && !this.duplicateName) {
        this.addBucket();
      }
      if (this.bucketArray.length === 1) {
        this.bucketOne = this.bucketTitle;
        this.bucketOneEnable = true;
      }
      if (this.bucketArray.length === 2) {
        this.bucketTwo = this.bucketTitle;
        this.bucketTwoEnable = true;
      }
      if (this.bucketArray.length === 3) {
        this.bucketThree = this.bucketTitle;
        this.bucketThreeEnable = true;
      }
    });
  }
  addBucket() {
    this.bucketArray.push(this.bucketTitle);
    if (this.bucketArray.length === 3) {
      this.isDisable = true;
    }
  }

  openInput(bucket) {
    if (bucket === this.bucketOne) {
      this.isHide = true;
    }
    else if (bucket === this.bucketTwo) {
      this.isHideTwo = true;
    }
    else if (bucket === this.bucketThree) {
      this.isHideThree = true;
    }
  }

  addLists(status, bucket: string) {
    if (status.value) {
      if (bucket === this.bucketOne) {
        this.titles.push(new FormControl(status.value));
      }
      else if (bucket === this.bucketTwo) {
        this.progress.push(new FormControl(status.value));
      }
      else if (bucket === this.bucketThree) {
        this.done.push(new FormControl(status.value));
      }
    } else if (!status.value) {
      this.openSnackBar(this.noNameCard, 'dismiss')
      this.noNameCard = "Please enter card name"
    }
    status.value = ''
  }

  updateCard(i, cardBelongs) {
    if (cardBelongs === this.bucketOne) {
      this.dialog.open(AddBucketComponent).afterClosed().subscribe(res => {
        this.titles.push(new FormControl(res));
        this.titles.removeAt(i);
      });
    }
    if (cardBelongs === this.bucketTwo) {
      this.dialog.open(AddBucketComponent).afterClosed().subscribe(res => {
        this.progress.push(new FormControl(res));
        this.progress.removeAt(i);
      });
    }
    if (cardBelongs === this.bucketThree) {
      this.dialog.open(AddBucketComponent).afterClosed().subscribe(res => {
        this.done.push(new FormControl(res));
        this.done.removeAt(i);
      });
    }
  }

  updateList(bucketName) {
    if (bucketName === this.bucketOne) {
      this.dialog.open(AddBucketComponent, this.dialogConfig).afterClosed().subscribe(res => {
        this.bucketOne = res;
      })
    }
    else if (bucketName === this.bucketTwo) {
      this.dialog.open(AddBucketComponent).afterClosed().subscribe(res => {
        this.bucketTwo = res;
      })
    }
    else if (bucketName === this.bucketThree) {
      this.dialog.open(AddBucketComponent).afterClosed().subscribe(res => {
        this.bucketThree = res;
      })
    }
  }

  removeLists(toDo: FormControl, cardBelongs) {
    this.dialog.open(DeleteCardComponent).afterClosed().subscribe(res => {
      const delConf = res;
      if (delConf === 'Yes') {
        if (cardBelongs === this.bucketOne) {
          let index = this.titles.controls.indexOf(toDo);
          this.titles.removeAt(index);
        }
        else if (cardBelongs === this.bucketTwo) {
          let index = this.progress.controls.indexOf(toDo);
          this.progress.removeAt(index);
        }
        else if (cardBelongs === this.bucketThree) {
          let index = this.titles.controls.indexOf(toDo);
          this.done.removeAt(index);
        }
      }
    })
  }

  removeBucket(i) {
    this.dialog.open(DeleteCardComponent).afterClosed().subscribe(res => {
      const delConf = res;
      if (delConf === 'Yes') {
        if (i === this.bucketOne) {
          this.bucketOneEnable = false;
        } else if (i === this.bucketTwo) {
          this.bucketTwoEnable = false;
        } else if (i === this.bucketThree) {
          this.bucketThreeEnable = false;
        }
        this.bucketArray.splice(i, 1);
        this.isDisable = false;
      }
    })

  }

  get titles() {
    return this.statusForm.get('toDo') as FormArray
  }

  get progress() {
    return this.progressForm.get('progress') as FormArray
  }

  get done() {
    return this.doneForm.get('done') as FormArray
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
