import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Element from '../Element';
import Req from '../../request';

const Button = styled.button`
background-color: #4CAF50; /* Green */
border: none;
color: white;
padding: 16px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
transition-duration: 0.4s;
cursor: pointer;
`;
class App extends Component {
  state = {
    ingredients: {},
    selectedIngredients: [],
    mixture: '',
    errors: false,
  }

  async componentDidMount() {
    const { data: { ingredients }, status } = await Req.getRessources();
    if (status !== 200) {
      console.log('Erreur happen');
      return;
    }
    this.setState({ ingredients });
  }

  handleSelected({ target: { name } }) {
    const { selectedIngredients } = this.state;
    this.setState({ selectedIngredients: [...selectedIngredients, name] });
  }

  async handleSubmit() {
    const { selectedIngredients } = this.state;
    try {
      const res = await Req.mixIngredients(selectedIngredients);
      const { data: { mixture } } = res;
      this.setState({ errors: false, mixture, selectedIngredients: [] });
    } catch (err) {
      this.setState({ errors: true, mixture: '', selectedIngredients: [] });
      // this.setState(ERRORS);
    }
    // if(res.status)
  }

  render() {
    const { ingredients, selectedIngredients, mixture, errors } = this.state;
    if (_.isEmpty(ingredients)) return 'fetching';
    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {_.map(ingredients, ({ quantity, img }, k) => <div style={{ borderStyle: 'solid', borderColor: 'blue', margin: '10px' }} key={k} ><Element name={k} quantity={quantity} img={img}/><button onClick={(e) => this.handleSelected(e)} name={k}>Add Me</button></div>)}
        </div>
        <div style={{ borderStyle: 'solid', borderColor: 'red', margin: '10px' }}>
          {!_.isEmpty(selectedIngredients) && _.map(selectedIngredients, (v, k) => <div key={k}>{v}</div>)}
        </div>
        {selectedIngredients.length === 3 && <Button onClick={() => this.handleSubmit()}>Mix</Button>}
        {errors && <div> Failed to create !</div>}
        {!_.isEmpty(mixture) && <div>{mixture}</div>}
      </div>
    );
  }
}

export default App;
