import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from "./store";
import {Provider} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material";
import App from "./App";
import {Toaster} from "react-hot-toast";

const theme = createTheme({
    palette: {
        primary: {
            light: '#b0bec5',
            main: '#78909C',
            dark: '#37474F',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#DD2C00',
            dark: '#ba000d',
            contrastText: '#000',
        },
        tertiary: {
            light: '#82a6d0',
            main: '#618ac5',
            dark: '#05142f',
            contrastText: '#000',
        },
    },
});

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
            <ThemeProvider theme={theme}>
                <App />
                <Toaster position="top-right" />
            </ThemeProvider>
        </StrictMode>
    </Provider>
)
