import type { Meta, StoryFn } from "@storybook/react";
import { Morphism } from "../../";
import { DarkThemeToggle } from "./DarkThemeToggle";

export default {
	title: "Components/DarkThemeToggle",
	component: DarkThemeToggle,
} as Meta;

const Template: StoryFn = (args) => (
		<Morphism>
			<DarkThemeToggle {...args} />
		</Morphism>
);

export const DefaultDarkThemeToggle = Template.bind({});
DefaultDarkThemeToggle.storyName = "Default";
DefaultDarkThemeToggle.args = {};
