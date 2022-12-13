import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import imgEmpty from '../assets/img/Empty.svg';

function EmptyTable() {

  return (
    <TableRow>
      <TableCell colSpan={11} sx={{ height: '530px', textAlign: 'center' }}>
        <Typography component="img" alt="Empty" src={imgEmpty} />
        <Box sx={{ fontSize: '13px', fontStyle: 'italic' }}>Không có dữ liệu</Box>
      </TableCell>
    </TableRow>
  )
}

export default EmptyTable