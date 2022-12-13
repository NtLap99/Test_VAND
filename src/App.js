
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import covid from './api/covid';
import './App.css';
import EmptyTable from './component/EmptyTable';
import Loading from './component/Loading';
import ModalDetail from './component/ModalDetail';
import Pagination from './component/Pagination';
import { ROW_PER_PAGE } from './utils/constants';
import { notifyError } from './utils/notify';

function App() {

  const [apiData, setApiData] = useState([])
  const [data, setData] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [dataDetail, setDataDetail] = useState()

  const getData = async () => {
    setLoading(true)
    try {
      const res = await covid.getAll()
      if (res.data.Message === "Caching in progress") {
        throw Error('Too many request. Try again in few minutes')
      }
      setApiData(res.data.Countries ?? [])
      setLoading(false)
    } catch (error) {
      notifyError({ body: error.message })
      setLoading(false)
      console.log('error', error);
    }
  }

  const getDataDetail = async (params) => {
    try {
      const res = await covid.getDetail(params)
      setDataDetail(res.data)
    } catch (error) {
      notifyError({ body: error.message })
      console.log('error', error);
    }
  }

  const onCloseModal = () => {
    setDataDetail(undefined);
  };

  const handleOnClick = (CountryCode) => {
    getDataDetail(CountryCode)
  }

  const handleOnConfirmed = () => {
    setApiData(prev => [...prev].sort((a, b) => b.TotalConfirmed - a.TotalConfirmed))
    setCurrentpage(1)
  }

  const handleOnDeaths = () => {
    setApiData(prev => [...prev].sort((a, b) => b.TotalDeaths - a.TotalDeaths))
    setCurrentpage(1)
  }

  const handleOnRecovered = () => {
    setApiData(prev => [...prev].sort((a, b) => a.TotalRecovered - b.TotalRecovered))
    setCurrentpage(1)
  }

  const onChangePage = (value) => {
    setCurrentpage(value)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setData([...apiData.slice((currentPage - 1) * ROW_PER_PAGE, currentPage * ROW_PER_PAGE)])
  }, [apiData, currentPage])

  return (
    <Grid item xs={12} xl={12} lg={12} className='container m-3'>
      <Typography sx={{ fontSize: '32px', fontWeight: 'bold', padding: '16px', textAlign: 'center', color: 'red' }}>CORONAVIRUS STATISTICS</Typography>
      <TableContainer
        sx={{
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          borderRight: '1px solid rgba(224, 224, 224, 1)',
          borderLeft: '1px solid rgba(224, 224, 224, 1)',
          "& table": {
            borderColor: "1px solid var(--mscb-gray)",
          },
          "& thead, tbody tr": {
            display: "table",
            minHeight: '45px',
            width: "100%",
            tableLayout: "fixed",
          },
          "& tbody tr td": {
            fontSize: '14px',
          },
          "& thead, th": {
            background: '#f5f5f5',
            fontWeight: 'bold',
            fontSize: '15px',
          },
          "& tbody": {
            display: "block",
            overflowY: "overlay",
            "&::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              backgroundColor: "#F5F5F5",
            },
            "&::-webkit-scrollbar": {
              position: 'absolute',
              width: "6px",
              height: "6px",
              backgroundColor: "#F5F5F5",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.1)",
              backgroundColor: "#adadad",
              minHeight: "40px",
              paddingTop: "10px",
            },
          },
          overflowX: "hidden",
          "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.1)",
            backgroundColor: "#adadad",
            minHeight: "40px",
            paddingTop: "10px",
          }
        }}>
        <Table stickyHeader
          sx={{
            "& table": {
              width: "100%"
            },
          }}>
          <TableHead >
            <TableRow sx={{ background: '#f5f5f5' }}>
              <TableCell align="center" sx={{ width: '3%' }}>#</TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>Country</TableCell>
              <TableCell align="center" sx={{ width: '8%' }}>Code</TableCell>
              <TableCell align="center" sx={{ width: '9%' }}>Slug</TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>New Confirmed</TableCell>
              <TableCell
                align="center"
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => handleOnConfirmed()} >
                <BiSortAlt2 />Total Confirmed
              </TableCell>
              <TableCell align="center" sx={{ width: '8%' }}>New Deaths</TableCell>
              <TableCell
                align="center"
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => handleOnDeaths()} >
                <BiSortAlt2 />Total Deaths
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>New Recovered</TableCell>
              <TableCell
                align="center"
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => handleOnRecovered()} >
                <BiSortAlt2 />Total Recovered
              </TableCell>
              <TableCell align="center" sx={{ width: '8%' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading
                ? <Loading />
                : (
                  !data.length
                    ? <EmptyTable />
                    : data.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell align="center" sx={{ width: '3%' }}>{idx + 1 + (ROW_PER_PAGE * ((currentPage ? currentPage : 1) - 1))}</TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleOnClick(row.CountryCode)}
                          // eslint-disable-next-line react/jsx-no-duplicate-props
                          sx={{
                            cursor: 'pointer',
                            width: '10%',
                            "&:hover": {
                              textDecoration: "underline",
                            }
                          }}>
                          <Tooltip title={row.Country} placement="bottom">
                            <Box sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              cursor: 'pointer',
                            }}>{row.Country}</Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center" sx={{ width: '8%' }}>{row.CountryCode}</TableCell>
                        <TableCell align="center" sx={{ width: '9%' }}>
                          <Tooltip title={row.Country} placement="bottom">
                            <Box sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              cursor: 'pointer',
                            }}>{row.Slug}</Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center" sx={{ width: '10%' }} >{row.NewConfirmed}</TableCell>
                        <TableCell align="center" >{row.TotalConfirmed}</TableCell>
                        <TableCell align="center" sx={{ width: '8%' }}>{row.NewDeaths}</TableCell>
                        <TableCell align="center" >{row.TotalDeaths}</TableCell>
                        <TableCell align="center" sx={{ width: '10%' }}>{row.NewRecovered}</TableCell>
                        <TableCell align="center" >{row.TotalRecovered}</TableCell>
                        <TableCell align="center" sx={{ width: '8%' }}>{moment(row.Date).format("DD/MM/YYYY")}</TableCell>
                      </TableRow>
                    ))
                )
            }

          </TableBody>
        </Table>
      </TableContainer>
      {!!apiData.length && <Pagination
        apiData={apiData}
        onCurrentPage={(value) => onChangePage(value)}
        currentPage={currentPage}
      />}
      {dataDetail && <ModalDetail
        id={1}
        handleCloseModal={onCloseModal}
        dataDetail={dataDetail}
      />}
    </Grid>
  );
}

export default App;
