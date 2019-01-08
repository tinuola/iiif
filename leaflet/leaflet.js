var map;

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0,
});

// use this method for two requests of the same image with different parameters
// var iiifUrl = 'https://libimages.princeton.edu/loris/pudl0033/2007/04003/00000001.jp2/info.json';
var iiifUrl = 'http://iiif-kirschbombe.c9users.io/iiif/2/kabuki%2Fucla_bib1987273_no001_rs_001.jpg/info.json';

var layer1 = L.tileLayer.iiif(iiifUrl, {
    fitBounds: false,
  }
).addTo(map);

var layer2 = L.tileLayer.iiif(iiifUrl, {
    quality: 'gray'
  }
).addTo(map);


// use this method to layer two separate image requests
// var layer1 = L.tileLayer.iiif('https://stacks.stanford.edu/image/iiif/zf275jj8939%2FMartellus_300ppi_natural_color_panorama_WIP2/info.json', {
//     fitBounds: false,
//   }
// ).addTo(map);

// var layer2 = L.tileLayer.iiif(
//   'https://stacks.stanford.edu/image/iiif/zf275jj8939%2FMartellus_300ppi_combined_processes_WIP2_panorama_with_blue_water/info.json'
// ).addTo(map);

L.control.sideBySide(layer1, layer2).addTo(map);
