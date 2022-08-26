import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";
import GoalList from "./GoalList";
// React Bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
// Types
import { nameOptionType } from "../types/name-option-type";

const AddGoal = () => {
  const [name, setName] = useState<nameOptionType>(null);
  const [toastDetails, setToastDetails] = useState({
    visible: false,
    type: "info",
    msg: "",
  });
  const [currDate, setCurrDate] = useState(new Date());
  const [nextWeek, setNextWeek] = useState(
    new Date(new Date().setDate(new Date().getDate() + 6))
  );
  const [goalList, setGoalList] = useState<string[]>([]);
  const [showZeroGoalError, setShowZeroGoalError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("selectedName");
    if (!savedName) {
      navigate("/", { replace: true });
      return;
    }

    setName(JSON.parse(savedName));
  }, [navigate]);

  useEffect(() => {
    if (!currDate) return;
    setNextWeek(new Date(new Date().setDate(currDate.getDate() + 6)));
  }, [currDate]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!goalList.length) {
      setShowZeroGoalError(true);
      return;
    }

    setShowSpinner(true);

    try {
      const res = await axios.post("/api/send-message", {
        name,
        startDate: currDate,
        endDate: nextWeek,
        goalList,
      });

      if (res.status === 201) {
        const msg = res.data.msg;
        const type = res.data.type;
        setToastDetails({ ...toastDetails, visible: true, msg, type });
      }
    } catch (err: any) {
      const msg = err.response.data.msg || "Something went wrong";
      const type = err.response.data.type || "danger";
      setToastDetails({ ...toastDetails, visible: true, msg, type });
    } finally {
      setShowSpinner(false);
    }
  };

  const handleToastClose = () => {
    setToastDetails({ visible: false, type: "info", msg: "" });
  };

  return (
    <Container className="add-goal center">
      <Card className="add-goal-card">
        {name && (
          <Form className="p-5" onSubmit={sendMessage}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name.label}
                type="text"
                placeholder="Enter Name"
                disabled
                className="capitalize"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDatePicker">
              <Form.Label>Select Date</Form.Label>
              <div>
                <DatePicker
                  value={currDate}
                  className="form-control date-picker"
                  onChange={setCurrDate}
                  required
                />
              </div>
              {currDate && (
                <Form.Text className="text-muted">
                  <p className="mt-2">Goal will be set from:</p>
                  <span className="text-primary">
                    {currDate.toLocaleDateString()}
                  </span>{" "}
                  to{" "}
                  <span className="text-primary">
                    {nextWeek.toLocaleDateString()}
                  </span>
                </Form.Text>
              )}
              {!currDate && <p className="text-danger">Please select a date</p>}
            </Form.Group>
            <GoalList
              goalList={goalList}
              setGoalList={setGoalList}
              showZeroGoalError={showZeroGoalError}
              setShowZeroGoalError={setShowZeroGoalError}
            />
            <Button variant="primary" type="submit" className="mt-3 center">
              Submit
              {showSpinner && (
                <div
                  className="spinner-border spinner-border-sm text-light ms-2"
                  role="status"
                ></div>
              )}
            </Button>
          </Form>
        )}
      </Card>
      {toastDetails.visible && (
        <ToastContainer position="bottom-end" className="m-4">
          <Toast
            onClose={handleToastClose}
            show={true}
            delay={5000}
            bg={toastDetails.type}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toastDetails.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
};

export default AddGoal;
