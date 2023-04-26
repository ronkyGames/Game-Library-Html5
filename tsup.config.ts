import { defineConfig, Options } from "tsup";

const options: Options = {
	clean: true,
	entry: ["src/index.ts", "src/SpaceGame/main.ts"],
	format: ["esm"],
	platform: "node",
	target: "esnext",
};

export default defineConfig(options);
