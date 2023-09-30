import React, { FC } from "react";
import { HelperText, Button } from "../../src";
export const AccountsSidebar: FC = () => {
	return (
		<div className="flex flex-col items-center gap-2 w-64 h-screen antialiased ">
			<HelperText className="text-lg text-gray-600 my-8 font-textaMedium font-medium">Accounts</HelperText>
			<Button color="info" size="md" label="+ Add Account" />
		</div>
	);
};
