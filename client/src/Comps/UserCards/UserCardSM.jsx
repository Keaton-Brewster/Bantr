import { ListGroupItem as Item, Image, Row } from "react-bootstrap";
import "./index.sass";

export default function UserCardSM({ user }) {
  return (
    <Item>
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
