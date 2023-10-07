import React, { useEffect, useRef, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	FeatureGroup,
} from "react-leaflet";
import * as L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { addPolygon, removePolygon, getPolygons } from "../api/project";

type mapType = {
	projectId: string;
	zoom: number;
	position: [lat: number, lng: number];
};
export type firestoreGeoPoint = {
	id: string;
	latlngs: {
		_lat: number;
		_long: number;
	}[];
};
export default function MyMap({ position, zoom, projectId }: mapType) {
	//const [mapLayers, setMapLayers] = useState<any[]>([]);
	const map = useRef<L.FeatureGroup>(null);
	const _onCreate = async (e: any) => {
		const { layerType, layer } = e;

		if (layerType === "polygon") {
			const { _leaflet_id } = layer;
			/* setMapLayers((layers: any[]) => [
				...layers,
				{ id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
			]); */
			await addPolygon({
				id: _leaflet_id.toString(),
				latlngs: layer.getLatLngs()[0],
				projectId,
			});
		}
	};
	const _onDeleted = async (e: any) => {
		const {
			layers: { _layers },
		} = e;

		/* Object.values(_layers).map(({ _leaflet_id }: any) => {
			setMapLayers((layers: any[]) =>
				layers.filter((l) => l.id !== _leaflet_id)
			);
		}); */
		const id =
			(Object.values(_layers)[0] as any)?.options?.attribution ??
			(Object.values(_layers)[0] as any)._leaflet_id;
		await removePolygon({
			id,
			projectId,
		});
	};

	useEffect(() => {
		onLoad();
	}, []);
	const onLoad = async () => {
		await getPolygons(projectId).then((polygons) => {
			if (map.current?.getLayers().length === 0) {
				polygons.forEach((x) => {
					L.polygon([x.latlngs.map((x) => [x._lat, x._long]) as any], {
						attribution: x.id,
					}).addTo(map.current as any);
				});
			}
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
				<FeatureGroup ref={map}>
					<EditControl
						onCreated={_onCreate}
						onDeleted={_onDeleted}
						position="topleft"
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
			{/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> */}
		</>
	);
}
