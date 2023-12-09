import { useRef, useState, useEffect } from "react"
import { Form, Button, Container, Row, Col, Modal, InputGroup, Navbar, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import { VscSettingsGear } from 'react-icons/vsc'
import { BsFillCalculatorFill } from 'react-icons/bs'
import ReactGA from "react-ga4";

const CalculaNota = observer((props) => {

    useEffect(() => {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname});
    }, []);

    const formRef = useRef(null)

    const [NP, setNP] = useState([]);
    const [questoes, setQuestoes] = useState(0);
    const [modalQuestoes, setModalQuestoes] = useState(0)
    const [gabaritoQ, setGabaritoQ] = useState([]);
    const [gabaritoC, setGabaritoC] = useState([]);
    const [modalValidated, setModalValidated] = useState(false);
    const [modalPesosValidated, setModalPesosValidated] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formHidden, setFormHidden] = useState(true)
    const position = 'bottom-end';
    const [toastHidden, setToastHidden] = useState(true);
    const [UFSC, setUFSC] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // NOTAS
    const [notaPTG, setNotaPTG] = useState(0);
    const [notaLLE, setNotaLLE] = useState(0);
    const [notaMTM, setNotaMTM] = useState(0);
    const [notaBLG, setNotaBLG] = useState(0);
    const [notaCHS, setNotaCHS] = useState(0);
    const [notaFSC, setNotaFSC] = useState(0);
    const [notaQMC, setNotaQMC] = useState(0);
    const [notaDSC, setNotaDSC] = useState(0);
    const [notaRDC, setNotaRDC] = useState(0);

    // PESOS
    const [pesoPTG, setPesoPTG] = useState(0);
    const [pesoLLE, setPesoLLE] = useState(0);
    const [pesoMTM, setPesoMTM] = useState(0);
    const [pesoBLG, setPesoBLG] = useState(0);
    const [pesoCHS, setPesoCHS] = useState(0);
    const [pesoFSC, setPesoFSC] = useState(0);
    const [pesoQMC, setPesoQMC] = useState(0);
    const [pesoDSC, setPesoDSC] = useState(0);
    const [pesoRDC, setPesoRDC] = useState(0);
    const [pesoPMC, setPesoPMC] = useState(0);

    // Peso Calculado
    const [pesoCalculado, setPesoCalculado] = useState(false)

    const [showPesos, setShowPesos] = useState(false);
    const handleClosePesos = () => setShowPesos(false);
    const handleShowPesos = () => {
        setNotaPTG(resultadoNotaMateria(0, 12).toFixed(2))
        setNotaLLE(resultadoNotaMateria(12, 20).toFixed(2))
        setNotaMTM(resultadoNotaMateria(20, 30).toFixed(2))
        setNotaBLG(resultadoNotaMateria(30, 40).toFixed(2))
        setNotaCHS(resultadoNotaMateria(40, 60).toFixed(2))
        setNotaFSC(resultadoNotaMateria(60, 70).toFixed(2))
        setNotaQMC(resultadoNotaMateria(70, 80).toFixed(2))
        setShowPesos(true)
    };
    
    const [showInitial, setShowInitial] = useState(true);
    const handleCloseInitial = () => setShowInitial(false);
    
    const [validations, setValidations] = useState(new Array(questoes.length).fill(false));
    
    const handleModalQuestoes = (e) => {
        setModalQuestoes(e.target.value)
    }
    
    const handleSubmit = (e) => {
        const isFormValid = validations.every(validation => validation === true);
        
        if (!isFormValid) {
            e.preventDefault()
            return;
        }
        
        const form = e.currentTarget;
        e.preventDefault();
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            let notaCalculadaV2 = props.store.calcula(NP, gabaritoQ, gabaritoC)
            notaCalculadaV2
            setToastHidden(false)
            window.scrollTo({top: 0, behavior: 'smooth'})
            ReactGA.event({
                category: "Notas",
                action: "Calcular nota",
                value: notaCalculadaV2
            })
        }
    }

    const handleModalSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setModalValidated(true);
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setQuestoes(parseInt(modalQuestoes))
            formRef.current.reset()
            setValidations(new Array(questoes.length).fill(false))
            setValidated(false)
            setNP([])
            setGabaritoQ([])
            setGabaritoC([])
            setToastHidden(true)
            props.store.reseta()
            setFormHidden(false)
            handleClose()
            handleCloseInitial()
            setUFSC(false)
        }
    };

    const handlePesosSubmit = (e) => {
        const isFormValid = validations.every(validation => validation === true);

        if (!isFormValid) {
          e.preventDefault()
          return;
        }

        const form = e.currentTarget;
        e.preventDefault();
        setModalPesosValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            props.store.calculaNotaFinal(notaPTG, notaLLE, notaMTM, notaBLG, notaCHS, notaFSC, notaQMC, notaDSC, notaRDC, pesoPTG, pesoLLE, pesoMTM, pesoBLG, pesoCHS, pesoFSC, pesoQMC, pesoDSC, pesoRDC, pesoPMC)
            setPesoCalculado(true)
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    const handleSelectChange = (e, idx) => {
        let selectedValue = parseInt(e.target.value);
        let newValidations = [...validations];
        let newNP = [...NP];
      
        if (selectedValue === 0) {
          newValidations[idx] = false;
        } else {
          newValidations[idx] = true;
        }
      
        newNP[idx] = selectedValue;
        setNP(newNP);
        setValidations(newValidations);
      }

      const resultadoNotaMateria = (i, f) => {
            const slicedArray = props.store.notasQ.slice(i, f);
            const soma = slicedArray.reduce((acumulador, elemento) => acumulador + elemento, 0);

            return soma
      }

      const modalUFSC = () => {
        setUFSC(true)
        setQuestoes(80)
        formRef.current.reset()
        setValidations(new Array(questoes.length).fill(false))
        setValidated(false)
        setNP([])
        setGabaritoQ([])
        setGabaritoC([])
        setToastHidden(true)
        props.store.reseta()
        setFormHidden(false)
        handleClose()
        handleCloseInitial()
      }

    
    return (
        <>
            <Modal
                show={showInitial}
                onHide={handleCloseInitial}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Calculadora Somatório - UFSC</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={modalValidated} onSubmit={handleModalSubmit}>
                    <Modal.Body>
                        Bem-vindo à Calculadora Somatório do Cursinho Pró Floripa
                        <br />
                        <br />
                        As notas finais são obtidas através do seguinte cálculo:
                        <br />
                        <b>P = (NP - (NTPC - (NPC - NPI)))/NP</b>
                        <br />
                        <br />
                        <b>Onde:</b>
                        <br />
                        P – Pontuação do candidato na questão
                        <br />
                        NP – Número de proposições da questão
                        <br />
                        NTPC – Número total de proposições corretas na questão
                        <br />
                        NPC – Número de proposições corretas consideradas corretas pelo candidato
                        <br />
                        NPI – Número de proposições incorretas consideradas corretas pelo candidato
                        <hr />
                        <b className="text-center">Para continuarmos, caso voce deseja corrigir sua prova da UFSC, clique no botão abaixo. Caso queira corrigir um simulado, insira o número de questões a serem corrigidas.</b>
                        <br />
                        <br />
                        <Form.Group className="d-flex gap-2 align-items-center justify-content-center">
                            <Button type="button" onClick={modalUFSC} className="w-100">Prova UFSC</Button>
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="number"
                                placeholder="1 - 180"
                                autoFocus
                                required
                                value={modalQuestoes !== 0 && modalQuestoes}
                                min={1}
                                max={180}
                                inputMode="numeric"
                                onChange={handleModalQuestoes}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, insira um número entre 1 e 180
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">Salvar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Container>
                {!showInitial &&
                    <Navbar className="bg-transparent flex-column">
                            <Navbar.Brand className="text-primary">Calculadora Pró Floripa</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text hidden={!UFSC} className="me-2">
                                        <Button variant="light" className="ms-auto" onClick={handleShowPesos} disabled={toastHidden}>
                                            <a className="text-decoration-none"><Navbar.Brand className="text-warning fw-bold">Pesos</Navbar.Brand></a>
                                            <BsFillCalculatorFill className="text-dark mb-1" />
                                        </Button>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Button variant="light" className="ms-auto" onClick={handleShow}>
                                        <VscSettingsGear className="text-dark mb-1" />
                                    </Button>
                                </Navbar.Text>
                            </Navbar.Collapse>
                    </Navbar>
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Configurações</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={modalPesosValidated} onSubmit={handleModalSubmit}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Número de questões da prova</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="1 - 180"
                                    autoFocus
                                    required
                                    value={modalQuestoes !== 0 && modalQuestoes}
                                    min={1}
                                    max={180}
                                    inputMode="numeric"
                                    onChange={handleModalQuestoes}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, insira um número entre 1 e 180
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary">
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Modal show={showPesos && !toastHidden} size="xl" onHide={handleClosePesos}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cálculo com pesos</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={modalPesosValidated} onSubmit={handlePesosSubmit}>
                        <Modal.Body>
                            <>
                                {!toastHidden && UFSC && <Alert variant="success" dismissible><Alert.Heading>Não se preocupe, já inseri algumas de suas notas para facilitar o cálculo :)</Alert.Heading></Alert>}
                                <h3 className="mb-4">Insira suas notas:</h3>
                                <Row className="mb-3">
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-portugues">Português</InputGroup.Text>
                                            <Form.Control placeholder="PTG" defaultValue={notaPTG} step=".01" aria-label="Português" aria-describedby="inputGroup-portugues" required type="number" max={12} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 12
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={4} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-slingua">Segunda Língua</InputGroup.Text>
                                            <Form.Control placeholder="LLE" defaultValue={notaLLE} step=".01" aria-label="Segunda Língua" aria-describedby="inputGroup-slingua" required type="number" max={8} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 8
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-matematica">Matemática</InputGroup.Text>
                                            <Form.Control placeholder="MTM" defaultValue={notaMTM} step=".01" aria-label="Matemática" aria-describedby="inputGroup-matematica" required type="number" max={10} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 10
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-biologia">Biologia</InputGroup.Text>
                                            <Form.Control placeholder="BLG" defaultValue={notaBLG} step=".01" aria-label="Biologia" aria-describedby="inputGroup-biologia" required type="number" max={10} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 10
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={4} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-chs">Ciências H. S.</InputGroup.Text>
                                            <Form.Control placeholder="CHS" defaultValue={notaCHS} step=".01" aria-label="Ciências H. S." aria-describedby="inputGroup-chs" required type="number" max={20} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 20
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-fisica">Física</InputGroup.Text>
                                            <Form.Control placeholder="FSC" defaultValue={notaFSC} step=".01" aria-label="Física" aria-describedby="inputGroup-fisica" required type="number" max={10} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 10
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-quimica">Química</InputGroup.Text>
                                            <Form.Control placeholder="QMC" defaultValue={notaQMC} step=".01" aria-label="Química" aria-describedby="inputGroup-quimica" required type="number" max={10} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 10
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={4} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-discursivas">Discursivas</InputGroup.Text>
                                            <Form.Control placeholder="DSC" onBlur={(e) => setNotaDSC(e.target.value)} step=".01" aria-label="Discursivas" aria-describedby="inputGroup-discursivas" required type="number" max={10} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 10
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-redacao">Redação</InputGroup.Text>
                                            <Form.Control placeholder="RDC" onBlur={(e) => setNotaRDC(e.target.value)} step=".01" aria-label="Redação" aria-describedby="inputGroup-redacao" required type="number" max={10} min={0} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 0 e 10
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <h3 className="mb-4">Insira os pesos do curso desejado:</h3>
                                <Row className="mb-3">
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-portugues">Português</InputGroup.Text>
                                            <Form.Control placeholder="PTG" onBlur={(e) => setPesoPTG(e.target.value)} step=".01" aria-label="Português" aria-describedby="inputGroup-portugues" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={4} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-slingua">Segunda Língua</InputGroup.Text>
                                            <Form.Control placeholder="LLE" onBlur={(e) => setPesoLLE(e.target.value)} step=".01" aria-label="Segunda Língua" aria-describedby="inputGroup-slingua" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-matematica">Matemática</InputGroup.Text>
                                            <Form.Control placeholder="MTM" onBlur={(e) => setPesoMTM(e.target.value)} step=".01" aria-label="Matemática" aria-describedby="inputGroup-matematica" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-biologia">Biologia</InputGroup.Text>
                                            <Form.Control placeholder="BLG" onBlur={(e) => setPesoBLG(e.target.value)} step=".01" aria-label="Biologia" aria-describedby="inputGroup-biologia" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={4} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-chs">Ciências H. S.</InputGroup.Text>
                                            <Form.Control placeholder="CHS" onBlur={(e) => setPesoCHS(e.target.value)} step=".01" aria-label="Ciências H. S." aria-describedby="inputGroup-chs" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-fisica">Física</InputGroup.Text>
                                            <Form.Control placeholder="FSC" onBlur={(e) => setPesoFSC(e.target.value)} step=".01" aria-label="Física" aria-describedby="inputGroup-fisica" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-quimica">Química</InputGroup.Text>
                                            <Form.Control placeholder="QMC" onBlur={(e) => setPesoQMC(e.target.value)} step=".01" aria-label="Química" aria-describedby="inputGroup-quimica" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={4} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-discursivas">Discursivas</InputGroup.Text>
                                            <Form.Control placeholder="DSC" onBlur={(e) => setPesoDSC(e.target.value)} step=".01" aria-label="Discursivas" aria-describedby="inputGroup-discursivas" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={3} className={"mb-3"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-redacao">Redação</InputGroup.Text>
                                            <Form.Control placeholder="RDC" onBlur={(e) => setPesoRDC(e.target.value)} step=".01" aria-label="Redação" aria-describedby="inputGroup-redacao" required type="number" max={5} min={1} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 5
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4} className={"mb-3 mt-lg-5"}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroup-pmc">Pontuação Máxima</InputGroup.Text>
                                            <Form.Control placeholder="PMC" onBlur={(e) => setPesoPMC(e.target.value)} aria-label="Pontuação Máxima" aria-describedby="inputGroup-pmc" required type="number" max={200} min={100} inputMode="numeric"/>
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 100 e 200
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row hidden={!pesoCalculado} className="p-2">
                                    <ToastContainer
                                    className="position-relative z-4"
                                        position={'top-center'}
                                        style={{ zIndex: 1000 }} hidden={!pesoCalculado}>
                                        <Toast onClose={() => setPesoCalculado(false)} id="toastPesos">
                                            <Toast.Header closeButton={true}>
                                                <strong className="me-auto">Pró Floripa</strong>
                                                <small>Agora</small>
                                            </Toast.Header>
                                            <Toast.Body>Você tirou <b>{props.store.notasPesadas} de 100.00</b> pontos, parabéns 🎉</Toast.Body>
                                        </Toast>
                                    </ToastContainer>
                                </Row>

                            </>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={handleClosePesos}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary">
                                Calcular
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit} hidden={formHidden} ref={formRef}>
                    {UFSC && <Alert key={'Prova-01'} variant="primary"><h2>Prova do 1º dia – Português, Segunda Língua, Matemática e Biologia</h2></Alert>}
                    {Array(questoes)
                        .fill(0)
                        .map((x, idx) => (
                            <>
                                {UFSC && idx === 40 && <Alert key={'Prova-02'} variant="primary"><h2>Prova do 2º dia – Ciências Humanas e Sociais, Física e Química</h2></Alert>}
                                <div key={idx} className='mb-4 bg-light rounded p-4'>
                                        {UFSC && idx === 0 && <> <h3 className="text-success">Português</h3> <hr /></>}
                                        {UFSC && idx === 12 && <><h3 className="text-success">Segunda Língua</h3> <hr /></>}
                                        {UFSC && idx === 20 && <><h3 className="text-success">Matemática</h3> <hr /></>}
                                        {UFSC && idx === 30 && <><h3 className="text-success">Biologia</h3> <hr /></>}
                                        {UFSC && idx === 40 && <><h3 className="text-success">Ciências Humanas e Sociais</h3> <hr /></>}
                                        {UFSC && idx === 60 && <><h3 className="text-success">Física</h3> <hr /></>}
                                        {UFSC && idx === 70 && <><h3 className="text-success">Química</h3> <hr /></>}

                                        {UFSC && idx > 39 ?
                                            <Form.Label className="h4">Questão {idx - 39}</Form.Label> :
                                            <Form.Label className="h4">Questão {idx + 1}</Form.Label>}
                                        <Row>
                                            <Col>
                                                <Form.Label>Gabarito da questão</Form.Label>
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="00-99"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        defaultValue={0}
                                                        min={1}
                                                        max={99}
                                                        inputMode="numeric"
                                                        onBlur={e => {
                                                            let formId = idx;
                                                            let newGabaritoQ = [...gabaritoQ];
                                                            newGabaritoQ[formId] = (parseInt(e.target.value));
                                                            setGabaritoQ(newGabaritoQ);

                                                        } } />
                                                    <Form.Control.Feedback type="invalid">
                                                        Por favor, insira um número entre 1 e 99
                                                    </Form.Control.Feedback>
                                                    
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <Form.Label>Gabarito do candidato</Form.Label>
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="00-99"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        defaultValue={0}
                                                        inputMode="numeric"
                                                        min={0}
                                                        max={99}
                                                        onBlur={e => {
                                                            let formId = idx;
                                                            let newGabaritoC = [...gabaritoC];
                                                            newGabaritoC[formId] = (parseInt(e.target.value));
                                                            setGabaritoC(newGabaritoC);
                                                        } } />
                                                    <Form.Control.Feedback type="invalid">
                                                        Por favor, insira um número entre 0 e 99
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <Form.Label>Maior proposição</Form.Label>
                                                <InputGroup type="number" hasValidation>
                                                    <Form.Select
                                                        type="number"
                                                        required
                                                        defaultValue={0}
                                                        isInvalid={!validations[idx]}
                                                        onChange={(e) => handleSelectChange(e, idx)}
                                                    >
                                                        <option disabled value={0}>Selecione uma opção</option>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>4</option>
                                                        <option value={4}>8</option>
                                                        <option value={5}>16</option>
                                                        <option value={6}>32</option>
                                                        <option value={7}>64</option>
                                                        <option value={8}>Aberta</option>
                                                    </Form.Select>

                                                    <Form.Control.Feedback type="invalid">
                                                        Sua questão será zerada.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        {!toastHidden ?
                                            <Row>
                                                <Col>
                                                    <br />
                                                    <h5>Pontuação: {props.store.notasQ[idx] === undefined || NaN ? '0.00' : props.store.notasQ[idx].toFixed(2)} de 1.00</h5>
                                                </Col>
                                            </Row>
                                            : null}
                                    </div></>
                            ))}
                        <Button type="submit" className="mt-3 mb-5">Calcular</Button>
                    </Form>
                        <ToastContainer
                            className="p-4 position-fixed mt-5 z-4"
                            position={position}
                            style={{ zIndex: 100000000 }} hidden={toastHidden || showPesos}>
                            <Toast onClose={() => setToastHidden(true)} id="toast">
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Pró Floripa</strong>
                                    <small>Agora</small>
                                </Toast.Header>
                                <Toast.Body>Você tirou <b>{props.store.nota} de {questoes}.00</b> pontos, parabéns 🎉</Toast.Body>
                            </Toast>
                        </ToastContainer>
                </Container >
                {!showInitial &&
                    <footer>
                        <Container>
                            <div className="container text-center">
                                <small className="position-sticky py-4">
                                    Copyright &copy; Desenvolvido por Nickolas Abad ❤️ |
                                    <a href="https://linkedin.com/in/nickolas-desenvolvedor" className="ms-1 text-decoration-none">LinkedIn</a> &
                                    <a href="https://github.com/NickolasAbad" className="ms-1 text-decoration-none">GitHub</a>
                                </small>
                            </div>
                        </Container>
                    </footer>
                }
        </>
    )
})

export default CalculaNota
