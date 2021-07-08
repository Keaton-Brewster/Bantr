import { ListGroupItem as Item, Image, Row } from "react-bootstrap";
import "./userCard.css";

export default function UserCard({ member }) {
  return (
    <Item>
      <Row className="align-content-center">
        <Image
          src={member.picture}
          roundedCircle
          fluid
          className="profilePicture"
        />
        <h4>{member.name}</h4>
      </Row>
    </Item>
  );
}
