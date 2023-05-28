import './App.css';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ErrorHandlingProvider } from '@context/ErrorHandlingContext';
import { StartingScreen } from '@components';

function App() {
  return (
    <ErrorHandlingProvider>
      <StartingScreen />
      <Box sx={{ height: '100%' }}>
        <Outlet />
      </Box>
    </ErrorHandlingProvider>
  );
}

export default App;
