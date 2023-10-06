import React, { useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { addPolygon, removePolygon } from "../api/project";

type mapType = {
	projectId: string
	zoom: number
	position: [lat: number, lng: number]
}
export default function MyMap({ position, zoom, projectId }: mapType) {
	//const { position, zoom } = props;
	const [mapLayers, setMapLayers] = useState<any>([]);
	const _onCreate = async (e: any) => {
		console.log(e);

		const { layerType, layer } = e;
		if (layerType === "polygon") {
			const { _leaflet_id } = layer;

			setMapLayers((layers: any[]) => [
				...layers,
				{ id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
			]);
		await addPolygon({
			id: _leaflet_id.toString(), latlngs: layer.getLatLngs()[0],projectId
		})
		}
	};
	const _onDeleted = async (e:any) => {
		console.log(e);
		const {
		  layers: { _layers },
		} = e;
	
		Object.values(_layers).map(({ _leaflet_id }:any) => {
		  setMapLayers((layers: any[]) => layers.filter((l) => l.id !== _leaflet_id));
		});
		await removePolygon({
			id:( Object.values(_layers)[0] as any)._leaflet_id,projectId
		})
	  };
	const _onEdited = (e:any) => {
		console.log(e);
		const {
		  layers: { _layers },
		} = e;
	
		Object.values(_layers).map(({ _leaflet_id, editing }:any) => {
		  setMapLayers((layers: any[]) =>
			layers.map((l) =>
			  l.id === _leaflet_id
				? { ...l, latlngs: { ...editing.latlngs[0] } }
				: l
			)
		  );
		});
	  };
	
	return (
		<>
			<MapContainer
				style={{ height: "450px", width: "450px" }}
				center={position}
				zoom={zoom}
				scrollWheelZoom={false}
			>
				<FeatureGroup>
					<EditControl
						position="topleft"
						onCreated={_onCreate}
						onEdited={_onEdited}
						onDeleted={_onDeleted}
						draw={{
							rectangle: false,
							polyline: false,
							circle: false,
							circlemarker: false,
							marker: false,
						}}
					/>
				</FeatureGroup>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
			<pre className="text-left">{JSON.stringify(mapLayers, (0 as any), 2)}</pre>
		</>
	);
}
