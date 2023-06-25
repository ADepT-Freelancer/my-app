import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="1... 2... 3... Start!" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("1... 2... 3... Start!");
  });

  test("after creation span must be displayed", () => {
    const component = create(
      <ProfileStatus status="довжина строки на два менше ніж 36" />
    );
    const root = component.root;
    expect(root.props.status.length).toBe(34);
  });

  test("after creation span must contains correct status", () => {
    const component = create(<ProfileStatus status="1... 2... 3... Start!" />);
    const root = component.root;
    expect(root.props.status).toBe("1... 2... 3... Start!");
  });

  test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="1... 2... 3... Start!" />);
    const root = component.root;
    let span = root.findAll("span");
    span.props.onDoubleClick();
    let input = root.children.find('input')
    expect(input.props.value).toBe("1... 2... 3... Start!");
  });
});
