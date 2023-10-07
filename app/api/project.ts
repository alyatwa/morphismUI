import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestoreGeoPoint } from "../components/Map";
import { db, storage } from "../firebase";
import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	GeoPoint,
	arrayUnion,
	query,
	where,
	getDocs,
	getDoc,
	setDoc,
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
	latlngs,
	projectId,
	id,
}: {
	id: string;
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
const getProject = async (projectId: string) => {
	const docRef = doc(db, "projects", projectId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data()
	} else {
		console.log("No such document!");
	}
};

const attachReport = async (projectId:string, file:File, storagePath:string) => {
	try {
		
	  const storageRef = ref(storage, storagePath);
	  const snapshot = await uploadBytes(storageRef, file);
	  const downloadURL = await getDownloadURL(snapshot.ref);
	  await updateDocument('projects', projectId, { report: downloadURL });
	  return downloadURL;
	  
	} catch (error) {
	  console.error("Error uploading PDF:", error);
	  throw error;
	}
  };
  
const updateDocument = async (collectionPath:string, documentId:string, newData:any) => {
	try {
	  // Create a reference to the document in Firestore
	  const documentRef = doc(db, collectionPath, documentId);
  
	  // Update the document with the new data
	  await setDoc(documentRef, newData, { merge: true });
	} catch (error) {
	  console.error("Error updating document:", error);
	  throw error;
	}
  };

const removePolygon = async ({
	projectId,
	id,
}: {
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

const getPolygons = async (projectId: string) => {
	const polygonsRef = collection(db, "projects", projectId, "polygons");
	const q = query(polygonsRef);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data()) as firestoreGeoPoint[];
};

export { addComment, addPolygon, removePolygon, getPolygons, getProject, attachReport };
