import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.css']
})
export class AddBucketComponent implements OnInit {
  description: string;
  bucketName: string;
  constructor() { }

  ngOnInit(): void {
    this.description = 'Please enter name to add/update';
  }
  addBucket(val){
    this.bucketName = val;
  }
}
