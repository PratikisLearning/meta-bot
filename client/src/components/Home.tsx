import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Types
import { nameOptionType } from "../types/name-option-type";

import names from "../utils/names";

const Home = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<nameOptionType>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getSelectedName = localStorage.getItem("selectedName");
    if (getSelectedName) {
      navigate("/add-goal", { replace: true });
    }
  }, [navigate]);

  const handleChange = (nameOption: nameOptionType) => {
    setHasError(false);
    setSelectedName(nameOption);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!selectedName) {
      setHasError(true);
      return;
    }

    localStorage.setItem("selectedName", JSON.stringify(selectedName));
    navigate("/add-goal", { replace: true });
  };

  return (
    <Container className="home center">
      <Card className="home-card">
        <Card.Header>Meta Bot Client</Card.Header>
        <Card.Body>
          <Card.Title>Please select who are you!!</Card.Title>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Select
              className="capitalize"
              options={names}
              onChange={handleChange}
              placeholder="Select your name"
            />
            {hasError ? (
              <p className="text-danger error-text ms-2 mt-1">Select a name</p>
            ) : (
              <></>
            )}
            <Button type="submit" variant="primary" className="my-3">
              Let's Go
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
