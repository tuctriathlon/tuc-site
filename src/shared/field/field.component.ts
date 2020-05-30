import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() field: {name: string, type: string; value: any};
  constructor() { }

  ngOnInit(): void {
  }

  get isFile() {
    return this.field.type === 'file';
  }

  get isImage() {
    return this.isFile && /^image\//.test(this.field.value.type);
  }

  get isGPX() {
    return this.isFile && this.field.value.type === 'application/gpx';
  }
}
