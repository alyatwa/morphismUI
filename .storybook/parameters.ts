import type { BackgroundParameter } from "storybook-addon-background-toggle";

type Parameters = BackgroundParameter & {
	// other global types
};

export const storybookParameters: Parameters = {
    
	background: {
		default: "white",
		selector: "body",
		onChange(background) {
			// handle new background
		},
		options: [
			{
				id: "white",
				title: "White",
				color: "#fff",
			},
			{
				id: "black",
				title: "Black",
				color: "#000",
			},
			{
				id: "gradient",
				title: "Gradient",
				background:
					"linear-gradient(to right top, #5fc9f8, #72c9fa, #82c9fc, #91cafc, #9fcafc, #adcafc, #bbc9fb, #c7c9f9, #d7c9f6, #e5c9f1, #f0caec, #f9cce6)",
				color:
					"linear-gradient(to right top, #5fc9f8, #72c9fa, #82c9fc, #91cafc, #9fcafc, #adcafc, #bbc9fb, #c7c9f9, #d7c9f6, #e5c9f1, #f0caec, #f9cce6)",
			},
		],
	},
};
