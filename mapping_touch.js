/**
 * 
 */
$(function(){
	//マップ変数の設定
	var map = new OpenLayers.Map("map_canvas");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);
    //座標の設定 
    var lonLat = new OpenLayers.LonLat(136.730087,35.400116)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), 
            new OpenLayers.Projection("EPSG:900913")
        );
    map.setCenter(lonLat, 17);
    //クリックした反応を見る
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        initialize:function(options){
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(
                this, 
                {
                    'click':this.onClick, 
                    'dblclick':this.onDblClick
                }, 
                {
                    'single':true, 
                    'double':true, 
                    'pixelTolerance':0, 
                    'stopSingle':false, 
                    'stopDouble':false
                }
            );
        }, 
        onClick:function(e) {
        	//クリック座標の中心の緯度経度の取得
        	var lonLat = map.getCenter().transform(
                new OpenLayers.Projection("EPSG:900913"), 
                new OpenLayers.Projection("EPSG:4326")
            );
        	lat = lonLat.lat;
            lon = lonLat.lon;
            //マーカーの追加
            var markers = new OpenLayers.Layer.Markers("Markers");
            map.addLayer(markers);
            //マーカーの設定
            var marker = new OpenLayers.Marker(
                new OpenLayers.LonLat(lon,lat)
                    .transform(
                        new OpenLayers.Projection("EPSG:4326"), 
                        new OpenLayers.Projection("EPSG:900913")
                    )
            );
            //マーカーの追加
            markers.addMarker(marker);


        }, 
        onDblClick:function(e) {
            alert('Double Click');
        }
    });
     
    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate();
});