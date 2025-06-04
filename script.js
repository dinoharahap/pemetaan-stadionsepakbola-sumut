// Inisialisasi peta
const map = L.map('map').setView([-6.200000, 106.816666], 5); // Lokasi awal: Indonesia

// Tambahkan tile layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fungsi untuk menambahkan GeoJSON ke peta
function loadStadiumData(geojson) {
  L.geoJSON(geojson, {
    onEachFeature: function (feature, layer) {
      const name = feature.properties.name || "Stadion";
      layer.bindPopup(`<strong>${name}</strong>`);
    }
  }).addTo(map);
}

// Fetch file GeoJSON dari folder /data
fetch('data/projectstadion.geojson')
  .then(response => response.json())
  .then(data => {
    loadStadiumData(data);
  })
  .catch(error => {
    console.error('Gagal memuat GeoJSON:', error);
  });
