import React, { useContext, useEffect } from "react";
import { Tooltip, Marker, Popup, TileLayer, MapContainer, LayersControl, LayerGroup, useMap} from 'react-leaflet';
 //import {Icon } from 'leaflet';

// import useSwr from 'swr';
import Search from '../Search';

import { geosearch } from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

import { CounterContext } from "../EssaisContext";
import * as L from "leaflet";
import { useState } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet/dist/leaflet.css";
// import "leaflet-geosearch/dist/geosearch.css";
function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    // const provider = new OpenStreetMapProvider();

    // const searchControl = new GeoSearchControl({
    //   provider,
    //   // marker: {
    //   //   icon
    //   // }
    // });

    // map.addControl(searchControl);

    // return () => map.removeControl(searchControl);

    const control = geosearch();
    control.addTo(map);
    control.on('submit', handleOnSearchResults('submiiiiiiiiit'));

    return () => {
      control.off('results', handleOnSearchResults('resuuuuuult'));
    }
  }, []);

  const handleOnSearchResults = (data) =>{
    // console.log('Search results', data);
    console.log('Search results', data);
  }
   return null;
}


// const Carte = (props) => {
  export default function CarteContent() { 
    useEffect(() => {
      const control = geosearch();
    }, [])

    const LeafIcon = L.Icon.extend({
      options: {}
    });
    const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    });
    const [icon, setIcon] = useState(blueIcon);
    const changeIconColor = (id) => {
      if (id == 3) {
        setIcon((current) => (current = blueIcon));
        
      } else {
        setIcon((current) => (current = greenIcon));
      }
      return icon
    };


    const [typeEssais, setTypeEssais] = useContext(CounterContext);
    //const [ activeCrime, setActiveCrime] = React.useState(null);
  //   const fetcher = (...args) => fetch(...args).then(response => response.json());
  //   const url = 
  //   "http://localhost:8080/api/essais"
  //   // "https://data.police.uk/api/crimes-street/all-crime?lat=52.6297296&lng=-1.1315927&date=2019-10"
  //  const { data, error } = useSwr(url, {fetcher });

  //  const essais = data && !error ? data.slice(0,100): [];

    const position = [51.505, -0.09]
  return (
  <div>
    <Search />
       <MapContainer style={{height:'70vh', width:'100%'}} 
       center={[19.0558, -73.0513]} 
       zoom={9}
       minZoom={8}
       scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="OpenTopoMap">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

{typeEssais.map((typeEssai, key) => (
  typeEssai.essais !== [] ? (
    < div key={key} >
    {/* Pour chaque type d'essai on crée un group et on ajoute tous les essais y relatif */}
    <LayersControl.Overlay checked name={typeEssai.nom}> 
    <LayerGroup>
    {typeEssai.essais.map((essai, key) => (
      <div key={key}>
           <Marker
            position={[essai.position.latitude, 
            essai.position.longitude]}
            icon={typeEssai.id == 4 ? blueIcon : greenIcon}
            // onClick = {() => {
            //     alert('okoko')
            // }}
      
            >
           <Popup 
              position={[essai.position.latitude, essai.position.longitude]}
              >
          <div>
                  <h5><strong>Résultat de l'essai: {essai.id}</strong></h5>
                  <ul>
                      <li><strong>Nom du projet:</strong> ...</li>
                      <li><strong>Institution:</strong>{essai.institution.nom} ({essai.institution.sigle})</li>
                      <li><strong>Type d'essai:</strong> {typeEssai.nom}</li>
                      <li><strong>Latitude:</strong> {essai.position.latitude}</li>
                      <li><strong>Longitude:</strong> {essai.position.longitude}</li>
                      <li><strong>Altitude:</strong> {essai.position.altitude}</li>
                      <li><strong>Méthode:</strong> ...</li>
                      <li><strong>Résultat: </strong><a href={essai.fichier.lien}>Voir document</a></li>
                      <li><strong>Date de réalisation:</strong> {essai.createdDate}</li>
                  </ul>
          </div>
         </Popup>
         <Tooltip>{typeEssai.nom}</Tooltip>
      </Marker>  
      </div>
       ))} 
    </LayerGroup>
    
      </LayersControl.Overlay>
  
      </div>
  ): null
       
        
    )
    )} 
    </LayersControl>
    <LeafletgeoSearch />
  </MapContainer>
  </div>
   
  )
}

// export default Carte
