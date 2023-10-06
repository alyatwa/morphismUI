import { db } from "../firebase";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
	GeoPoint,
	arrayUnion,
	query,
	where,
	writeBatch,
	getDocs,
} from "firebase/firestore";

const addComment = async ({
	userId,
	comment,
	projectId,
}: {
	userId: string;
	projectId: string;
	comment: string;
}) => {
	try {
		await addDoc(collection(db, "projects", projectId, "comments"), {
			user: userId,
			comment: comment,
			createdAt: new Date().getTime(),
		});
	} catch (err) {
		console.log(err);
	}
};

const addPolygon = async ({
	userId,
	latlngs,
	projectId,
	id,
}: {
	id: string;
	userId?: string;
	projectId: string;
	latlngs: { lat: number; lng: number }[];
}) => {
	try {
		await addDoc(collection(db, "projects", projectId, "polygons"), {
			id,
			projectId,
			latlngs: arrayUnion(
				...latlngs.map((l) => {
					return new GeoPoint(l.lat, l.lng);
				})
			),
		});
	} catch (err) {
		console.log(err);
	}
};

const removePolygon = async ({
	userId,
	projectId,
	id,
  }: {
	userId?: string;
	projectId: string;
	id: number;
  }) => {
	console.log("id", id);
	const polygonsRef = collection(db, "projects", projectId, "polygons");
	const q = query(polygonsRef, where("id", "==", id.toString()));
	try {
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
	  deleteDoc(doc.ref);
	});
} catch (err) {
	console.log(err);
}
  };
  

export { addComment, addPolygon, removePolygon };
