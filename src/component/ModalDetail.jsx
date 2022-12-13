import { Box, Dialog, Grid, Typography } from "@mui/material";
import React from "react";

const ModalDetail = (props) => {
  
  const { id, handleCloseModal, dataDetail } = props;

  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <Dialog
      key={id}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={!!dataDetail}
    >
      <Box sx={{ width: '600px', padding: '16px',background:'#f5f5f5' }}>
        <Typography sx={{textAlign:'center', fontWeight:'bold',fontSize:'18px', mb:'16px', color:'red'}}>INFORMATION DETAIL</Typography>
        <Grid container spacing={2}>
          <Grid item lg={6} xl={6} xs={6}>
            <Box sx={{display:'flex',mb:"16px"}}>
              <Typography sx={{fontWeight:'bold', }}>Name: </Typography>
              <Typography >{dataDetail.name}</Typography>
            </Box>
            <Box sx={{display:'flex',mb:"16px"}}>
              <Typography sx={{fontWeight:'bold', }}>Population: </Typography>
              <Typography >{dataDetail.population}</Typography>
            </Box>
            <Box sx={{display:'flex',mb:"16px"}}>
              <Typography sx={{fontWeight:'bold', }}>Capital: </Typography>
              <Typography >{dataDetail.capital}</Typography>
            </Box>
            <Box sx={{display:'flex',mb:"16px"}}>
              <Typography sx={{fontWeight:'bold', }}>Region: </Typography>
              <Typography >{dataDetail.region}</Typography>
            </Box>
            <Box sx={{display:'flex',mb:"16px"}}>
              <Typography sx={{fontWeight:'bold', }}>Subregion: </Typography>
              <Typography >{dataDetail.subregion}</Typography>
            </Box>
          </Grid>
          <Grid item lg={6} xl={6} xs={6}>
          <Typography component="img" alt="Empty" src={dataDetail.flags?.svg} sx={{width:'250px',height:'180px'}}/>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ModalDetail;
