import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { TaskRow } from './TaskRow';
import * as actions from '../../actions';

const TaskList = (props) => {
    onMarkDone = (task) => {
        console.log('markdone', task.description)
        props.markDone(task)
    }

    onDelete = (task) => {
        props.deleteTask(task)
    }

    onUnMarkDone = (task) => {
        console.log('unmarkdone', task.description)
        props.undoDone(task)
    }

    renderItem = ({ item }) => {
        return (
            <TaskRow
                done={item.completed}
                task={item}
                onMarkDone={onMarkDone}
                onDelete={onDelete}
                onUnMarkDone={onUnMarkDone}>
                {item.description}
            </TaskRow>
        );
    }

    return (
        <View>
            <FlatList
                data={props.taskArray}
                initialNumToRender={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state, props) => {
    const today = new Date();
    return {
        taskArray: state.tasks.taskArray.filter(task => {
            if (props.children === 'today') {
                return task.day === today.toLocaleDateString();
            } else {
                return task.day !== today.toLocaleDateString()
            }
        })
    }
}

export default connect(mapStateToProps, actions)(TaskList);