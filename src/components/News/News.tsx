import React from "react";
import s from "./News.module.css";
import { Button } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import { Row, Col } from "antd/es/grid";
import { NavLink } from "react-router-dom";

type PropsType = {};

const News: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div className={s.wrapper}>News</div>

      <Row>
        <Col span={18}>
          <ButtonGroup>
            <Button>
              <NavLink to="/profile">Profile</NavLink>
            </Button>
            <Button>
              <NavLink to="/music">Music</NavLink>
            </Button>
            <Button>
              <NavLink to="/dialogs">Messages</NavLink>
            </Button>
            <Button>
              <NavLink to="/users">Friends</NavLink>
            </Button>
            <Button>
              <NavLink to="/settings">Settings</NavLink>
            </Button>
          </ButtonGroup>
        </Col>

        <Col span={6}>
          <SkeletonAvatar style={{ backgroundColor: "#7e74f1" }} />
        </Col>
      </Row>
    </div>
  );
};

export default News;
