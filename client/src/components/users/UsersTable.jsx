import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import "./UsersTable.css";
import { orderBy as lodashOrderBy } from "lodash";
import TableLine from "./TableLine";
import ModalEnterData from "../Modals/ModalEnterData";

export default function UsersTable({ columns, users }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  //change the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //set how much rows to display in the table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSortRequest = (cellId) => {
    //check the order type of the clicked column
    const isAsc = cellId === orderBy && "asc" === order;
    //toggle to desc if it is asc
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  //handle users data after sorting and paging
  const DataAfterSortingAndPaging = (rows) => {
    return rowsPerPage > 0
      ? lodashOrderBy(rows, orderBy, order).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : rows;
  };

  return (
    <div>
      <ModalEnterData user={null} />

      <TableContainer component={Paper}>
        <Table className="usersTable" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <div className="usersTables__headers">
                    {column.label}
                    {column.disableSorting ? null : (
                      <TableSortLabel
                        active={orderBy === column.id}
                        onClick={() => handleSortRequest(column.id)}
                        direction={column.id === orderBy ? order : "asc"}
                      ></TableSortLabel>
                    )}
                  </div>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DataAfterSortingAndPaging(users).map((user, index) => (
              <TableLine
                key={index}
                user={user}
                index={index}
                columns={columns}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={users?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

UsersTable.propTypes = {
  columns: PropTypes.array,
  users: PropTypes.array,
};
