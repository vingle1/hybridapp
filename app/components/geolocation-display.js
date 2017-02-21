import Ember from 'ember';

export default Ember.Component.extend({
  lng: 0,
  lat: 0,
  alt: 0,
  
  on: true,
  startLogging: function(){
    //begin logging accelerometer data once the component launches

    var component = this;
    this.computeGPS(component);

  }.on('init'),
  computeGPS: function(component){
    Ember.run.later(function(){
      //wrapper to preserve binding satistfaction
      try {
        //invoke cordova accelerometer Plugin and get accelerometer data
        navigator.geolocation.getCurrentPosition(function (position) {//success callback
            //console.log('acceleration setvars called');
            component.set('lng', position.coords.longitude);
			console.log(position.coords);
            component.set('lat', position.coords.latitude);
            component.set('alt', position.coords.altitude);

           
        }, function (error) {//error callback	
			
            console.log(error);
        });
      }
      catch(err){
        console.log('error: '+err);
      }
      if(component.get('on')){
        //keep running
        component.computeGPS(component); //recurse
      }

    }, 10000);//run ever 10000ms
  }
});