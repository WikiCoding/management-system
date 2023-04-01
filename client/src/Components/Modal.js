import Modal from 'react-modal';

const OptionModal = () => {

  return (<div>
    <Modal
      isOpen={true}
      ariaHideApp={false}
      contentLabel="Selected Option">
      <h3>My React Modal</h3>
      <button>Ok</button>
    </Modal>
  </div>
  )
}

export default OptionModal;