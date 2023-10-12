import Link from "next/link";
import { Button } from "~/src";
import { attachReport } from "../api/project";

export const Report = ({projectId, polygon, updateReport}:{updateReport:(polygonId:string, downloadURL:string)=>void,projectId:string, polygon:{id:string, reportURL:string}}) => {
     
    const handleAddReport = async (e: any) => {
		e.preventDefault();
		document.getElementById("fileInput")?.click();
		const file = e.target[0]?.files[0];
		if (!file) return;
		const storagePath = "pdfs/" + file.name;
		try {
			const downloadURL = await attachReport(projectId, file, storagePath, polygon.id) ?? '';
			alert("file uploaded!");
            updateReport(polygon.id, downloadURL);
			console.log("PDF uploaded to:", downloadURL);
		} catch (error) {
			console.error("Error uploading PDF:", error);
		}
	};
	return (
		<div className="flex flex-col gap-2 rounded-3xl bg-blue-400/80 h-fit p-4">
            <p className="textaRegular text-md">Polygon Name: {polygon.id}</p>
            <div className="flex items-center justify-around">
			<form onSubmit={handleAddReport} className="form">
				<input id="fileInput" type="file" className="hidden" />
				<Button type="submit" color="transparent" label="Attach Report" />
			</form>

			<Link href={{ pathname: polygon.reportURL }} target="_blank">
				{polygon.reportURL ? "View file" : "No file"}
			</Link></div>
		</div>
	);
};
