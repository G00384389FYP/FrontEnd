import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function JobSwitch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alignment, setAlignment] = React.useState(location.pathname.includes('job-posting') ? 'post' : 'view');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      if (newAlignment === 'view') {
        navigate('/viewJobs');
      } else if (newAlignment === 'post') {
        navigate('/job-posting');
      }
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton 
        value="view" 
        sx={{ 
          backgroundColor: alignment === 'view' ? 'lightblue' : 'inherit',
          '&.Mui-selected': {
            backgroundColor: 'lightblue',
          }
        }}
      >
        Find Jobs
      </ToggleButton>
      <ToggleButton 
        value="post" 
        sx={{ 
          backgroundColor: alignment === 'post' ? 'lightblue' : 'inherit',
          '&.Mui-selected': {
            backgroundColor: 'lightblue',
          }
        }}
      >
        Post a Job
      </ToggleButton>
    </ToggleButtonGroup>
  );
}