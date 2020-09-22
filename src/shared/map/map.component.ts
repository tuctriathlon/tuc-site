import {AfterViewInit, Component, Input} from '@angular/core';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import * as Proj from 'ol/proj';
import Style from 'ol/style/Style';
import {environment} from '../../environments/environment';
import Stroke from 'ol/style/Stroke';
import Geometry from 'ol/geom/Geometry';
import SimpleGeometry from 'ol/geom/SimpleGeometry';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input()gpx: string;

  private map: Map;
  private gpxLayer: VectorLayer;
  constructor() {
  }

  ngAfterViewInit(): void {
    const source = new VectorSource({
      url: environment.production ? `../../files/${this.gpx}`
        : `${environment.directusUrl}/uploads/${environment.directusProject}/originals/${this.gpx}`,
      format: new GPX()
    });
    this.gpxLayer = new VectorLayer({
      source
    });
    this.gpxLayer.setStyle(new Style({stroke: new Stroke({color: 'firebrick', width: 5})}));
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.gpxLayer
      ],
      view: new View({
        center: Proj.fromLonLat([1.43333, 43.6]),
        zoom: 10
      })
    });
    this.gpxLayer.on('change', (e) => {
      if (source.getState() === 'ready') {
        const feature = source.getFeatures()[0];
        const polygon = feature.getGeometry() as SimpleGeometry;
        // TODO tracer le profile polygon.flatCoordinates[index]%4 === 2 D3js power
        this.map.getView().fit(polygon, {padding: [50, 50, 50, 50]});
      }
    });
  }

}
