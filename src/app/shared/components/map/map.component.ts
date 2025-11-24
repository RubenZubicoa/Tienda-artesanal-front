import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() latitude: number = 42.976;
  @Input() longitude: number = -2.291;
  @Input() zoom: number = 11;
  @Input() markerTitle: string = 'Ubicación';
  @Input() markers: { lat: number, lng: number }[] = [];
  
  @Output() mapClick = new EventEmitter<{ lat: number, lng: number }>();
  @Output() markerClick = new EventEmitter<void>();

  private map: any;
  private marker: any = null;

  ngAfterViewInit(): void {
    this.initMap();
    this.markers.forEach(marker => {
      this.addMarker(marker.lat, marker.lng);
    });

  }

  ngOnDestroy(): void {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markers']) {
      this.initMap();
      this.markers.forEach(marker => {
        this.addMarker(marker.lat, marker.lng);
      });
    }
  }

  private initMap(): void {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API no está cargada. Verifica que el script esté incluido en index.html');
      return;
    }

    const mapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  private addMarker(lat: number, lng: number): void {
    console.log('Adding marker:', lat, lng);
    if (this.marker) {
      this.marker.setMap(null);
    }

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: this.markerTitle,
      draggable: true
    });

    // Escuchar clic en el marcador
    marker.addListener('click', () => {
      console.log('Marcador clickeado');
      this.markerClick.emit();
    });
  }

  public setCenter(lat: number, lng: number): void {
    if (this.map) {
      this.map.setCenter({ lat, lng });
      this.addMarker(lat, lng);
    }
  }

  public setZoom(zoom: number): void {
    if (this.map) {
      this.map.setZoom(zoom);
    }
  }

  public getCurrentPosition(): { lat: number, lng: number } | null {
    if (this.marker) {
      const position = this.marker.getPosition();
      return {
        lat: position.lat(),
        lng: position.lng()
      };
    }
    return null;
  }


}
