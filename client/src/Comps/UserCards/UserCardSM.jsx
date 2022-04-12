import { ListGroupItem as Item, Image, Row } from "react-bootstrap";
import styled from "styled-components";

import "./index.sass";

function _UserCardSM({ user, className }) {
  return (
    <Item className={className}>
      <Row className="align-content-center">
        <Image
          src={user.imageUrl}
          roundedCircle
          fluid
          className="profilePicture"
        />
        <p>{`${user.givenName} ${user.familyName}`}</p>
      </Row>
    </Item>
  );
}

export default styled(_UserCardSM)`
  background-color: ${({ theme }) => theme.body};
`;
