import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Step,
  StepButton,
  Stepper,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddProductDetails from "../addProduct/addProductDetails/AddProductDetails";
import AddPapers from "./addPapers/AddPapers";
import { useValue } from "../../context/ContextProvider";
import { Send } from "@mui/icons-material";
import { createProduct } from "../../actions/product";

const AddProduct = ({ setPage }) => {
  const {
    state: { detailsProducts, product, currentUser },
    dispatch,
  } = useValue();
  const [activeStep, setActiveStep] = useState(0);
  const [submitStep, setSubmitStep] = useState(0);
  const [steps, setSteps] = useState([{ label: "Details", completed: false }]);

  const [showSubmit, setShowSubmit] = useState(false);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };
  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  useEffect(() => {
    if (
      detailsProducts.name.length > 3 &&
      detailsProducts.criteria.length > 3
    ) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [detailsProducts]);

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };
  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);
  const handleSubmit = () => {
    const product = {
      name: detailsProducts.name,
      category: detailsProducts.category,
      criteria: detailsProducts.criteria,
      resultAI: "",
    };
    console.log(product);
    createProduct(product, currentUser, dispatch, setPage);
    // setSubmitStep(1);
  };
  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "10vh",
        }}
      >
        <Typography variant="h6" component="span">
          {"Find alternative options "}
        </Typography>
      </Box>
      <Box sx={{ pb: 7 }}>
        {
          {
            0: <AddProductDetails />,
          }[activeStep]
        }
        <Stack sx={{ alignItems: "center" }}>
          <Button
            variant="contained"
            sx={{ m: 4 }}
            endIcon={<Send />}
            disabled={!showSubmit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
      {product && (
        <Box>
          <Typography component="span" style={{ whiteSpace: "pre-wrap" }}>
            {product?.resultAI}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AddProduct;
