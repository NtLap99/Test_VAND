import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import imgSuccess from '../assets/img/Success.svg';
import imgError from '../assets/img/Error.svg';

toast.configure()

export const notifySuccess = ({ title, body }) => {
  toast.success(
    () => (
      <Box className="position-relative">
        <Box className="h-6 w-6 position-absolute notify__icon">
          <Typography 
            component="img" 
            src={imgSuccess}
            alt="success"
          />
        </Box>
        <Box className="ml-4">
          {title && <p className="notify__title font-bold">{title}</p>}
          <Box className="notify__body rounded-b-lg">{body}</Box>
        </Box>
      </Box>
    ),
    {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
      icon: false,
      className: 'notify success',
      position: toast.POSITION.TOP_RIGHT,
    },
  )
}

export const notifyError = ({ title, body }) => {
  toast.error(
    () => (
      <Box className="position-relative">
        <Box className="h-6 w-6 position-absolute notify__icon">
          <Typography 
            component="img" 
            src={imgError}
            alt="error"
          />
        </Box>
        <Box className="ml-4">
          {title && <p className="notify__title font-bold">{title}</p>}
          <Box className="notify__body rounded-b-lg">{body}</Box>
        </Box>
      </Box>
    ),
    {
      hideProgressBar: true,
      autoClose: 3000000,
      theme: 'colored',
      icon: false,
      className: 'notify error',
      position: toast.POSITION.TOP_RIGHT,
    },
  )
}

