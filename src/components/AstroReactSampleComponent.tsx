import { useState } from "react";

export default function AstroReactSampleComponent() {
  const [greeting, setGreeting] = useState("");

  return (
    <div>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button onClick={() => setGreeting("hello")}>New Greeting</button>
    </div>
  );
}
