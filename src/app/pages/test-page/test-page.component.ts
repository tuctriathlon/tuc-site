import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestModel} from '../../models/test.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit, OnDestroy {
  substrions: Subscription[];
  tests: TestModel[];
  selectedTest: TestModel;
  constructor(private testService: TestService) {
    this.tests = [];
    this.substrions = [];
  }

  ngOnInit(): void {
    this.substrions.push(this.testService.getAll().subscribe(tests => this.tests = tests));
  }

  ngOnDestroy(): void {
    this.substrions.forEach(s => s.unsubscribe());
  }

  deleteItem(id: number) {
    this.substrions.push(this.testService.deleteItem(id).subscribe(_ => this.tests = this.tests.filter(i => i.id === id)));
  }

  saveItem(item: TestModel) {
    if (item.id) {
      this.substrions.push(this.testService.updateItem(item).subscribe(savedItem => {
        const index = this.tests.findIndex(i => i.id === item.id);
        this.tests.splice(index, 1, savedItem);
      }));
    } else {
      this.substrions.push(this.testService.addItem(item).subscribe(savedItem => this.tests.push(savedItem)));
    }
  }

  createItem() {
    this.selectedTest = new TestModel();
  }

}
