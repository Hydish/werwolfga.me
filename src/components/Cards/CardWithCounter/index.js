/*
*   Required Props:
*   key: string,
*   item: object
*   
*   Required simpleState:
*   cards
*/

import React, { Component, } from 'react';
import InputCounter from '../../InputCounter';
import Divider from 'material-ui/Divider';
import Styles from './style.css.js';
import SimpleState from 'react-simple-state';
import {
  Card,
  CardActions,
  CardText,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';

const simpleState = new SimpleState();

class CardWithCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidUpdate() {
    const cardState = simpleState.getState('cards');
    const index = cardState.list
      .map(a => a.key)
      .indexOf(this.props.item.key);
    if (index !== -1) {
      cardState.list[index] = {
        key: this.props.item.key,
        count: this.state.count,
      };
    } else {
      cardState.list.push({
        key: this.props.item.key,
        count: this.state.count,
      });
    }
    simpleState.evoke('cards', {
      list: cardState.list,
    });
  }

  up = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }
  down = () => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  }

  handleImageLoaded = () => {
    simpleState.evoke('loader', false);
  }

  render() {
    const item = this.props.item;
    return (
      <div style={Styles.card}>
        <Divider />
        <Card>
          <CardMedia overlay={<CardTitle title={item.name} />}>
            <img
              style={Styles.cardImage}
              src={item.picturefront}
              alt="cardimage"
              onLoad={this.handleImageLoaded}
            />
          </CardMedia>
          <CardTitle
            subtitle="Expand for Description"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            {item.description}
          </CardText>
          <CardActions>
            <InputCounter
              count={this.state.count}
              up={this.up}
              down={this.down}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default CardWithCounter;