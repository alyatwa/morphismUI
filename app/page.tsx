"use client";

import React from "react";
import { Morphism } from "../src";
import { AccountsSidebar } from "./components/AccountsSidebar";
import { MainSidebar } from "./components/MainSidebar";

export default function HomeContent() {
	return (
		<Morphism>
			<div className="relative min-h-screen max-h-screen w-full overflow-auto bg">
				<div className="flex flex-row justify-start bg-white/60">
					<MainSidebar />
					<AccountsSidebar />
				</div>
			</div>
		</Morphism>
	);
}
