import React from "react";
import PropTypes from "prop-types";
import "./UsersTable.css";
import { TableCell, TableRow } from "@material-ui/core";
import ModalEnterData from "../Modals/ModalEnterData.jsx";
import ModalDelete from "../Modals/ModalDelete";
import { isDate, isArray } from "lodash";
import { format } from "date-fns";

export default function TableLine({ user, columns }) {
  return (
    <TableRow>
      {columns.map((column, i) => {
        if (isDate(user[column.id]))
          return (
            <TableCell key={i}>
              {format(user[column.id], "dd-MM-yyyy")}
            </TableCell>
          );
        else if (isArray(user[column.id]))
          return (
            <TableCell key={i}>
              {user[column.id].map((el, j) => (
                <p key={j}>{el}</p>
              ))}
            </TableCell>
          );
        else
          return (
            <TableCell key={i} className="TableLine__arrayCell">
              {user[column.id]}
            </TableCell>
          );
      })}
      <TableCell>
        <div className="countriesTable__actions">
          <ModalEnterData user={user} />
          <ModalDelete id={user.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
TableLine.propTypes = {
  user: PropTypes.object,
  columns: PropTypes.array,
};
