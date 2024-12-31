/// <reference types="vite/client" />

interface ImportMetaEnv {
	// display shortcuts
	readonly VITE_DISPLAY_SHORTCUTS: "true" | "false";
	// different display layout styles
	readonly VITE_DISPLAY_LAYOUT:
		| "horizontal"
		| "vertical"
		| "size32"
		| "advanced";
	// by default left
	// value changing the letters used for shortcuts, right is based on the right keyboard part
	readonly VITE_KEYBOARD_SIDE: "left" | "right";
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
