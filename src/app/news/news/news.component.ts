import {Component, Input, OnInit} from '@angular/core';
import {NewsModel} from '../news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() news: NewsModel;
  @Input() titleOnly = false;

  constructor() { }

  ngOnInit(): void {
  }

}
