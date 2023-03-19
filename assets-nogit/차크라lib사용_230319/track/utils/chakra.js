import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
	// useSystemColorMode: true,
	fonts: {
		heading: "Pretendard Variable,  -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
	},
	// colors: {
	// 	brand: {
	// 		100: "#f7fafc",
	// 		// ...
	// 		900: "#1a202c",
	// 	},
	// },
	// Link: {
	// 	variants: {
	// 		// you can name it whatever you want
	// 		primary: ({ colorScheme = "blue" }) => ({
	// 			color: `${colorScheme}.500`,
	// 			_hover: {
	// 				color: `${colorScheme}.400`,
	// 			},
	// 		}),
	// 	},
	// 	defaultProps: {
	// 		// you can name it whatever you want
	// 		variant: "primary",
	// 	},
	// },
	styles: {
		global: {
			body: {
				fontFamily: "Pretendard Variable,  -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
				display: "flex",
				justifyContent: "center",
			},
			"#__next": {
				w: "600px",
				minW: "250px",
				minH: "100vh",
			},
			".mapboxgl-ctrl-group button": {
				display: "none",
			},
		},
	},
};


const global = extendTheme({ config })


export default global;