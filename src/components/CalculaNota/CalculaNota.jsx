import { useRef, useState } from "react"
import { Form, Button, Container, Row, Col, Modal, InputGroup, Navbar, Toast, ToastContainer } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import { VscSettingsGear } from 'react-icons/vsc'

const CalculaNota = observer((props) => {
    const formRef = useRef(null)

    const [NP, setNP] = useState([]);
    const [questoes, setQuestoes] = useState(0);
    const [modalQuestoes, setModalQuestoes] = useState(0);
    const [gabaritoQ, setGabaritoQ] = useState([]);
    const [gabaritoC, setGabaritoC] = useState([]);
    const [modalValidated, setModalValidated] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formHidden, setFormHidden] = useState(true)
    const position = 'middle-center';
    const [toastHidden, setToastHidden] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            props.store.calcula(NP, gabaritoQ, gabaritoC)
            setToastHidden(false)
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
        }
    };

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
                        <b>Para continuarmos, é necessário que você insira o número de questões à serem corrigidas.</b>
                        <br />
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
                    <Navbar className="bg-transparent">
                        <Container>
                            <Navbar.Brand className="text-primary">Calculadora Pró Floripa</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <Button variant="light" className="ms-auto" onClick={handleShow}>
                                        <VscSettingsGear className="text-dark mb-1" />
                                    </Button>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Configurações</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={modalValidated} onSubmit={handleModalSubmit}>
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
                <Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit} hidden={formHidden} ref={formRef}>
                    {Array(questoes)
                        .fill(0)
                        .map((x, idx) => (
                            <div key={idx} className="mb-4 bg-light rounded p-4">
                                <Form.Label className="h4">Questão {idx + 1}</Form.Label>
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
                                                    let formId = idx
                                                    let newGabaritoQ = [...gabaritoQ];
                                                    newGabaritoQ[formId] = (parseInt(e.target.value))
                                                    setGabaritoQ(newGabaritoQ);

                                                }}
                                            />
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
                                                min={1}
                                                max={99}
                                                onBlur={e => {
                                                    let formId = idx
                                                    let newGabaritoC = [...gabaritoC];
                                                    newGabaritoC[formId] = (parseInt(e.target.value))
                                                    setGabaritoC(newGabaritoC);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Por favor, insira um número entre 1 e 99
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
                            </div>
                        ))}
                    <Button type="submit" className="mt-3 mb-5">Calcular</Button>
                    {/* <br /> <br /> <h1 className="text-success">Nota: {props.store.nota} / {questoes}</h1> */}
                </Form>
                    <ToastContainer
                        className="p-3 position-relative mt-5 z-4"
                        position={position}
                        style={{ zIndex: 1 }} hidden={toastHidden}>
                        <Toast onClose={() => setToastHidden(true)} id="toast">
                            <Toast.Header closeButton={true}>
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
