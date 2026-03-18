import { Card, Field } from "@chakra-ui/react";

export default function ForgottenPassword() {
  return (
    <div id="forgot-page">
      <Card.Root id="forgot-card">
        <Card.Header>
          <h2>Elfelejtett jelszó</h2>
        </Card.Header>
        <Card.Body>
          <h4>
            Adja meg azt az email-címét amivel regisztrált az oldalon és
            elfelejtette a jelszavát!
          </h4>
          <div id="forgot-styled-wrapper">
            <label htmlFor="email-input" className="forgot-label">
              <span>@</span>
            </label>
            <input
              type="text"
              name="email"
              id="forgot-styled-input"
              placeholder="Email"
              autoComplete="off"
            />
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
