import {Card, Field} from "@chakra-ui/react"

export default function ForgottenPassword(){
    return(
        <div id="forgot-page">
            <Card.Root>
                <Card.Header>
                    <h2>Elfelejtett jelszó</h2>
                </Card.Header>
                <Card.Body>
                    <h4>Adja meg azt az email-címét amivel regisztrált az oldalon és elfelejtette a jelszavát!</h4>
                    <div>
                        <label htmlFor="email-input" className="register-label">
                  <span>@</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email-input"
                  placeholder="Email"
                    autoComplete="off"
                />
                    </div>
                </Card.Body>
            </Card.Root>
        </div>
    )
}