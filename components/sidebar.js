'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
const create = require('create-react-class')
const Promise = require('bluebird')
const debounce = require('debounce')

const FilterList = require('./filterList.js')

let RoomListItem = create({
  displayName: "RoomListItem",

  getInitialState: function() {
    return {
      filterName: this.props.content.toUpperCase(),
      unread: Math.random() > 0.7,
      pos: this.props.listId
    }
  },

  setRef: function(ref) {
    if (ref == null) {
      return
    }
    this.setState({ref: ref})
    ref.addEventListener("click", () => {this.props.select(this.props.listId)})
  },

  render: function() {
    if (this.state.filterName.indexOf(this.props.filter) == -1) {
      return null
    }
    let className = "roomListItem"
    if (this.props.selected) {
      className += " active"
    }
    if (this.state.unread) {
      className += " unread"
    }
    return <div className={className} ref={this.setRef} style={{transform: `translate3d(0, ${this.props.listId}00%, 0)`}}>
      <svg id="avatar" data-jdenticon-value={this.props.content}></svg>
      <span id="name">{this.props.content}</span>
    </div>
  }
})

let Sidebar = create({
  displayName: "Sidebar",

  getInitialState: function() {
    return {
      filter: ""
    }
  },

  setFilter: function(filter) {
    this.setState({
      filter: filter.toUpperCase()
    })
    console.log("setting", filter)
  },

  render: function() {
    return <div className="sidebar">
      <FilterList items={this.props.rooms} element={RoomListItem}/>
    </div>
  }
})


module.exports = Sidebar
