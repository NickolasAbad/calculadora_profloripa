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
            <CalculaNota store={store} />
        </>
    )
}

export default App
