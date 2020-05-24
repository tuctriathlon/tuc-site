import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-inscription.page',
  templateUrl: './inscription.page.component.html',
  styleUrls: ['./inscription.page.component.css']
})
export class InscriptionPageComponent implements OnInit {
  profileFrom: FormGroup;
  constructor(private fb: FormBuilder) {
    this.profileFrom = this.fb.group({
      category: new FormControl('', [Validators.required]),
      cotisation: new FormControl(null),
      status: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.profileFrom.setValidators(this.isValide);

  }

  get isAdult(): boolean {
    return this.profileFrom.get('category').value === 'adulte';
  }

  get needLicence(): boolean {
    return this.isAdult && this.profileFrom.get('cotisation').value === false;
  }

  isValide(control: FormGroup): ValidationErrors | null {
    const dateAncien = moment('01/06/2020', 'DD/MM/YYYY');
    const dateNouveau = moment('01/07/2020', 'DD/MM/YYYY');
    const category = control.get('category').value;
    const cotisation = control.get('cotisation').value;
    const status = control.get('status').value;
    if (category === 'enfant') {
      return {childError: true};
    }
    if (cotisation === null) {
      return {required: true};
    } else if (cotisation === true) {
      return moment().diff(dateAncien, 'day') < 0 ? {dateError: {status: 'cotisations', date: dateAncien.format('DD/MM/YYYY')}} : null;
    }
    switch (status) {
      case 'anciens':
        return moment().diff(dateAncien, 'day') < 0 ? {dateError: {status, date: dateAncien.format('DD/MM/YYYY')}} : null;
      case 'nouveaux':
        return moment().diff(dateNouveau, 'day') < 0 ? {dateError: {status, date: dateNouveau.format('DD/MM/YYYY')}} : null;
      case 'mutations':
        return moment().diff(dateNouveau, 'day') < 0 ? {dateError: {status, date: dateNouveau.format('DD/MM/YYYY')}} : null;
      default:
        return {required: true};
    }
  }

  onSubmit() {
    let url = '';
    switch (this.profileFrom.get('status').value) {
      case 'anciens':
        url = 'inscriptions+club-ancien';
        break;
      case 'nouveaux':
        url = 'inscriptions+club-nouveau';
        break;
      case 'mutations':
        url = 'inscriptions+club-mutation';
        break;
      default:
        if (this.profileFrom.get('cotisation').value) {
          url = 'inscriptions+club-ancien';
        }
        break;
    }
    window.open(`https://secure.gipco-adns.com/site/7621/${url}`, '_self');
  }

}
