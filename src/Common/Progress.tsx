import { CircularProgress } from "@mui/material";

const progress = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "calc(100vh - 60px)"
};

const Progress = () => {
    return (
        <div style={progress}>
            <CircularProgress size="5rem" thickness={4} />
        </div>
    );
};

export default Progress;
