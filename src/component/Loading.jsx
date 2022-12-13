import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Oval } from "react-loader-spinner";

function Loading() {

  return (
    <TableRow>
      <TableCell colSpan={11} sx={{ height: '530px', textAlign: 'center' }}>
        <Oval
          height={80}
          color="#4fa94d"
          wrapperStyle={{
            display: 'block',
            textAlign: 'center'
          }}
          wrapperClass=""
          visible={true}
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </TableCell>
    </TableRow>
  )
}

export default Loading