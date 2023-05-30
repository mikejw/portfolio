
import React, { Component } from 'react';
import { Wrapper } from './styles';

class MDContent extends Component {
  constructor(props) {
    super(props);
    this.mdRef = React.createRef();
    this.state = {
      password: '',
      shown: false
    }
  }

  handleOnChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.password);
    if (this.state.password === 'flashdance') {
      this.setState({ shown: true });
    }
  }

  renderForm = () => {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) } action="" method="">
        <p>
          <label>Password</label>
          <input
            placeholder="Enter a password..."
            onChange={ this.handleOnChange.bind(this) }
            type="text"
            value={this.state.password} />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    );
  }

  toggleHide(parent) {
    const hidden = parent.querySelectorAll('ul')[0].style.display === 'none';
    const display = hidden? 'block': 'none';
    parent.querySelectorAll('ul').forEach(ul => {
      ul.style.display = display;
    });
  }

  componentDidUpdate() {
    if (this.mdRef.current && this.state.shown) {
      this.mdRef.current.querySelectorAll('h4').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener("click", this.toggleHide.bind(null, item.parentElement));
        this.toggleHide(item.parentElement);
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <div ref={ this.mdRef } id="markdown">
          { !this.state.shown &&
            this.renderForm()
          }
          { this.state.shown &&
            <>
              <h1>{ this.props.title }</h1>
              <div className="content" dangerouslySetInnerHTML={{ __html: this.props.html }} />
            </>
          }
        </div>
      </Wrapper>
    );
  }
}

export default MDContent;
