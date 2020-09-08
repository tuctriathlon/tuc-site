import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaqModel} from '../faq.model';
import {FaqService} from '../faq.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {TagService} from '../../shared/tag.service';
import {TagModel} from '../../shared/tag.model';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit, OnDestroy {
  searchText = '';
  selectedTag = null;
  unsubscribe: Subject<void> = new Subject<void>();
  faqs: Observable<FaqModel[]> = new Observable<FaqModel[]>();
  tags: Observable<TagModel[]> = new Observable<TagModel[]>();

  constructor(private faqService: FaqService,
              private tagService: TagService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        this.selectedTag = +params.get('tag');
    });
    this.faqs = this.faqService.getAll().pipe(
      map(faqs => faqs.sort((a,b) => b.priorite - a.priorite))
    );
    this.tags = this.tagService.getAll();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
