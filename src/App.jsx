import { useState } from 'react'
import CalculaNota from './components/CalculaNota/CalculaNota'
import store from './components/CalculaNota/Store'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Analytics } from '@vercel';

function App() {

    return (
        <>
            <CalculaNota store={store} />
            <Analytics />
        </>
    )
}

export default App
