import React, { FC, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

type commentType = {
	comment: string;
	createdAt: Date;
	user: string;
	id: string;
};
const CommentsList:FC<any> = ({projectId}:{projectId:string}) => {
	const [comments, setComments] = React.useState<commentType[]>([]);
	const { user } = useAuth();
	const refreshData = () => {
		if (!user) {
			setComments([]);
			return;
		}
		const q = query(
			collection(db, "projects", projectId, "comments")
		);
		onSnapshot(q, (querySnapchot) => {
			let ar: commentType[] = [];
			querySnapchot.docs.forEach((doc) => {
				ar.push({ id: doc.id, ...doc.data() } as commentType);
			});
			setComments(ar);
		});
	};
	useEffect(() => {
		refreshData();
	}, [user]);

	return (
		<div className="flex flex-col gap-3 my-2">{comments && comments.map((comment) => 
        <p key={comment.id}>{'* '+comment.comment}</p>)}</div>
	);
};
export default CommentsList;
