import React, { Component } from "react";
import { List, Avatar, Button, Checkbox, Spin } from "antd";
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
    };
  }

  onChange = (e) => {
    // 拿到了点的是谁 是check还是uncheck
    const { dataInfo, checked } = e.target;
    // 当前已经被选中的信息的数组
    const { selected } = this.state;
    // 对已经选择的信息来进行更改 addOrRemove
    const list = this.addOrRemove(dataInfo, checked, selected);
    // 最后更新这个state, list是已经更改过的选中的信息
    this.setState({ selected: list });
  };

  addOrRemove = (item, status, list) => {
    // some 检查某个元素是否存在
    // 传入一个方法来帮助some来判断是否存在 看着input entry.的id是否在item里也有
    const found = list.some((entry) => entry.satid === item.satid);
    // 如果不在 考虑什么时候进行添加
    if (status && !found) {
      list = [...list, item];
    }

    // 如果在 考虑什么时候移除
    if (!status && found) {
      list = list.filter((entry) => {
        return entry.satid !== item.satid;
      });
    }
    return list;
  };

  onShowSatMap = () => {
    this.props.onShowMap(this.state.selected);
  };

  render() {
    const satList = this.props.satInfo ? this.props.satInfo.above : [];
    const { isLoad } = this.props;
    const { selected } = this.state;

    return (
      <div className="sat-list-box">
        <Button
          className="sat-list-btn"
          size="large"
          // 如果没有选中任何 就disable button
          disabled={selected.length === 0}
          onClick={this.onShowSatMap}
        >
          Track on the map
        </Button>
        <hr />

        {isLoad ? (
          <div className="spin-box">
            <Spin tip="Loading..." size="large" />
          </div>
        ) : (
          <List
            className="sat-list"
            itemLayout="horizontal"
            size="small"
            dataSource={satList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Checkbox dataInfo={item} onChange={this.onChange} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={50} src={satellite} />}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default SatelliteList;
