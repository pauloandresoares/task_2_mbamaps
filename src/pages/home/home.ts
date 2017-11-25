import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  devicePosition: Geoposition;
  messageError: string = '';

  constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {
      //this.loadMap();
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {

         this.map = new GoogleMap('map', {
   
           'controls': {
             'compass': true,
             'myLocationButton': true,
             'indoorPicker': true,
             'zoom': true
           },
           'gestures': {
             'scroll': true,
             'tilt': true,
             'rotate': true,
             'zoom': true
           },
           'camera': {
              target: {
                lat: data.coords.latitude,
                lng: data.coords.longitude
              },
             'tilt': 30,
             'zoom': 15,
             'bearing': 50
           }
         });

          this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
  
      });
    });

    
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.devicePosition = position;
    }, (err) => {
      this.messageError = err.message;
    });
}
  
  addMarker() {
      this.map.clear();
      this.map.addMarker({
            title: 'Novo ponto local',
            animation: 'DROP',
            position: {
              lat: this.devicePosition.coords.latitude,
              lng: this.devicePosition.coords.longitude
            }
          });
  }

}
