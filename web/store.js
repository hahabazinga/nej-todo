const API_HOST = "http://localhost:8005";

NEJ.define([
    "util/ajax/xdr",
    "base/element"
], function (_xdr, _e, _p) {
    console.log("store init", _xdr);
    let store = [
        {
            _id: 1,
            label: "本地数据",
            completed: false
        },
        {
            _id: 2,
            label: "服务器未开启",
            completed: true
        }
    ];

    const updateComponents = [];

    /**
     * 提示框
     */
    const notification = _e._$getByClassName('app', 'notification')[0];
    const notificationTitle = _e._$getByClassName('app', 'notification-title')[0];
    const notificationContent = _e._$getByClassName('app', 'notification-text')[0];
    /**
     * 显示提示框
     * 
     * @param {提示框标题} title 
     * @param {提示卡内容} content 
     * @param {提示卡类型} type 'success' | 'error' | 'warn'
     * @param {显示时间} time 默认1.5s
     */
    const showNotification = (title, content, type, time=1500) => {
        _e._$delClassName(notification, 'success');
        _e._$delClassName(notification, 'error');
        _e._$delClassName(notification, 'warn');
        _e._$addClassName(notification, type);
        notificationTitle.innerText = title;
        notificationContent.innerText = content;
        _e._$setStyle(notification, 'right', '50px');
        setTimeout(() => _e._$setStyle(notification, 'right', '-310px'), time);
    }

    /**
     * 使用fetch发送post请求
     * 
     * @param {请求地址} api 
     * @param {请求的payload} data 
     * @param {接口的汉字描述，用于提示框} apiText 
     * @param {回调} cb 
     */
    const fetchPost = (api, data, apiText, cb) => {
        fetch(API_HOST + api, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.type === 'success'){
                showNotification(`${api}成功`, apiText, 'success');
                cb(res.data)
            }
            else{
                showNotification(`${api}出错`, res.message, 'error', 5000);
            }  
        })
        .catch(e => {
            showNotification(`${api}出错`, JSON.stringify(e), 'error', 5000);
            console.log("error", e)
        });
    }

    _p.__initStore = () => {
        // 获取数据
        _xdr._$request(API_HOST + "/getTodoList", {
            method: "GET",
            type: "json",
            onload: res => {
                if(res.type === 'success'){
                    showNotification('成功', '获取todo成功', 'success');
                    _p._$update(res.data)
                }
                else{
                    showNotification('出错', res.message, 'error', 5000);
                }  
            },
            onerror: e => {
                showNotification('请求todo列表出错', JSON.stringify(e), 'error', 5000);
                console.log("error", e)
            }
        });
    };

    _p.__initStore();

    _p._$getAllTodos = function () {
        return store;
    };

    _p._$update = data => {
        store = data;
        _p.__dispatchUpdate();
    };

    _p._$getActiveTodos = function () {
        return store.filter(todo => !todo.completed);
    };

    _p._$getCompletedTodos = function () {
        return store.filter(todo => todo.completed);
    };

    _p._$addTodo = function (label) {
        const data = {
            label, 
            completed: false
        }
        fetchPost('/addTodo', data, `添加${label}成功`, (d) => _p._$update(d));
    };

    _p._$toggleTodo = function (todo) {
        fetchPost('/toggleTodo', todo, `转换「${todo.label}」状态成功`, (d) => _p._$update(d));
    };

    _p._$cleanAllCompletedTodos = function () {
        if(store.every(item => item.completed === false)){
            _p.__dispatchUpdate();
            showNotification('warning', '暂无已完成的事项', 'warn', 5000);
            return;
        }
        fetchPost('/deleteAllCompleted', { completed: true }, '删除所有已完成事项成功', (d) => _p._$update(d));
    };

    _p._$deleteTodo = function (todo) {
        fetchPost('/deleteTodo', { _id: todo._id }, `删除${todo.label}事项成功`, (d) => _p._$update(d));
    };

    _p._$toggleAll = function () {
        const completed = store.every(item => item.completed);
        fetchPost('/toggleAllTodo', { completed: !completed }, `转换所有事项成功`, (d) => _p._$update(d));
    };

    // 注册
    _p._$register = function (component) {
        updateComponents.push(component);
    };

    _p.__dispatchUpdate = function () {
        updateComponents.forEach(component => {
            component._$update();
        });
    };

    return _p;
});
