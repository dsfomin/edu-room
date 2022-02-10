import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Empty } from 'antd';
import { Typography } from '@mui/material';

class StudentTable extends React.Component {

    render() {
      return (
        <TableContainer component={Paper} sx={{ width: 1, mt: 10 }}>
          {(this.props.students && this.props.students.length) 
            ? <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>iD</TableCell>
                    <TableCell align="left">Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.students.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            : <Empty description={
              <Typography component={'span'} variant={'body2'}>No Students found</Typography>
            }/>
          }
        </TableContainer>
      );
    }
}

export default StudentTable;