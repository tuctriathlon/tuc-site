import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  get baseUrl(): string {
    return [environment.directusUrl, environment.directusProject, 'mail'].join('/');
  }

  sendEmail(to: string[], subject: string, body: string, data: any): Observable<any> {
    return this.http.post(this.baseUrl, {
      to,
      subject,
      body,
      type: 'html',
      data
    });
  }

  /**
   * envoie le mail de creation de compte
   * @param email email de l'utilisateur
   * @param fullName prénom  nom
   */
  createAccountMail(email: string, fullName: string): Observable<any> {
    return this.sendEmail([email], 'Nouveau compte TUC Triathlon', MAIL_CREATE_USER, { fullName });
  }
}

const MAIL_CREATE_USER = '<p>Bonjour {{fullName}},<p>' +
  '<p>Vous avez un nouveau compte sur le site du TUC Triathlon</p>' +
  '<p>Votre identifiant est cette adresse mail, veuillez générer un nouveau mot de passe sur la page de connexion</p>' +
  '<p>Sportivement</p>' +
  '<p>Le TUC Triathlon</p>';
