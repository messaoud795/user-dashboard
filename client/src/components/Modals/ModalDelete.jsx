import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./ModalDelete.css";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user_actions";

export default function ModalDelete({ id }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit() {
    dispatch(deleteUser(id));
    handleClose();
  }

  return (
    <div>
      <HighlightOffIcon
        type="button"
        onClick={handleClickOpen}
        className="deleteIcon"
      >
        react-transition-group
      </HighlightOffIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete user informations
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions className="ModalDelete__dialogActions">
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className="ModalDelete__deleteBtn"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ModalDelete.propTypes = {
  id: PropTypes.string,
};
