"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Morphism, TextInput } from "../src";
import { AccountsSidebar } from "./components/AccountsSidebar";
//import { MainSidebar } from "./components/MainSidebar";
import dynamic from "next/dynamic";
import useAuth from "./hooks/useAuth";
import { addComment, getProject } from "./api/project";
import Auth from "./components/Auth";
import CommentsList from "./components/CommentsList";

export default function HomeContent() {
	const { isLoggedIn, user } = useAuth();
	const [comment, setComment] = useState<string>("");
	const [project, setProject] = useState<any>("");
	const projectId = "SRF5DoLFMbRO6Rf8dtfi";
	const handleAddComment = async () => {
		console.log("addComment");
		await addComment({ comment, userId: user?.uid, projectId });
	};
	const Map = useMemo(
		() =>
			dynamic(() => import("~/app/components/Map"), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[]
	);
	const refreshData = () => {
		if (!user) {
			setProject(null);
			return;
		} else {
			getProject(projectId).then((data) => {
				console.log(data);
				setProject(data);
			});
		}
	};
	useEffect(() => {
		refreshData();
	}, [user]);
	return (
		<Morphism>
			<div className="relative min-h-screen max-h-screen w-full overflow-auto bg antialiased">
				<div className="bg-white/60 min-h-screen h-full">
					<div className="flex justify-end items-center h-[60px] px-8">
						<Auth />
					</div>
					<div className="flex flex-row justify-start ">
						{/* <MainSidebar /> */}
						<AccountsSidebar />
						{isLoggedIn ? (
							<>
								<div className="flex flex-col gap-3 my-3">
									<p>Data is saved when you create a polygon</p>
									{project && (
										<Map
											position={[project.position._lat, project.position._long]}
											zoom={project.zoom}
											projectId={projectId}
										/>
									)}
									<div className="flex items-center justify-around rounded-3xl bg-blue-400/80 h-20">
										<Button
											color="transparent"
											onClick={() => handleAddComment()}
											label="Attach Report"
										/>
										<p className="ml-4 font-textaLight">file-name.pdf</p>
									</div>
								</div>
								<div className="flex flex-col">
									<div className="mx-8 ">
										<CommentsList projectId={projectId} />
									</div>
									<div className="flex flex-col gap-4 ml-8">
										<TextInput
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										/>
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
