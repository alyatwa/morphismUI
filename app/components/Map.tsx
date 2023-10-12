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
import { addPolygon, removePolygon, updateDocument } from "../api/project";
import { Report } from "./Report";
import { getRandomColor } from "../utils/randomColor";

export type firestoreGeoPoint = {
	id: string;
	latlngs: {
		_lat: number;
		_long: number;
	}[];
};
export default function MyMap({ project, projectId }: any) {
	const polygons = project.polygons.map((y: any) => ({
		id: y.id,
		reportURL: y.reportURL,
		color: y?.color ?? getRandomColor(),
		...y
	}));
	const [mapLayers, setMapLayers] = useState<any[]>(polygons);
	//const [currentPolygon, setPolygon] = useState<any>(null);
	const map = useRef<L.FeatureGroup>(null);

	/* const handlePolygonClick = (polygonId: string) => {
		setPolygon(mapLayers.find((x) => x.id == polygonId));
	}; */

	const updateColor = async (polygonId: string, color: string) => {
		const layers = (map.current?.getLayers() ?? [] as any)
		const newArray = mapLayers.map((x) =>
			x.id == polygonId ? { ...x, color } : x
		);
		layers.find((x: { options: { attribution: string; }; }) => x.options.attribution == polygonId).setStyle({
			color,
		})
		setMapLayers(newArray);
		await updateDocument({projectId, polygonId, newData:{ color }});
	}
	const updateReport = (polygonId: string, downloadURL: string) => {
		const newArray = mapLayers.map((x) =>
			x.id == polygonId ? { ...x, reportURL: downloadURL } : x
		);
		setMapLayers(newArray);
		//setPolygon({ id: polygonId, reportURL: downloadURL });
	};

	const _onCreate = async (e: any) => {
		const { layerType, layer } = e;

		if (layerType === "polygon") {
			const color = "red"
			const polygonId =
				(await addPolygon({
					latlngs: layer.getLatLngs()[0],
					color,
					projectId,
				})) ?? "";
			layer.options.attribution = polygonId;
			layer.bindPopup(`Polygon Id: ${polygonId}`)
			layer.addEventListener("click", function () {
				layer.setStyle({
					color: "red",
					fillOpacity: 0.4,
				});
				/* handlePolygonClick(polygonId);
				setPolygon({ id: layer.attribution, latlngs: layer.getLatLngs()[0] }); */
			});
			setMapLayers((layers: any[]) => [
				...layers,
				{ id: polygonId, latlngs: layer.getLatLngs()[0], color },
			]);
		}
	};
	const _onDeleted = async (e: any) => {
		const {
			layers: { _layers },
		} = e;
		Object.values(_layers).map(({ options, attribution }: any) => {
			let layerId = options?.attribution ?? attribution;
			setMapLayers((layers: any[]) => layers.filter((l) => l.id !== layerId));
		});
		const id =
			(Object.values(_layers)[0] as any)?.options?.attribution ??
			(Object.values(_layers)[0] as any).attribution;
		await removePolygon({
			id,
			projectId,
		});
	};
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (map.current) {
				onLoad();
			}
		}, 0);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	const onLoad = async () => { 
		if (map.current?.getLayers().length === 0) {
			mapLayers.forEach((x: any) => {
				L.polygon([x.latlngs.map((x: any) => [x._lat, x._long]) as any], {
					attribution: x.id,
				})
					.setStyle({
						color: x.color,
					})
					.addTo(map.current as any)
					.bindPopup(`Polygon Id: ${x.id}`);
			});
		}
	};

	return (
		<>
			<MapContainer
				style={{ height: "450px", width: "450px" }}
				center={[project.position._lat, project.position._long]}
				zoom={project.zoom}
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

				<Marker position={[project.position._lat, project.position._long]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
			<div className="flex flex-col gap-3">
				{mapLayers &&
					mapLayers.map((polygon) => (
						<Report 
						updateColor={updateColor}
							key={polygon.id}
							updateReport={updateReport}
							projectId={projectId}
							polygon={polygon}
						/>
					))}
			</div>
			{/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> */}
		</>
	);
}

