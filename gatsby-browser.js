import './src/styles/global.css'
import { themeService } from "./src/services/themeService";

export const onClientEntry = () => {
    window.onload = () => {
        themeService.activateTheme();
    }
};
