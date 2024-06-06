import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  CREATE_USER_API = 'https://gk-gaming.onrender.com/api/gk/create-account';
  LOGIN_USER_API = 'https://gk-gaming.onrender.com/api/gk/login';
  CREATE_TEAM_API = 'https://gk-gaming.onrender.com/api/gk/add-team';
  SEND_CONFIRMATION_API =
    'https://gk-gaming.onrender.com/api/gk/get-confirmation';
  DELETE_DB_DATA_API = 'https://gk-gaming.onrender.com/api/gk/delete-db-data';
  GET_REGISTERED_TEAMS_API =
    'https://gk-gaming.onrender.com/api/gk/get-registered-teams';
  GET_PERSONAL_REGISTERED_TEAM_API =
    'https://gk-gaming.onrender.com/api/gk/get-team-details?email=';
  SEND_TOURNAMENT_DETAILS_API =
    'https://gk-gaming.onrender.com/api/gk/post-tournament-details';

  DELETE_EXISTING_TOURNAMENT_DETAILS_API =
    'https://gk-gaming.onrender.com/api/gk/detele-existing-tournament-details';

  GET_TOURNAMENT_DETAILS_API =
    'https://gk-gaming.onrender.com/api/gk/get-tournament-details';

  SEND_REGISTRATION_AMOUNT_API =
    'http://localhost:3000/api/gk/send-tournament-price';

  GET_REGISTRATION_AMOUNT_API = 'http://localhost:3000/api/gk/get-entry-fee';

  DELETE_REGISTRATION_AMOUNT_API =
    'http://localhost:3000/api/gk/delete-registration-price-details';

  // SEND_REGISTRATION_AMOUNT_API =
  //   'https://gk-gaming.onrender.com/api/gk/send-date-time';

  // GET_REGISTRATION_AMOUNT_API = 'https://gk-gaming.onrender.com/api/gk/get-entry-fee';
  // DELETE_REGISTRATION_AMOUNT_API =
  //   'https://gk-gaming.onrender.com/api/gk/delete-registration-price-details';

  constructor(private http: HttpClient) {}

  createAccount(userData: any) {
    return this.http.post(this.CREATE_USER_API, userData);
  }

  loginUser(userData: any) {
    return this.http.post(this.LOGIN_USER_API, userData);
  }

  createTeam(teamData: any) {
    return this.http.post(this.CREATE_TEAM_API, teamData);
  }

  sendConfirmationRequest(requestData: any) {
    return this.http.post(this.SEND_CONFIRMATION_API, requestData);
  }

  deleteDataInDB() {
    return this.http.delete(this.DELETE_DB_DATA_API);
  }

  getRegisteredTeams() {
    return this.http.get(this.GET_REGISTERED_TEAMS_API);
  }

  getPersonalRegisteredTeam(email: any) {
    return this.http.get(this.GET_PERSONAL_REGISTERED_TEAM_API + email);
  }

  sendTournamentDetails(data: any) {
    return this.http.post(this.SEND_TOURNAMENT_DETAILS_API, data);
  }

  deleteExistingTournamentDetails() {
    return this.http.delete(this.DELETE_EXISTING_TOURNAMENT_DETAILS_API);
  }

  getTournamentDetails() {
    return this.http.get(this.GET_TOURNAMENT_DETAILS_API);
  }

  sendRegistrationAmountDetails(price: any) {
    return this.http.post(this.SEND_REGISTRATION_AMOUNT_API, { price: price });
  }

  getRegistrationFee() {
    return this.http.get(this.GET_REGISTRATION_AMOUNT_API);
  }

  deleteRegistrationAmountDetails() {
    return this.http.delete(this.DELETE_REGISTRATION_AMOUNT_API);
  }
}
