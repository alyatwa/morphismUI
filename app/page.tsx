"use client";
import { db } from "./firebase";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

import React, { useMemo, useState } from "react";
import { Button, Morphism, TextInput } from "../src";
import { AccountsSidebar } from "./components/AccountsSidebar";
import { MainSidebar } from "./components/MainSidebar";
import dynamic from "next/dynamic";
import useAuth from "./hooks/useAuth";
import { addComment } from "./api/project";
import Auth from "./components/Auth";
import CommentsList from "./components/CommentsList";

export default function HomeContent() {
	const { isLoggedIn, user } = useAuth();
	const [comment, setComment] = useState<string>('');
	const handleAddComment = async () => {
		console.log("addComment");
		await addComment({ comment, userId: user?.uid, projectId: "SRF5DoLFMbRO6Rf8dtfi" });
	};
	const Map = useMemo(
		() =>
			dynamic(() => import("~/app/components/Map"), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[]
	);

	return (
		<Morphism>
			<div className="relative min-h-screen max-h-screen w-full overflow-auto bg antialiased">
				<div className="bg-white/60 min-h-screen h-full">
					<div className="flex justify-end items-center h-[60px] px-8">
						<Auth />
					</div>
					<div className="flex flex-row justify-start ">
						<MainSidebar />
						<AccountsSidebar />
						{isLoggedIn ? (
							<>
								<div>
									<Map position={[51.505, -0.09]} zoom={13} projectId={"SRF5DoLFMbRO6Rf8dtfi"} />
								</div>
								<div className="flex flex-col">
									<div className="mx-8 ">
										<CommentsList projectId={"SRF5DoLFMbRO6Rf8dtfi"} />
									</div>
									<div className="flex flex-col gap-4 ml-8">
										<TextInput value={comment} onChange={(e) => setComment(e.target.value)} />
										<Button
											color="transparent"
											onClick={() => handleAddComment()}
											label="Add comment"
										/>
									</div>
								</div>
							</>
						) : (
							<div className="flex justify-center items-center">
								<p className="font-textaRegular text-base">
									Login to view project
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Morphism>
	);
}
