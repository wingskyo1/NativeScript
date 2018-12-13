

<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Vue Mapbox Example"></ActionBar>
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
      <StackLayout class="hello-world">
        <TextField v-model="content"/>
        <!-- <Button class="btn btn-primary" @tap="getLocation()" text="獲取自己的位置"/> -->
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";
//import * as utils from "utils/utils";
var utils = require("tns-core-modules/utils/utils");
var mapbox = require("nativescript-mapbox");

export default {
  data() {
    return {
      address: "222",
      content: ""
    };
  },
  methods: {
    onMapReady(args) {
      args.map.setOnMapClickListener(function(point) {
        console.log("我點的 " + point.lat);
        //this.address="123";
        args.map.addPolyline({
          id: 1,
          // color: new color_1.Color("yellow"),

          points: [
            {
              lat: point.lat+0.01,
              lng: point.lng+0.01
            },
            {
              lat: point.lat,
              lng: point.lng
            },
            {
              lat: point.lat+0.02,
              lng: point.lng+0.02
            },
          ]
        });
        return console.log("Map tapped: " + JSON.stringify(point));
      });
      args.map.setOnMapLongClickListener(function(point) {
        args.map.removePolylines([1]);
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
