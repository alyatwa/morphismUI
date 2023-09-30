"use client";

import React from "react";
import { Morphism } from "../src";
import { AccountsSidebar } from "./components/AccountsSidebar";

export default function HomeContent() {
	return (
		<Morphism>
			<div className="relative min-h-screen max-h-screen w-full overflow-auto bg">
				<AccountsSidebar />
			</div>
		</Morphism>
	);
}
