import {AfterViewInit, Component, Input} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import {fromLonLat} from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input()gpx: string;

  private map: Map;
  constructor() { }

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
        center: fromLonLat([1.4333, 43.6]),
        zoom: 10
      })
    });
  }

}
