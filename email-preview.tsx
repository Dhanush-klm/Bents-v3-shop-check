import WelcomeEmail from "./app/WelcomeEmail";
import DeleteEmail from "./app/DeleteEmail";

export default function App() {
  // Switch between WelcomeEmail and DeleteEmail by commenting/uncommenting below
  return (
    <WelcomeEmail username="Dhanush" userEmail="dhanush@example.com" />
    // <DeleteEmail username="Dhanush" userEmail="dhanush@example.com" />
  );
} 