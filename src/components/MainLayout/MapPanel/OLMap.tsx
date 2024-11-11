import React from "react";
import { LocationState, MarkersState, MarkerState } from "@/types/marker";
import { UnitTypes } from "@/types/unit";
import { Symbol } from "milsymbol";
import "ol/ol.css";
import Map from "ol/Map";
import { Layer, Tile } from "ol/layer";
import { OSM } from "ol/source";
import View from "ol/View";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Stroke, Style } from "ol/style";
import { Feature, MapBrowserEvent } from "ol";
import Point from "ol/geom/Point";
import { LineString } from "ol/geom";
import { Coordinate } from "ol/coordinate";

export const allTypes: Record<UnitTypes, string> = {
  "Antitank/Antiarmor": "30031000001204000000",
  "Infantry": "30031000001211000000",
  "Motorized": "30031000001204020000",
  "Air Defense": "30031000001301000000",
  "Special Forces": "30031000001217000000",
}

const getSymbolStringFromType = (type: UnitTypes) => allTypes[type]

const createSymbol = (marker: MarkerState) =>
  new Symbol(getSymbolStringFromType(marker.type), {
    size: 25,
    commonIdentifier: marker.id.toString(),
    speed: marker.speed.toString(),
  })

const createSymbolStyle = (symbol: Symbol) =>
  new Style({
    image: new Icon({
      anchor: [symbol.getAnchor().x, symbol.getAnchor().y],
      anchorXUnits: "pixels",
      anchorYUnits: "pixels",
      size: [
        Math.floor(symbol.getSize().width),
        Math.floor(symbol.getSize().height),
      ],
      img: symbol.asCanvas(),
    }),
  })

const createPathStyle = () => new Style({ stroke: new Stroke({ color: "orange", width: 2, lineDash: [10, 5] })})
const createFeature = (marker: MarkerState) => new Feature({ geometry: new Point(fromLonLat([marker.location.lon, marker.location.lat]))})
const getPointsFromLocation = (location: LocationState) => fromLonLat([location.lon, location.lat])
const getWholePathPointsFromMaker = (marker: MarkerState) => [getPointsFromLocation(marker.location), ...marker.path.filter(path => !path.reached).map((location) => getPointsFromLocation(location))]
const createPathFeature = (pathPoints: Coordinate[] ) => new Feature({ geometry: new LineString(pathPoints) })
const createBase = () => new Tile({ zIndex: 0, source: new OSM() })
const createMap = (layers: Layer[]) => new Map({ target: "map", layers: layers, view: new View({ center: fromLonLat([26, 62]), zoom: 7 })})

export default function OLMap({ markers, changeUnitInfo }: { markers: MarkersState; changeUnitInfo: Function; }) {
  const mapRef = React.useRef<Map | null>(null)
  const symbolsLayerRef = React.useRef<VectorLayer | null>(null)
  const pathLayerRef = React.useRef<VectorLayer | null>(null)
  const [markerPathId, setMarkerPathId] = React.useState<number | null>(null)

  const handleClickOnMap = (event: MapBrowserEvent<UIEvent>) => {
    const feature = mapRef?.current?.forEachFeatureAtPixel(event.pixel, (feat) => feat)
    if (feature) {
      // Clicked on marker => Show unit info & unit path
      const id = feature.getId() as number
      changeUnitInfo(id)
      setMarkerPathId(id)
    } else {
      // Clear path if clicked outside a marker
      changeUnitInfo(null)
      setMarkerPathId(null)
      // Getting lon & lat coordinates from mouse click for next actions
      const coords = toLonLat(event.coordinate)
    }
  }

  const loadMap = async() => {
    // Set up empty path layer
    const pathSource = new VectorSource()
    const pathLayer = new VectorLayer({ source: pathSource, zIndex: 99 })

    // Set up empty symbol layer
    const symbolSource = new VectorSource()
    const symbolLayer = new VectorLayer({ zIndex: 100, source: symbolSource, updateWhileAnimating: false, updateWhileInteracting: false })

    // Set up empty map
    const base = createBase()
    const map = createMap([base, symbolLayer, pathLayer])

    mapRef.current = map
    pathLayerRef.current = pathLayer
    symbolsLayerRef.current = symbolLayer
  }

  React.useLayoutEffect(() => {
    // Initialization of map
    if (!mapRef.current) loadMap()
  }, [mapRef])

  React.useEffect(() => {
    // Update symbols layer when markers changes
    if (!symbolsLayerRef.current) return

    const symbolSource = symbolsLayerRef.current.getSource() as VectorSource
    symbolSource.clear() // Clear previous symbols

    const symbolFeatures: Feature[] = markers.map((marker) => {
      const symbol = createSymbol(marker)
      const style = createSymbolStyle(symbol)
      const feature = createFeature(marker)
      feature.setStyle(style)
      feature.setId(marker.id)
      return feature
    })
    symbolSource.addFeatures(symbolFeatures)
  }, [markers])

  React.useEffect(() => {
    // Update path layer when markerPathId changes
    if (!pathLayerRef.current) return

    const pathSource = pathLayerRef.current.getSource() as VectorSource
    pathSource.clear() // Clear previous path

    if (markerPathId != null) {
      // Find marker and create path feature
      const marker = markers.find((m) => m.id === markerPathId)
      if (marker) {
        const pathPoints = getWholePathPointsFromMaker(marker)
        const pathFeature = createPathFeature(pathPoints)
        pathFeature.setStyle(createPathStyle())
        pathSource.addFeature(pathFeature)
      }
    }
  }, [markerPathId, markers])

  React.useEffect(() => {
    mapRef.current?.on("click", handleClickOnMap)
    return () => mapRef.current?.un("click", handleClickOnMap)
  }, [])

  return <div id="map" style={{ width: "100%", height: "100%" }} />
}
