import { Alert, Button } from "../index";

export function Playground() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: 24,
        }}
      >
        <Alert variant="info" title="Heads up">
          Your session will expire in 5 minutes.
        </Alert>
        <Alert variant="success" dismissible>
          Changes saved.
        </Alert>
        <Alert variant="warning" title="Careful" dismissible>
          This action can't be undone.
        </Alert>
        <Alert variant="danger">Something went wrong. Please try again.</Alert>
      </div>

      <div style={{ display: "flex", gap: 12, padding: 24 }}>
        <Button>Primary</Button>
        <Button variant="secondary" size="sm">
          Secondary (sm)
        </Button>
        <Button variant="ghost" size="lg">
          Ghost (lg)
        </Button>
        <Button variant="danger" onClick={() => console.log("delete clicked")}>
          Danger (md)
        </Button>
      </div>
    </>
  );
}
