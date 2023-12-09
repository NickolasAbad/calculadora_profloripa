import { useState } from 'react'
import CalculaNota from './components/CalculaNota/CalculaNota'
import store from './components/CalculaNota/Store'

import ReactGA from "react-ga"

import 'bootstrap/dist/css/bootstrap.min.css';

const TRACKING_ID = "UA-190303794-1";
ReactGA.initialize(TRACKING_ID)

function App() {

    return (
        <>
            <CalculaNota store={store} />
        </>
    )
}

export default App
