import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() latitude: number = 40.4168; // Madrid por defecto
  @Input() longitude: number = -3.7038;
  @Input() zoom: number = 13;
  @Input() height: string = '400px';
  @Input() markerTitle: string = 'Ubicación';
  
  @Output() mapClick = new EventEmitter<{ lat: number, lng: number }>();
  @Output() markerClick = new EventEmitter<void>();

  private map: any;
  private marker: any = null;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.marker) {
      this.marker.setMap(null);
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

    // Agregar marcador
    this.addMarker(this.latitude, this.longitude);

    // Escuchar clics en el mapa
    this.map.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.mapClick.emit({ lat, lng });
      
      // Mover el marcador al nuevo lugar
      this.addMarker(lat, lng);
    });
  }

  private addMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: this.markerTitle,
      draggable: true
    });

    // Escuchar clic en el marcador
    this.marker.addListener('click', () => {
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
