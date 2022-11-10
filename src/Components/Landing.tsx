import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Colors } from "../Common/Colors";
import { useNavigate } from "react-router";
import { Paths } from "../Common/AppRoutes";

const Landing: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="m-3">
      <Box
        sx={{ minWidth: 275, maxWidth: 400 }}
        className="box"
        onClick={() => navigate(Paths.capital)}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 30 }}
              color={Colors.primaryColor}
              gutterBottom
            >
              Capital
            </Typography>
            <Typography
              sx={{ fontSize: 15 }}
              color={Colors.primaryColor}
              gutterBottom
            >
              See and update the current capital
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Landing;
