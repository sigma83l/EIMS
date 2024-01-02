import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import global_en from "../src/components/translation/en/global.json";
import global_tr from "../src/components/translation/tr/global.json";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import { I18nextProvider } from "react-i18next";

i18next.use(HttpApi).init({
	interpolation: { escapeValue: false },
	lng: "en",
	fallbackLng: "en",
	resources: {
		en: {
			global: global_en,
		},
		tr: {
			global: global_tr,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18next}>
			<App />
		</I18nextProvider>
	</React.StrictMode>
);
