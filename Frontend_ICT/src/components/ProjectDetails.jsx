import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, Button, FormControlLabel, Checkbox, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';
import './ProjectDetails.css'; 
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  const { id } = useParams();

  console.log(`Project id is ${id}`)

  useEffect(() => {
    axios.get(`http://localhost:5000/arjun/projects/${id}`)
      .then(response => {
        console.log('Projects fetched:', response.data); 
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProject(response.data[0]);
          setSelectedProjectId(response.data[0]._id);
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // const handleSelectionChange = (event) => {
  //   const projectId = event.target.value;
  //   setSelectedProjectId(projectId);
  //   const project = projects.find(p => p._id === projectId);
  //   setSelectedProject(project);
  // };

  const handleAcceptanceChange = (event) => {
    setIsAccepted(event.target.checked);
  };

  const handleSelectAndProceed = () => {
    if (isAccepted) {
      const confirmed = window.confirm('Are you sure you want to select this project? Once selected, you cannot change it.');
      if (confirmed) {
        console.log('Proceeding with project:', selectedProject.name);
      }
    } else {
      alert('Please accept the terms to proceed.');
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth={false}
        className="dashboard-container"
        style={{ backgroundImage: `url(${selectedProject ? `/images/${selectedProject.backgroundImage}` : ''})` }}
      >
        {/* <Box my={4} className="project-selector-box">
          <FormControl fullWidth>
            <InputLabel id="project-select-label">Select Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProjectId}
              label="Select Project"
              // onChange={handleSelectionChange}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}
        {selectedProject && (
          <Grid container spacing={2} className="project-details">
            <Grid item xs={12} md={2}>
              <Card className="prerequisite-card">
                <CardContent>
                  <Typography variant="h6">Prerequisite Knowledge</Typography>
                  <ul>
                    {selectedProject.prerequisiteKnowledge.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card className="details-card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {selectedProject.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedProject.details}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Overview:
                  </Typography>
                  {selectedProject.overview && Array.isArray(selectedProject.overview) ? (
                    selectedProject.overview.map((paragraph, index) => (
                      <Typography key={index} variant="body1" paragraph>
                        {paragraph}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" paragraph>
                      No overview available.
                    </Typography>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAccepted}
                        onChange={handleAcceptanceChange}
                        name="acceptTerms"
                      />
                    }
                    label="I accept that once selected I cannot change the project in future"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: '8px' }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSelectAndProceed}
                      disabled={!isAccepted}
                    >
                      Select and Proceed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card className="job-opportunities-card">
                <CardContent>
                  <Typography variant="h6">Job Opportunities</Typography>
                  <ul>
                    {selectedProject.jobOpportunities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default ProjectDetails;