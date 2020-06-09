import {AfterViewInit, Component, Input} from '@angular/core';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import * as Proj from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input()gpx: string;

  private map: Map;
  constructor() {
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            url: this.gpx,
            format: new GPX()
          })
        })
      ],
      view: new View({
        center: Proj.fromLonLat([1.4333, 43.6]),
        zoom: 10
      })
    });
  }

}
