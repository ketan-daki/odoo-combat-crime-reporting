
import React, { useEffect, useState, useRef, useCallback } from "react"
import {
    APIProvider,
    Map,
    useMap,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps"
import axios from 'axios';

import { MarkerClusterer } from "@googlemaps/markerclusterer"

import CrimePoint from "./CrimePoint"
const GOOGLE_MAP_API_KEY = "AIzaSyCA2WA39AawTUhMPc4uWAJd9pt1Xhl5GNI"


const MapComponent = () => {
    const [locations, setLocations] = useState([]);

    const getLocations = async () => {
        const response = await axios.get("http://localhost:4004/crime_report");
        if (response.status === 200) {
            let data = []
            Object.entries(response.data).forEach((location) => {
                if (location.length > 1) {
                    data.push({ ...location[1], key: location[0] })
                }
            }
            )
            setLocations(data)
        }
        console.log("Maps API has loaded.")
    }
    return (
        <APIProvider
            apiKey={GOOGLE_MAP_API_KEY}
            onLoad={() => getLocations()}>
            <Map
                defaultZoom={13}
                defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                onCameraChanged={ev =>
                    console.log(
                        "camera changed:",
                        ev.detail.center,
                        "zoom:",
                        ev.detail.zoom
                    )
                }
                mapId="da37f3254c6a6d1c"
            >
                <LocationMarkers locations={locations} />
            </Map>
        </APIProvider>
    )
}

const LocationMarkers = props => {
    const map = useMap()
    const [markers, setMarkers] = useState({})
    const clusterer = useRef(null)
    const [circleCenter, setCircleCenter] = useState(null)
    const handleClick = useCallback(ev => {
        if (!map) return
        if (!ev.latLng) return
        console.log("marker clicked: ", ev.latLng.toString())
        map.panTo(ev.latLng)
        setCircleCenter(ev.latLng)
    })
    // Initialize MarkerClusterer, if the map has changed
    useEffect(() => {
        if (!map) return
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map })
        }
    }, [map])

    // Update markers, if the markers array has changed
    useEffect(() => {
        clusterer.current?.clearMarkers()
        clusterer.current?.addMarkers(Object.values(markers))
    }, [markers])

    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return
        if (!marker && !markers[key]) return

        setMarkers(prev => {
            if (marker) {
                return { ...prev, [key]: marker }
            } else {
                const newMarkers = { ...prev }
                delete newMarkers[key]
                return newMarkers
            }
        })
    }

    return (
        <>
            <CrimePoint
                radius={800}
                center={circleCenter}
                strokeColor={"#0c4cb3"}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={"#3b82f6"}
                fillOpacity={0.3}
            />
            {props.locations.map(poi => (
                <AdvancedMarker
                    key={poi.key}
                    position={{ lat: poi.lat, lng: poi.lng }}
                    ref={marker => setMarkerRef(marker, poi.key)}
                    clickable={true}
                    onClick={handleClick}
                >
                    <Pin
                        background={"#FBBC04"}
                        glyphColor={"#000"}
                        borderColor={"#000"}
                    />
                </AdvancedMarker>
            ))}
        </>
    )
}

export default MapComponent



