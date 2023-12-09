import { useState } from 'react'
import CalculaNota from './components/CalculaNota/CalculaNota'
import store from './components/CalculaNota/Store'

import ReactGA from "react-ga4";

import 'bootstrap/dist/css/bootstrap.min.css';

const TRACKING_ID = "G-G9K4133B64";
ReactGA.initialize(TRACKING_ID)

function App() {

    return (
        <>
            <head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-G9K4133B64"></script>
            <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-G9K4133B64');
            </script>
            </head>
            <CalculaNota store={store} />
        </>
    )
}

export default App
