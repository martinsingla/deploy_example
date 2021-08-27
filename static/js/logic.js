// jQuery.event.special.touchstart = {
//   setup: function( _, ns, handle ){
//    if ( ns.includes("noPreventDefault") ) {
//      this.addEventListener("touchstart", handle, { passive: false });
//    } else {
//      this.addEventListener("touchstart", handle, { passive: true });
//    }
//   }
// };

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [19.378389743260904, -99.1405631170717],
  zoom: 10
});

// // Adding a tile layer (the background map image) to our map
// // We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Graphs 
// var alcaldias = []
// var price_X=[]
// var price_MH=[]
// var price_CJ=[]
var baños=[]
var prices=[]
var bedrooms=[]
var parkinglots=[]
var distances=[]

d3.csv("03_data.csv").then(function(data) {
  

  // Grab values from the response json object to build the plots
  data.forEach(d => {
    var price = d.precio_m2;
    prices.push(price)
    
    var baño = d.baños;
    baños.push(baño)
    
    var bedroom = d.dormitorios;
    bedrooms.push(bedroom)

    var parking = d.cocheras;
    parkinglots.push(parking)

    var distance = d.dist_metro;
    distances.push(distance)
    

  });

  console.log(data[0])
  console.log(prices)
  console.log(baños)
  console.log(bedrooms)
  console.log(parkinglots)
  console.log(d3.max(distances))
  //   var price = +d.precio_m2;
  //   if (d.alcaldia=="XOCHIMILCO") {
  //     price_X.push(price)
  //   };

  //   var baño = d.baños;
  //   if (!baños.includes(baño)) {
  //     baños.push(baño)
  //   };

 
  var trace1 = {
    mode: "markers",
    x: baños,
    y: prices,
    line: {
      color: "#17BECF"
    }
  };
  var layout = {
    xaxis:{
     title: "Bathrooms" 
    },
    yaxis:{
      title: "Price" 
     },
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 40,
    }
  };
  var data = [trace1];
  Plotly.newPlot("bathrooms", data, layout);

  var trace2 = {
    type: "scatter",
    mode: "markers",
    x: bedrooms,
    y: prices,
    line: {
      color: "rgb(165,0,38)"
    }
  };
  var data = [trace2];
  var layout = {
    xaxis:{
     title: "Bedrooms" 
    },
    yaxis:{
      title: "Price" 
     },
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 40,
    }
  };
  Plotly.newPlot("bedrooms", data,layout);

  var trace3 = {
    type: "scatter",
    mode: "markers",
    x: parkinglots,
    y: prices,
    line: {
      color: "rgb(255,20,147)"
    }
  };
  var data = [trace3];
  var layout = {
    xaxis:{
     title: "Parkinglots" 
    },
    yaxis:{
      title: "Price" 
     },
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 40,
    }
  };
  Plotly.newPlot("parkinglots", data, layout);

  var trace4 = {
    type: "scatter",
    mode: "markers",
    x: distances,
    y: prices,
    line: {
      color: "rgb(34,139,34)"
    }
    
  };
  var data = [trace4];
  var layout = {
    xaxis:{
     title: "Distance (m)" 
    },
    yaxis:{
      title: "Price" 
     },
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 40,
    }
  };
  Plotly.newPlot("distance", data, layout);


});

