NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'ui/item/list',
  'util/template/tpl',
  '../../store.js',
  'text!./index.css',
  'text!./index.html',
], function (_k, _e, _event, _list, _tpl, _store, _css, _html, _p) {

  _p._$$TodoItem = _k._$klass();
  var _pro = _p._$$TodoItem._$extend(_list._$$ListItem);

  // 初始化
  _pro.__initXGUI = (function () {
    _e._$pushCSSText(_css);
    //_tpl._$addNodeTemplate(_html);
  })();

  // 初始化节点，包括获取元素节点和事件绑定
  _pro.__initNode = function () {
    this.__super();
    this.__body.innerHTML = _html
    this.__checked = _e._$getByClassName(this.__body, 'todo-toggle')[0]
    this.__label = _e._$getByClassName(this.__body, 'todo-label')[0]
    const removeBtn = _e._$getByClassName(this.__body, 'todo-remove')[0]
 
    _event._$addEvent(removeBtn, 'click', _pro.__onRemove._$bind(this));
    _event._$addEvent(this.__checked, 'click', _pro.__onToggle._$bind(this));
  };

  // 初始化操作
  _pro.__init = function () {
    this.__super()
  }

  _pro.__doRefresh = function (_todo) {
    console.log('_doRefresh', _todo)
    this.__todo = _todo
    this.__label.innerHTML = _todo.label
    this.__checked.checked = _todo.completed
  }

  // 销毁操作
  _pro.__destroy = function () {
    this.__super()
    console.log('item销毁')
  }


  _pro.__onRemove = function (event) {
    console.log('__onRemove', this.__todo._id)

    const _node = _event._$getElement(event, 'd:action');
    if (!_node) return;
    // 操作
    const action = _e._$dataset(_node, 'action')

    _store._$deleteTodo(this.__todo._id)
  }

  _pro.__onToggle = function () {
    console.log('__onToggle', this.__todo._id)
    _store._$toggleTodo(this.__todo._id)
  }
  return _p;
});