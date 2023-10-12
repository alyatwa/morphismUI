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
	projectId
}: {
	projectId: string;
	latlngs: { lat: number; lng: number }[];
}) :Promise<string | null> => {
	try {
		const newDoc = await addDoc(collection(db, "projects", projectId, "polygons"), {
			projectId,
			latlngs: arrayUnion(
				...latlngs.map((l) => {
					return new GeoPoint(l.lat, l.lng);
				})
			),
		})
		return newDoc.id

	} catch (err) {
		console.log(err);
	}
	return null
};
const getProject = async (projectId: string) => {
	const docRef = doc(db, "projects", projectId);
	const docSnap = await getDoc(docRef);
    let project:any = {}
	if (docSnap.exists()) {
		project = docSnap.data()
		const polygonsRef = collection(db, "projects", projectId, "polygons") 
		const q = query(polygonsRef)
		const querySnapshot = await getDocs(q);
		project.polygons = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})) as firestoreGeoPoint[];
		console.log("Document data:", project)
		return project
	} else {
		console.log("No such document!");
	}
};

const attachReport = async (projectId:string, file:File, storagePath:string, polygonId:string) => {
	try {
		if(!projectId || !polygonId){
			
		console.log('attach:   ',projectId,   polygonId)
		return
	}
	  const storageRef = ref(storage, storagePath);
	  const snapshot = await uploadBytes(storageRef, file);
	  const downloadURL = await getDownloadURL(snapshot.ref);
	  await updateDocument({projectId,polygonId, newData:{ reportURL: downloadURL }});
	  return downloadURL;
	  
	} catch (error) {
	  console.error("Error uploading PDF:", error);
	  throw error;
	}
  };
  
const updateDocument = async ({projectId,polygonId, newData}:{polygonId:string,projectId:string, newData:{reportURL:string}}) => {
	try {
	  // Create a reference to the document in Firestore
	  const documentRef = doc(db, 'projects', projectId, 'polygons', polygonId);
  
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
	id: string;
}) => {
	console.log("id", id);
	const polygonsRef = doc(db, "projects", projectId, "polygons", id);
	try {
		 await deleteDoc(polygonsRef)
	} catch (err) {
		console.log(err);
	}
};

const getPolygons = async (projectId: string) => {
	const polygonsRef = collection(db, "projects", projectId, "polygons") 
	const q = query(polygonsRef)
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})) as firestoreGeoPoint[];
};

export { addComment, addPolygon, removePolygon, getPolygons, getProject, attachReport };
