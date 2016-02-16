import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LeftNav from 'material-ui/lib/left-nav';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';
import { WithContext as ReactTags } from 'react-tag-input';

const style = {
  marginRight: 20,
};

export default class Detail extends Component {
  constructor(props, context) {
    super(props, context)
    _.bindAll(this, "handleTagKeyDown", "suggestions")
  }

  handleDrag(tag, currPos, newPos) {
    // dummy
  }

  handleTagKeyDown(e) {
    let tagComponent = this.refs.tag.refs.child;
    if (e.keyCode !== 40 || tagComponent.state.query) {
      return;
    }
    // show all suggestions
    tagComponent.setState({
      selectionMode: true,
      selectedIndex: -1,
      suggestions: this.suggestions(),
      query: "&nbsp;"
    })
  }

  componentDidMount() {
    let input = this.refs.tag.refs.child.refs.input;
    input.addEventListener('keydown', this.handleTagKeyDown);
  }

  suggestions() {
    let selecteds = _(this.props.file.tags)
    let sug = _.chain(this.props.tags).
      map( (value, tag)=> {
        return tag;
      }).reject( (tag)=> {
        return selecteds.find({ text: tag });
      })
    return sug.value();
  }

  render() {
    const { file, updater, updateName, addTag, deleteTag } = this.props;
    return (
      <LeftNav width={300} openRight={true} open={true} >
        <Card>
          <CardText>
            <TextField ref="name" value={file.name} onChange={updateName}/>
            <ReactTags ref="tag" tags={file.tags}
                    suggestions={this.suggestions()}
                    handleDelete={deleteTag}
                    handleAddition={addTag}
                    handleDrag={this.handleDrag}
                    autofocus={true}
                    minQueryLength={1}
                    onFocus={this.handleFocus}
                    autocomplete={1} />
          </CardText>
          <CardActions>
            <FloatingActionButton style={style}>
              <i className={"fa fa-remove"} />
            </FloatingActionButton>
            <FloatingActionButton style={style} secondary={true} onClick={updater}>
              <i className={"fa fa-check"} />
            </FloatingActionButton>
          </CardActions>
        </Card>
      </LeftNav>
    );
  }
}
