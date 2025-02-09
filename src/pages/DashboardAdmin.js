// src/pages/DashboardAdmin.jsx
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const DashboardAdmin = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">120</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6">New Reports</Typography>
            <Typography variant="h3">15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6">Pending Approvals</Typography>
            <Typography variant="h3">8</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardAdmin;
