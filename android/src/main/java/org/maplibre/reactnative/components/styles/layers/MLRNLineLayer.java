package org.maplibre.reactnative.components.styles.layers;

import android.content.Context;

import org.maplibre.android.style.expressions.Expression;
import org.maplibre.android.style.layers.LineLayer;
import org.maplibre.reactnative.components.mapview.MLRNMapView;
import org.maplibre.reactnative.components.styles.MLRNStyle;
import org.maplibre.reactnative.components.styles.MLRNStyleFactory;

public class MLRNLineLayer extends MLRNLayer<LineLayer> {
    private String mSourceLayerID;

    public MLRNLineLayer(Context context) {
        super(context);
    }

    @Override
    protected void updateFilter(Expression expression) {
        mLayer.setFilter(expression);
    }

    @Override
    public void addToMap(MLRNMapView mapView) {
        super.addToMap(mapView);
    }

    @Override
    public LineLayer makeLayer() {
        LineLayer layer = new LineLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        MLRNStyleFactory.setLineLayerStyle(mLayer, new MLRNStyle(getContext(), mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(mSourceLayerID);
        }
    }
}