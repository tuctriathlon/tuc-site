import {AlertType} from './AlertType.enum';

export class Alert {
  public message: string;
  public alertId: string;
  type: AlertType;
  keepAfterRouteChange: boolean;

  constructor(data?: Partial<Alert>) {
    Object.assign(this, data);
  }
}
