import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import TodoListHook from "./todoListHook";
import TodoListAnt from "./todoListAnt";

const { TabPane } = Tabs;

function App() {
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Todo-List in Ant Design" key="1">
        <TodoListAnt />
      </TabPane>
      <TabPane tab="Todo-List in Ant Design X Hook Form" key="2">
        <TodoListHook />
      </TabPane>
    </Tabs>
  );
}

export default App;
