import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet'
import styled from 'styled-components';

const Wrapper =styled.div `
    width:${props=>props.width};
    height:${props=>props.height};    
`;


class Maps extends Component {

    componentDidMount(){
        this.map = L.map('map').setView([20.5937, 78.9629], 13);
          
          L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png').addTo(this.map);
}

    render() {
        return<Wrapper width='600' height= "800" id ='map'/>
    }
}

export default Maps
