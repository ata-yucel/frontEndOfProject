import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function YesNoModal({ isShowModal, setIsShowModal, title, desc, onClickYes}) {

  const handleClose = () => setIsShowModal(false);

  return (
    <div>
      <Modal
        open={isShowModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {desc}
          </Typography>
          <Box className="flex justify-around mt-4">
            <Button color='error' variant='outlined' onClick={handleClose}>No</Button>
            <Button color='success' variant='outlined' onClick={onClickYes}>Yes</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
