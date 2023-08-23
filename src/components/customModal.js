import { Button, Modal} from "react-bootstrap";

const CustomModal = (props) => {
    const {modalTitle,closeTitle,submitTitle,children,openModal,closeModal,handleSubmit,disableSubmit,showFooter}=props;
  return (
    <Modal
        show={openModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
       <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
     {showFooter && <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>{closeTitle}</Button>
        <Button variant={submitTitle==='Delete' ? "danger":"primary"} disabled={disableSubmit} onClick={()=>handleSubmit()}>{submitTitle}</Button>
      </Modal.Footer>}
  </Modal>
  )
}

export default CustomModal;