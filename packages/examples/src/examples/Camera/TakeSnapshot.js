import MapLibreGL from "@maplibre/maplibre-react-native";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  snapshot: {
    flex: 1,
  },
  spinnerContainer: { alignItems: "center", flex: 1, justifyContent: "center" },
});

class TakeSnapshot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snapshotURI: null,
    };
  }

  componentDidMount() {
    this.takeSnapshot();
  }

  async takeSnapshot() {
    const { width, height } = Dimensions.get("window");

    const uri = await MapLibreGL.snapshotManager.takeSnap({
      centerCoordinate: [-74.12641, 40.797968],
      width,
      height,
      zoomLevel: 3,
      pitch: 30,
      heading: 20,
      styleURL: MapLibreGL.StyleURL.Default,
      writeToDisk: true,
    });

    this.setState({ snapshotURI: uri });
  }

  render() {
    if (!this.state.snapshotURI) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Generating Snapshot</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.snapshotURI }}
            resizeMode="contain"
            style={styles.snapshot}
          />
        </View>
      );
    }
  }
}

export default TakeSnapshot;
