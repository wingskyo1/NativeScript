

<template>
  <Page class="page">
     <ActionBar class="action-bar" title="Vue Mapbox ">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>
    <GridLayout>
      
      <Mapbox
        accessToken="pk.eyJ1IjoicHJvbWlzdHJpbyIsImEiOiJjaW1wNmIzaHQwMDJ5d2FtNGNhb28zZTRsIn0.nYE56atkirjFdB5oEkpYVA"
        mapStyle="traffic_day"
        latitude="22.610189"
        longitude="120.2975273"
        hideCompass="true"
        zoomLevel="12"
        showUserLocation="true"
        disableZoom="false"
        disableRotation="false"
        disableScroll="false"
        disableTilt="false"
        @mapReady="onMapReady($event)"
      ></Mapbox>
      <StackLayout >
      <TextField v-model="content" />
      </StackLayout>
    </GridLayout>
    

  </Page>
</template>

<script>
import Vue from "nativescript-vue";
//import * as utils from "utils/utils";
var utils = require("tns-core-modules/utils/utils");
var mapbox = require("nativescript-mapbox");
var setColor = require("tns-core-modules/color");

export default {
  data() {
    return {
      address: "222",
      content: "",
      pointArray: []
    };
  },
  methods: {
    onMapReady: function(args) {
      var data = this;

      args.map.setOnMapClickListener(function(point) {
        //remove the draw
        args.map.removePolylines();
        //push to pointArray
        data.pointArray.push(point);
        data.content = JSON.stringify(point);
        //reDraw
        args.map.addPolyline({
          id: 1,
          color: new setColor.Color("green"),
          points: data.pointArray
        });
        return console.log("Map tapped: " + JSON.stringify(point));
      });

      args.map.setOnMapLongClickListener(function(point) {
        args.map.removePolylines();
        data.pointArray.length = 0;
        return console.log("Map longpressed: " + JSON.stringify(point));
      });

      args.map.addMarkers([
        {
          lat: 22.610189,
          lng: 120.2975273,
          title: "Kaohsiung",
          subtitle: "85 Tower",
          onCalloutTap: () => {
            utils.openUrl("https://www.google.com");
          }
        }
      ]);
      // setTimeout(function() {
      //   args.map.addPolyline({
      //     id: 10,
      //     // color: new color_1.Color("yellow"),
      //     points: [
      //       {
      //         lat: 22.610189,
      //         lng: 120.2975273
      //       },
      //       {
      //         lat: 22.610189,
      //         lng: 120.3005273
      //       },
      //       {
      //         lat: 22.620189,
      //         lng: 120.2975273
      //       }
      //     ]
      //   });
      // }, 10000);
    }
    // getLocation() {
    //   mapbox.getUserLocation().then(function(userLocation) {
    //     console.log(
    //       "Current user location: " +
    //         userLocation.location.lat +
    //         ", " +
    //         userLocation.location.lng
    //     );
    //     console.log("Current user speed: " + userLocation.speed);
    //   });
    // }
  }
};
</script>

<style scoped></style>
