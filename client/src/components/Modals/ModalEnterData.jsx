import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./ModalEnterData.css";
import { useDispatch } from "react-redux";
import { editUser, addUser } from "../../actions/user_actions";
import { format, parseISO } from "date-fns";

//using one modal for creating and editing user informations
export default function ModalEnterData({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //initial object of the data in the form accroding to user value,
  // if value is null that means we are creating a new user else we
  //editing the user existing data
  let initialData;
  if (user) initialData = user;
  else
    initialData = {
      name: "",
      gender: "Male",
      dateOfBirth: new Date(),
      registeredAt: new Date(),
      surveys: [""],
      email: "",
    };
  const [data, setData] = useState(initialData);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //add a new survey to user array of surveys
  const addSurvey = (surveys, index, newWord) => {
    let newSurveys = [];
    // push the new value if a survey into the array of surveys
    for (let i in surveys) {
      if (i === index.toString()) {
        newSurveys.push(newWord);
      } else newSurveys.push(data.surveys[i]);
    }
    return newSurveys;
  };
  //adding a new empty survey
  const addNewSurvey = () => {
    setData({ ...data, surveys: [...data.surveys, " "] });
  };

  function handleSubmit() {
    if (data.name.lenght > 3) {
      if (user) dispatch(editUser(data));
      else dispatch(addUser(data));
      handleClose();
    } else alert("Please enter a user name with minimum 4 characters ");
  }

  return (
    <div className="ModalEnterData">
      {user ? (
        <EditIcon type="button" onClick={handleClickOpen} className="EditIcon">
          react-transition-group
        </EditIcon>
      ) : (
        <Button
          onClick={handleClickOpen}
          variant="contained"
          className="addBtn"
        >
          add user
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Enter user informations
        </DialogTitle>
        <DialogContent>
          <form autoComplete="off" className="ModalEnterData__form">
            <TextField
              label="name"
              name="name"
              required={true}
              variant="outlined"
              className="ModalEnterData__input"
              value={data.name}
              onChange={(event) =>
                setData({
                  ...data,
                  [event.target.name]: event.target.value,
                })
              }
            />
            <TextField
              name="gender"
              variant="outlined"
              label="gender"
              className="ModalEnterData__input"
              select
              value={data.gender}
              onChange={(event) =>
                setData({
                  ...data,
                  [event.target.name]: event.target.value,
                })
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <TextField
              name="dateOfBirth"
              label="date of birth"
              variant="outlined"
              className="ModalEnterData__input"
              type="date"
              value={format(data.dateOfBirth, "yyyy-MM-dd")}
              onChange={(event) =>
                setData({
                  ...data,
                  [event.target.name]: parseISO(event.target.value),
                })
              }
            />
            <TextField
              name="registeredAt"
              label="registered at"
              variant="outlined"
              className="ModalEnterData__input"
              type="date"
              value={format(data.registeredAt, "yyyy-MM-dd")}
              onChange={(event) =>
                setData({
                  ...data,
                  [event.target.name]: parseISO(event.target.value),
                })
              }
            />
            <Box>
              {data.surveys?.map((survey, i) => (
                <div key={i} className="ModalEnterData__survey">
                  <TextField
                    label="survey"
                    name="surveys"
                    variant="outlined"
                    className="ModalEnterData__input"
                    value={survey}
                    onChange={(event) =>
                      setData({
                        ...data,
                        surveys: addSurvey(data.surveys, i, event.target.value),
                      })
                    }
                  />
                </div>
              ))}
              <AddCircleIcon onClick={addNewSurvey} className="EditIcon" />
            </Box>
            <TextField
              label="email"
              name="email"
              variant="outlined"
              className="ModalEnterData__input"
              value={data.email}
              onChange={(event) =>
                setData({
                  ...data,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            className="ModalEnterData__Btn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className="ModalEnterData__Btn"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalEnterData.propTypes = {
  user: PropTypes.object,
};
