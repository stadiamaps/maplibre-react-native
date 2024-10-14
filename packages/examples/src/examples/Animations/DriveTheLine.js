import MapLibreGL from "@maplibre/maplibre-react-native";
import { lineString as makeLineString, point } from "@turf/helpers";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import sheet from "../../styles/sheet";
import { SF_OFFICE_COORDINATE } from "../../utils";
import RouteSimulator from "../../utils/RouteSimulator";
import Page from "../common/Page";
import PulseCircleLayer from "../common/PulseCircleLayer";

const SF_ZOO_COORDINATE = [-122.505412, 37.737463];

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 3,
  },
  buttonCnt: {
    backgroundColor: "transparent",
    bottom: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 0,
    position: "absolute",
    right: 0,
  },
});

const layerStyles = {
  origin: {
    circleRadius: 5,
    circleColor: "white",
  },
  destination: {
    circleRadius: 5,
    circleColor: "white",
  },
  route: {
    lineColor: "white",
    lineCap: MapLibreGL.LineJoin.Round,
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: "#314ccd",
    lineWidth: 3,
  },
};

class DriveTheLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: null,
      currentPoint: null,
      routeSimulator: null,
    };

    this.onStart = this.onStart.bind(this);
  }

  onStart() {
    this.setState((prevState) => {
      const routeSimulator = new RouteSimulator(prevState.route);
      routeSimulator.addListener((currentPoint) =>
        this.setState({ currentPoint }),
      );
      routeSimulator.start();

      return { routeSimulator };
    });
  }

  async componentDidMount() {
    // MapLibre should be vendor-agnostic.
    // This example should be reworked with a hard-coded route.
    // See
    // const reqOptions = {
    //   waypoints: [
    //     {coordinates: SF_OFFICE_COORDINATE},
    //     {coordinates: SF_ZOO_COORDINATE},
    //   ],
    //   profile: 'walking',
    //   geometries: 'geojson',
    // };
    //
    // const res = await directionsClient.getDirections(reqOptions).send();
    //
    // this.setState({
    //   route: makeLineString(res.body.routes[0].geometry.coordinates),
    // });
  }

  componentWillUnmount() {
    if (this.state.routeSimulator) {
      this.state.routeSimulator.stop();
    }
  }

  renderRoute() {
    if (!this.state.route) {
      return null;
    }

    return (
      <MapLibreGL.ShapeSource id="routeSource" shape={this.state.route}>
        <MapLibreGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
          belowLayerID="originInnerCircle"
        />
      </MapLibreGL.ShapeSource>
    );
  }

  renderCurrentPoint() {
    if (!this.state.currentPoint) {
      return;
    }
    return (
      <PulseCircleLayer
        shape={this.state.currentPoint}
        aboveLayerID="destinationInnerCircle"
      />
    );
  }

  renderProgressLine() {
    if (!this.state.currentPoint) {
      return null;
    }

    const { nearestIndex } = this.state.currentPoint.properties;
    const coords = this.state.route.geometry.coordinates.filter(
      (c, i) => i <= nearestIndex,
    );
    coords.push(this.state.currentPoint.geometry.coordinates);

    if (coords.length < 2) {
      return null;
    }

    const lineString = makeLineString(coords);
    return (
      <MapLibreGL.Animated.ShapeSource id="progressSource" shape={lineString}>
        <MapLibreGL.Animated.LineLayer
          id="progressFill"
          style={layerStyles.progress}
          aboveLayerID="routeFill"
        />
      </MapLibreGL.Animated.ShapeSource>
    );
  }

  renderOrigin() {
    let backgroundColor = "white";

    if (this.state.currentPoint) {
      backgroundColor = "#314ccd";
    }

    const style = [layerStyles.origin, { circleColor: backgroundColor }];

    return (
      <MapLibreGL.ShapeSource id="origin" shape={point(SF_OFFICE_COORDINATE)}>
        <MapLibreGL.Animated.CircleLayer id="originInnerCircle" style={style} />
      </MapLibreGL.ShapeSource>
    );
  }

  renderActions() {
    if (this.state.routeSimulator) {
      return null;
    }
    return (
      <View style={styles.buttonCnt}>
        <Button
          raised
          title="Start"
          onPress={this.onStart}
          style={styles.button}
          disabled={!this.state.route}
        />
      </View>
    );
  }

  render() {
    return (
      <Page>
        <MapLibreGL.MapView
          ref={(c) => (this._map = c)}
          style={sheet.matchParent}
          styleURL={MapLibreGL.StyleURL.Default}
        >
          <MapLibreGL.Camera
            zoomLevel={11}
            centerCoordinate={[-122.452652, 37.762963]}
          />

          {this.renderOrigin()}

          {this.renderRoute()}
          {this.renderCurrentPoint()}
          {this.renderProgressLine()}

          <MapLibreGL.ShapeSource
            id="destination"
            shape={point(SF_ZOO_COORDINATE)}
          >
            <MapLibreGL.CircleLayer
              id="destinationInnerCircle"
              style={layerStyles.destination}
            />
          </MapLibreGL.ShapeSource>
        </MapLibreGL.MapView>

        {this.renderActions()}
      </Page>
    );
  }
}

export default DriveTheLine;
