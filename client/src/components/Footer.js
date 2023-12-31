import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import '../css/style.css';

export default function Footer() {
  return (
    <Box
      component="footer"
      maxHeight="5vh"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 2,
        background: "transparent",
        // flag: mess with this
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: "2rem",
      }}
    >
      <Container maxWidth="lg">
        {/* <Grid container spacing={6}
        sx={{ display: "flex",
        alignItems: "flex-end" }}
        >
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" disablegutters="true">
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are Card-X, dedicated to providing personal and heartfelt digital communications between since 2023.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" disablegutters="true">
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, California
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" disablegutters="true">
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid> */}
        <Box mt={3}>
          <Typography variant="body2" color="background.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              Card - X
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}