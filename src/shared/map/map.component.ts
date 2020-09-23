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
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import * as d3 from 'd3';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input()gpx: string;

  private map: Map;
  private gpxLayer: VectorLayer;
  public gpxData = [];
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
        this.formatGpxData(polygon.getFlatCoordinates());
        this.plotProfile();
        this.map.getView().fit(polygon, {padding: [50, 50, 50, 50]});
      }
    });
  }

  private formatGpxData(data: number[]) {
    data.forEach((d, index) => {
      if (index % 4 === 0) {
        this.gpxData.push({
          x: data[index],
          y: data[index + 1],
          z: data[index + 2]
        });
      }
    });
    let totalDistance = 0;
    this.gpxData = this.gpxData.map((d, index) => {
      let dist = 1;
      if (index > 0) {
        dist = Math.sqrt(Math.pow(d.x - this.gpxData[index - 1].x, 2) + Math.pow(d.y - this.gpxData[index - 1].y, 2));
        totalDistance += dist;
      }
      return {
        ...d,
        d: index > 0 ? totalDistance / 1000 : 0,
        delta: index > 0 ? (d.z - this.gpxData[index - 1].z) / dist * 100 : 0
      };
    });
  }

  plotProfile() {
    const height = 200;
    const width = 500;
    const margin = ({top: 40, right: 20, bottom: 30, left: 40});
    const profile = d3.select('#profile');
    const svg = profile.append('svg').attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleLinear()
      .domain(d3.extent(this.gpxData, d => d.d))
      .rangeRound([margin.left, width - margin.right]);
    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call(g => g.select('.domain').remove());

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.gpxData, d => d.z)]).nice()
      .rangeRound([height - margin.bottom, margin.top]);
    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').append('tspan').text((data) => data.y));

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    const grid = g => g
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1)
      .call(g => g.append('g')
        .selectAll('line')
        .data(x.ticks())
        .join('line')
        .attr('x1', d => 0.5 + x(d))
        .attr('x2', d => 0.5 + x(d))
        .attr('y1', margin.top)
        .attr('y2', height - margin.bottom))
      .call(g => g.append('g')
        .selectAll('line')
        .data(y.ticks())
        .join('line')
        .attr('y1', d => 0.5 + y(d))
        .attr('y2', d => 0.5 + y(d))
        .attr('x1', margin.left)
        .attr('x2', width - margin.right));
    svg.append('g')
      .call(grid);

    const area = (min) => d3.area()
      .curve(d3.curveLinear)
      .defined(d => Math.abs(d.delta) >= min)
      .x(d => x(d.d))
      .y0(y(0))
      .y1(d => y(d.z));

    svg.append('path')
      .datum(this.gpxData)
      .attr('fill', 'rgb(230,230,153)')
      .attr('stroke', 'rgb(230,230,153)')
      .attr('stroke-width', '1px')
      .attr('d', area(0));


    svg.append('path')
      .datum(this.gpxData)
      .attr('fill', 'rgb(241,192,64)')
      .attr('stroke', 'rgb(241,192,64)')
      .attr('stroke-width', '1px')
      .attr('d', area( 5));


    svg.append('path')
      .datum(this.gpxData)
      .attr('fill', 'rgb(239,139,40)')
      .attr('stroke', 'rgb(239,139,40)')
      .attr('stroke-width', '1px')
      .attr('d', area(7));


    svg.append('path')
      .datum(this.gpxData)
      .attr('fill', 'rgb(230,54,30)')
      .attr('stroke', 'rgb(230,54,30)')
      .attr('stroke-width', '1px')
      .attr('d', area(10));

    svg.append('path')
      .datum(this.gpxData)
      .attr('fill', 'rgb(153,71,32)')
      .attr('stroke', 'rgb(153,71,32)')
      .attr('stroke-width', '1px')
      .attr('d', area(15));

    const legend = {
      color: d3.scaleOrdinal(['<5%', '<7%', '<10%', '<15%', '>15%'],
        ['rgb(230,230,153)', 'rgb(241,192,64)', 'rgb(239,139,40)', 'rgb(230,54,30)', 'rgb(153,71,32)']),
      title: '',
      tickSize: 0
    };

    const thresholds
      = legend.color.domain(); // scaleThreshold

    const thresholdFormat = d => d;

    const xLegende = d3.scaleBand()
      .domain(legend.color.domain())
      .rangeRound([margin.left, width - margin.right]);

    svg.append('g')
      .selectAll('rect')
      .data(legend.color.domain())
      .join('rect')
      .attr('x', xLegende)
      .attr('y', margin.top / 4)
      .attr('width', Math.max(0, xLegende.bandwidth() - 1))
      .attr('height', 15)
      .attr('fill', legend.color);

    const tickAdjust = () => {};

    svg.append('g')
      .attr('transform', `translate(0,${margin.top / 4})`)
      .call(d3.axisBottom(xLegende)
        .ticks(width)
        .tickSize(0))
      .call(tickAdjust)
      .call(g => g.select('.domain').remove());
  }

}
