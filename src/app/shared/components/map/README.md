# Componente de Mapa (Google Maps)

Este componente integra Google Maps en tu aplicación Angular usando la API de JavaScript de Google Maps.

## Configuración Inicial

### 1. Obtener una API Key de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de "Maps JavaScript API"
4. Crea credenciales (API Key)
5. Reemplaza `YOUR_API_KEY` en `src/index.html` con tu API Key real

```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places"></script>
```

## Uso Básico

```html
<app-map></app-map>
```

## Uso Avanzado

### Con propiedades personalizadas:

```html
<app-map
  [latitude]="40.4168"
  [longitude]="-3.7038"
  [zoom]="15"
  [height]="500px"
  [markerTitle]="'Mi Ubicación'"
  (mapClick)="onMapClick($event)"
  (markerClick)="onMarkerClick()">
</app-map>
```

### En el componente TypeScript:

```typescript
import { MapComponent } from './shared/components/map/map.component';

export class MyComponent {
  onMapClick(event: { lat: number, lng: number }) {
    console.log('Coordenadas:', event.lat, event.lng);
  }

  onMarkerClick() {
    console.log('Marcador clickeado');
  }
}
```

## Propiedades de Entrada (@Input)

- `latitude` (number): Latitud inicial del mapa. Por defecto: 40.4168 (Madrid)
- `longitude` (number): Longitud inicial del mapa. Por defecto: -3.7038 (Madrid)
- `zoom` (number): Nivel de zoom inicial. Por defecto: 13
- `height` (string): Altura del mapa. Por defecto: '400px'
- `markerTitle` (string): Título del marcador. Por defecto: 'Ubicación'

## Eventos de Salida (@Output)

- `mapClick`: Se emite cuando se hace clic en el mapa. Devuelve `{ lat: number, lng: number }`
- `markerClick`: Se emite cuando se hace clic en el marcador

## Métodos Públicos

- `setCenter(lat: number, lng: number)`: Centra el mapa en las coordenadas especificadas
- `setZoom(zoom: number)`: Cambia el nivel de zoom
- `getCurrentPosition()`: Obtiene la posición actual del marcador. Devuelve `{ lat: number, lng: number } | null`

## Ejemplo Completo

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './shared/components/map/map.component';

@Component({
  selector: 'app-example',
  imports: [MapComponent],
  template: `
    <app-map
      #map
      [latitude]="40.4168"
      [longitude]="-3.7038"
      [zoom]="15"
      (mapClick)="handleMapClick($event)">
    </app-map>
    <button (click)="goToLocation()">Ir a Barcelona</button>
  `
})
export class ExampleComponent {
  @ViewChild('map') mapComponent!: MapComponent;

  handleMapClick(event: { lat: number, lng: number }) {
    console.log('Nueva ubicación:', event);
  }

  goToLocation() {
    // Barcelona
    this.mapComponent.setCenter(41.3851, 2.1734);
    this.mapComponent.setZoom(12);
  }
}
```

