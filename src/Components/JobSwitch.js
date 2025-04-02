import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { CardActionArea } from '@mui/material/CardActionArea'; 
import { UserContext } from '../UserContext';

export default function JobSwitch() {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line
  const { userId } = React.useContext(UserContext);
  const [alignment, setAlignment] = React.useState(location.pathname.includes('job-posting') ? 'post' : 'view');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      if (newAlignment === 'view') {
        navigate('/jobs');
      } else if (newAlignment === 'post') {
        navigate('/job-posting');
      } else if (newAlignment === 'viewmyjobs') {
        navigate('/my-jobs'); 
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
        Browse Jobs
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