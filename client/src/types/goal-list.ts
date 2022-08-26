export default interface GoalListProps {
  goalList: string[];
  setGoalList: React.Dispatch<React.SetStateAction<string[]>>;
  showZeroGoalError: boolean;
  setShowZeroGoalError: React.Dispatch<React.SetStateAction<boolean>>;
}
