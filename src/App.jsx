import { useState } from 'react'
import CalculaNota from './components/CalculaNota/CalculaNota'
import store from './components/CalculaNota/Store'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <>
            <CalculaNota store={store} />
        </>
    )
}

export default App
