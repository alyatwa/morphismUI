import Link from "next/link";
import { Button } from "~/src";
import { attachReport } from "../api/project";
import { useState } from "react";

export const Report = ({
	projectId,
	polygon,
	updateReport,
	updateColor,
}: {
	updateReport: (polygonId: string, downloadURL: string) => void;
	updateColor: (polygonId: string, color: string) => void;
	projectId: string;
	polygon: { id: string; color: string; reportURL: string };
}) => {
	const handleAddReport = async (e: any) => {
		e.preventDefault();
		document.getElementById("fileInput")?.click();
		const file = e.target[0]?.files[0];
		if (!file) return;
		const storagePath = "pdfs/" + file.name;
		try {
			const downloadURL =
				(await attachReport(projectId, file, storagePath, polygon.id)) ?? "";
			alert("file uploaded!");
			updateReport(polygon.id, downloadURL);
			console.log("PDF uploaded to:", downloadURL);
		} catch (error) {
			console.error("Error uploading PDF:", error);
		}
	};
	const [selectedColor, setSelectedColor] = useState<string>(polygon?.color);

	const colors = ["red", "blue", "green", "yellow", "orange"];

	const handleClick = (color: string) => {
		setSelectedColor(color);
		updateColor(polygon.id, color);
	};

	return (
		<div
			className={`flex flex-col gap-2 rounded-3xl bg-${polygon.color}-600/60 h-fit p-4`}
		>
			<ul className="flex list-none justify-center">
				{colors.map((color) => (
					<li
						className={`${selectedColor == color ? 'border-4 border-white' : '' } w-4 h-4 rounded-full m-2 cursor-pointer bg-${color}-600`}
						key={color}
						onClick={() => handleClick(color)}
					></li>
				))}
			</ul>

			<p className="textaRegular text-md">Polygon Name: {polygon.id}</p>
			<div className="flex items-center justify-around">
				<form onSubmit={handleAddReport} className="form">
					<input id="fileInput" type="file" className="hidden" />
					<Button type="submit" color="transparent" label="Attach Report" />
				</form>

				<Link href={{ pathname: polygon.reportURL }} target="_blank">
					{polygon.reportURL ? "View file" : "No file"}
				</Link>
			</div>
		</div>
	);
};
