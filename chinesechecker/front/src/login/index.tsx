import React from "react";
import Login from "./Login";
import { Box } from "@material-ui/core";
import  CreateOrJoin from "./CreateOrJoin";
import Register from "./Register";

const LoginIndex = () => {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  return (  
    <Box>
      {step === 1 && <Login setStep={setStep}/>}
      {step === 2 && <Register setStep={setStep}/>}
      {step === 3 && <CreateOrJoin />}
    </Box>
  );
};

export default LoginIndex;
