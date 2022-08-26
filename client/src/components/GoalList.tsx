import React, { useState } from "react";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

// Image
import plusIcon from "../images/plus-solid.svg";

// Types
import GoalListProps from "../types/goal-list";

const GoalList: React.FC<GoalListProps> = ({
  goalList,
  setGoalList,
  showZeroGoalError,
  setShowZeroGoalError,
}) => {
  const [value, setValue] = useState<string>("");

  const handleAddGoal = () => {
    if (!value) return;
    setGoalList([...goalList, value]);
    setShowZeroGoalError(false);
    setValue("");
  };

  return (
    <div>
      <div className="add-goal-form center">
        <Form.Label>Enter your goal</Form.Label>
        <Form.Group
          className="d-flex add-goal-form-inner"
          controlId="formBasicGoalList"
        >
          <Form.Control
            type="text"
            placeholder="Add a Goal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="ms-2 add-icon" onClick={handleAddGoal}>
            <img src={plusIcon} alt="add-icon" />
          </Button>
        </Form.Group>
      </div>
      {goalList.map((goal, index) => (
        <Badge pill bg="light" key={index} className="m-1 px-3 py-2 text-dark">
          {goal}
        </Badge>
      ))}
      {showZeroGoalError && (
        <p className="text-danger">Please add atleast 1 goal.</p>
      )}
    </div>
  );
};

export default GoalList;
