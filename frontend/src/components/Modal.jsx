import ModalComponent from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const Modal = ({open, handleClose, className, children}) => {
  return (
    <div className=''><ModalComponent
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className={`rounded-lg modal p-10 max-h-[70%] md:max-h-[90%] overflow-scroll w-9/12 text-text-color ${className}`}>
        {children}
        </Box>
    
  </ModalComponent>
  </div>
  )
}
