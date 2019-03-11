const API_HOST = 'http://localhost:8005';

NEJ.define([], function (_p) {
    console.log('store init')
    let store = [{
        _id: 1,
        label: 'test',
        completed: false
    }, {
        _id: 2,
        label: 'test2',
        completed: true
    }]

    const updateComponents = []

    _p.__initStore = () => {
        // 获取数据
        fetch(API_HOST+'/getTodoList')
        .then(res => res.json())
        .then(data => store = data)
        .catch(e => console.log('请求失败'));
        fetch(API_HOST+'/addTodo', {
            method: 'put',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({label: '洗脸', completed: false})
        })
    }

    _p.__initStore();

    _p._$getAllTodos = function () {
        return store
    }

    _p._$update = (data) => {
        store = data;
        _p.__dispatchUpdate();
    }

    _p._$getActiveTodos = function () {
        return store.filter(todo => !todo.completed)
    }

    _p._$getCompletedTodos = function () {
        return store.filter(todo => todo.completed)
    }

    _p._$addTodo = function (label) {
        store = [...store, { _id: store[store.length - 1]._id + 1, label, completed: false }]
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
    }

    _p._$toggleTodo = function (id) {
        store = store.map(todo => id === todo._id ? {
            ...todo,
            completed: !todo.completed
        } : todo
        )
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
    }

    _p._$clearAllCompletedTodos = function () {
        store = store.filter(todo => !todo.completed)
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
    }

    _p._$deleteTodo = function (id) {
        store = store.filter(todo => todo._id != id)
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
    }

    // 如果有一个完成，则全部完成，否则如果全部完成，则转为未完成，如果全部未完成，则转为完成
    _p._$toggleAll = function () {
        const hasCompleted = store.some(todo => todo.completed)
        const allCompleted = store.every(todo => todo.completed)
        if (allCompleted) {
            store = store.map(todo => ({ ...todo, completed: false }))
        } else {
            store = store.map(todo => ({ ...todo, completed: true }))
        }
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
    }

    // 观察者模式
    _p._$register = function (component) {
        updateComponents.push(component)
    }

    _p.__dispatchUpdate = function () {
        updateComponents.forEach(component => {
            component._$update()
        });
    }

    return _p
});