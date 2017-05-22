import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUserLists} from "../reducers/usersList.reducer";

class ListsComponent extends Component {


    render() {
        return (
            <div>
                {this.props.lists ? this.props.lists.map((item, i) =>
               <div key={i}>
                   {item.id} - {item.name}
               </div>
            ):null}
            </div>
        );
    };
}


ListsComponent.propTypes = {
    lists: PropTypes.array
};

const mapStateToProps = (state) => ({
    lists: getUserLists(state)
});

export default connect(mapStateToProps)(ListsComponent);