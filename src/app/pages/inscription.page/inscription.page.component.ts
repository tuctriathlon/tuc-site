import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ParametreInscritpionService} from '../../services/parametre-inscritpion.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {utc} from 'moment';

@Component({
  selector: 'app-inscription.page',
  templateUrl: './inscription.page.component.html',
  styleUrls: ['./inscription.page.component.css']
})
export class InscriptionPageComponent implements OnInit {
  profileFrom: FormGroup;
  isOpen$: Observable<boolean>;
  constructor(private fb: FormBuilder, private parametreInscritpionService: ParametreInscritpionService) {
    this.profileFrom = this.fb.group({
      category: new FormControl('', [Validators.required]),
      cotisation: new FormControl(null),
      status: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.profileFrom.setValidators(this.isValide);
    this.isOpen$ = this.parametreInscritpionService.getById(1).pipe(
      map(params => params.ouvert && utc().isSameOrBefore(utc(params.fermeture), 'day')
      )
    );
  }

  get isAdult(): boolean {
    return this.profileFrom.get('category').value === 'adulte';
  }

  get needLicence(): boolean {
    return this.isAdult && this.profileFrom.get('cotisation').value === false;
  }

  isValide(control: FormGroup): ValidationErrors | null {
    const dateAncien = utc('15/06/2020', 'DD/MM/YYYY');
    const dateNouveau = utc('14/07/2020', 'DD/MM/YYYY');
    const category = control.get('category').value;
    const cotisation = control.get('cotisation').value;
    const status = control.get('status').value;
    if (category === 'enfant') {
      return {childError: true};
    }
    if (cotisation === null) {
      return {required: true};
    } else if (cotisation === true) {
      return utc().diff(dateAncien, 'day') < 0 ? {dateError: {status: 'cotisations', date: dateAncien.format('DD/MM/YYYY')}} : null;
    }
    switch (status) {
      case 'anciens':
        return utc().diff(dateAncien, 'day') < 0 ? {dateError: {status, date: dateAncien.format('DD/MM/YYYY')}} : null;
      case 'nouveaux':
        return utc().diff(dateNouveau, 'day') < 0 ? {dateError: {status, date: dateNouveau.format('DD/MM/YYYY')}} : null;
      case 'mutations':
        return utc().diff(dateNouveau, 'day') < 0 ? {dateError: {status, date: dateNouveau.format('DD/MM/YYYY')}} : null;
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
        url = 'inscriptions+club-nouveaux';
        break;
      case 'mutations':
        url = 'inscriptions+club-mutation';
        break;
      default:
        if (this.profileFrom.get('cotisation').value) {
          url = 'inscriptions+club-cotisations';
        }
        break;
    }
    window.open(`https://secure.gipco-adns.com/site/7649/${url}`, '_parent');
  }

}
