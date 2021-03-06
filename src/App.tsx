import React, {useState} from 'react';
import {PropsTasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import './App.css'
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type filterValues = 'All' | 'Active' | 'Completed'
export type TaskStateType = {
    [key: string]: Array<PropsTasksType>
}
export type TypeTodolists = {
    id: string
    title: string
    filter: filterValues

}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TypeTodolists>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: true}],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Spread', isDone: false},
            {id: v1(), title: 'Book', isDone: false}
        ]

    });


    function changeFilter(value: filterValues, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function deleteTask(id: string, todolistId: string) {

        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks})

    }

    function deleteTodolist(todolistId: string) {

        let removeTodolist = todolists;
        todolists = removeTodolist.filter(t => t.id !== todolistId);
        setTodolists([...todolists])
        delete tasks[todolistId];
    }

    function addTask(value: string, todolistId: string) {
        let newTask = {id: v1(), title: value, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        return (
            setTasks({...tasks})
        )

    }

    function changeTitleTodolist(id:string,newTitle:string){
        let changeTitleTodolist = todolists.find(t => t.id === id)
        if (changeTitleTodolist) {
            changeTitleTodolist.title = newTitle
        }
        return setTodolists([...todolists])
    }



    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let status = todolistTasks.find(t => t.id === id)
        if (status) {
            status.isDone = isDone
        }
        return (setTasks({...tasks}))
    }
    function onChangeInputTasks(id:string,newTitle:string,todolistId:string) {
        let todolistChangeTasks = tasks[todolistId];
        let changeStatus = todolistChangeTasks.find(t => t.id === id)
        if (changeStatus) {
            changeStatus.title = newTitle
        }
        return (setTasks({...tasks}))
    }





    function addTodolist(title:string){
        let todolist:TypeTodolists={
            id: v1(),
            title: title,
            filter:'All'
        }
       setTodolists([todolist,...todolists]);
        setTasks({...tasks,[todolist.id]:[]})
    }

    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
            <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let forTasks = allTodolistTasks


                if (tl.filter === 'Active') {
                    forTasks = allTodolistTasks.filter(t => !t.isDone)
                }
                if (tl.filter === 'Completed') {
                    forTasks = allTodolistTasks.filter(t => t.isDone)
                }
                return <Grid item>
                    <Paper style={{margin:"20px" ,padding:'10px'}}>
                <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={forTasks}
                    changeFilter={changeFilter}
                    deleteTask={deleteTask}
                    addTask={addTask}
                    filter={tl.filter}
                    changeStatus={changeStatus}
                    onChangeInputTasks={onChangeInputTasks}
                    changeTitleTodolist={changeTitleTodolist}
                    deleteTodolist={deleteTodolist}

                />
                </Paper>
                </Grid>
            })
            }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
