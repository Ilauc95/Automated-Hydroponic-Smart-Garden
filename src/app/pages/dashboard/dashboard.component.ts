import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../../../environments/environment';

/**
 * This is our base measurement format
 */
interface Measurements {
  Temperature?: string;
  OutsideTemperature?: string;
  Humidity?: string;
  PH?: string;
  date?: Date;
  VentUpSpeed?: number;
  VentDownSpeed?: number;
  Light?: boolean;
  Heater?: boolean;
}

/**
 * Helper function for formatting scalar vent values
 * in to percents
 */
function getPercent(base: number) {
  return base * (255 / 100);
}

/**
 * Helper function for formatting percents back in
 * to scalars needed by the server
 */
function getBase(percent: number) {
  return (Math.round((255 / 100) * percent)).toString();
}

@Component({
  selector: 'gp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private _afs: AngularFirestore,
    private _http: HttpClient
  ) {}

  data: Measurements = {};

  ngOnInit() {

    /**
     * Retrieve latest measurements from firestore.
     * NOTE: Here we aren't retrieving data from the ESP
     * but rather from our database. This means that even
     * if the ESP is turned off or unavailable we still have
     * latest recorded measurements.
     */
    this._afs.collection('measurements', ref => ref.limit(1).orderBy('date', 'desc')).valueChanges()
      .subscribe((res: any) => {
        this.data = res[0];

        /**
         * Format date to a standard js format
         */
        this.data.date = res[0].date.toDate();

        /**
         * Map vent values to percent. We receive
         * them from database as a scalar
         */
        this.data.VentUpSpeed = getPercent(parseInt(res[0].VentUpSpeed, 10));
        this.data.VentDownSpeed = getPercent(parseInt(res[0].VentUpSpeed, 10));

        this.data.Light = res[0].Light === 'true';
        this.data.Heater = res[0].Light === 'true';

        console.log(this.data);
      });
  }

  updateVentUp(event) {
    this.updateVent(event.value, 'up');
  }

  updateVentDown(event) {
    this.updateVent(event.value, 'down');
  }

  updateVent(value, vent = 'up') {

    const power = getBase(value);

    this._http.get(
      vent === 'up' ? environment.ventUp : environment.ventDown,
      {
        params: {
          power
        }
      }
    )
      .subscribe(
        () => {},
        () => {}
      );
  }

  toggleLight() {
    this.data.Light = !this.data.Light;

    this._http.get(environment.light, this.data.Light ? {params: {on: 'yes'}} : {})
      .subscribe(
        () => {},
        () => {}
      );
  }

  toggleHeater() {
    this.data.Heater = !this.data.Heater;

    this._http.get(environment.heater, this.data.Heater ? {params: {on: 'yes'}} : {})
      .subscribe(
        () => {},
        () => {}
      );
  }

  togglePh(on = true) {
    this._http.get(on ? environment.phUp : environment.phDown)
      .subscribe(
        () => {},
        () => {}
      );
  }
}
