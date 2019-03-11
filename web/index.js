
NEJ.define([
    'base/element',
    'base/event',
    'util/template/tpl',
    '../components/Item/index.js',
    'text!../index.css',
    '../store.js'
  ], function (_e, _event, _tpl, _item, _css,  _store, _p) {

    console.log('css', )
    const _pro = _p
    const _count = _e._$getByClassName('app','todo-count')[0]
    const __toggle_all = _e._$getByClassName('app', 'toggle-all')[0]
    const __input = _e._$getByClassName('app', 'new-todo')[0]
    const __filter_btns = _e._$getByClassName('app', 'filter')
    const __clear_btn = _e._$getByClassName('app', 'clear')[0]
  
    _pro.__update = function (store) {
      _pro.__updateCount(store.length)
      _pro.__updateItems(store)
    }
  
    _pro.__updateCount = function (num) {
      _count.innerText = num
    }
  
    _pro.__updateItems = function (store) {
      _e._$clearChildren("todo-list")
  
      const _list = _tpl._$getItemTemplate(
        store, _item._$$TodoItem, {
          parent: 'todo-list',
          ontoggle: function (_data) {
            // TODO
            console.log('ontoggle', _data)
          },
          ondelete: function (_data) {
            // TODO
            console.log('ondelete', _data)
          }
        }
      );
      // _item._$$TodoItem._$recycle()
    }
  
    _pro.__addNewTodo = function (event) {
      if (event.keyCode === 13) {
        _store._$addTodo(__input.value)
        __input.value = ''
      }
    }
  
    _pro.__getAllTodos = function () {
      _pro.__switch_filter('all')
    }
  
    _pro.__getActiveTodos = function () {
      _pro.__switch_filter('active')
    }
  
    _pro.__getCompletedTodos = function () {
      _pro.__switch_filter('completed')
    }
  
    _pro.__toggleAllTodos = function () {
      console.log('__toggleAllTodos')
      _store._$toggleAll()
    }
  
    _pro.__clearTodosCompleted = function () {
      _store._$clearAllCompletedTodos()
    }
  
    /**
     * 筛选按钮
     * 
     * all------------所有
     * active---------可用（待完成）
     * completed------已完成
     */
    _pro.__switch_filter = function (state) {
      _pro.__filter_state = state
      switch (state) {
        case 'all':
          _pro.__update(_store._$getAllTodos())
          _e._$addClassName(__filter_btns[0], 'selected');
          _e._$delClassName(__filter_btns[1], 'selected');
          _e._$delClassName(__filter_btns[2], 'selected');
          break;
        case 'active':
          _pro.__update(_store._$getActiveTodos())
          _e._$delClassName(__filter_btns[0], 'selected');
          _e._$addClassName(__filter_btns[1], 'selected');
          _e._$delClassName(__filter_btns[2], 'selected');
          break;
        case 'completed':
          _pro.__update(_store._$getCompletedTodos())
          _e._$delClassName(__filter_btns[0], 'selected');
          _e._$delClassName(__filter_btns[1], 'selected');
          _e._$addClassName(__filter_btns[2], 'selected');
          break;
        default:
          break;
      }
    }

    _pro.__initXGUI = (function () {
      _e._$pushCSSText(_css);
      //_tpl._$addNodeTemplate(_html);
    })();
  
    _pro.__init = function () {
      // 初始化组件
      
      _pro.__update(_store._$getAllTodos())
      _pro.__filter_state = 'all'
      _event._$addEvent(__toggle_all, 'click', _pro.__toggleAllTodos);
      _event._$addEvent(__input, 'keydown', _pro.__addNewTodo);
      _event._$addEvent(__filter_btns[0], 'click', _pro.__getAllTodos);
      _event._$addEvent(__filter_btns[1], 'click', _pro.__getActiveTodos);
      _event._$addEvent(__filter_btns[2], 'click', _pro.__getCompletedTodos);
      _event._$addEvent(__clear_btn, 'click', _pro.__clearTodosCompleted);
  
      // 注册store，开始观察者模式
      _store._$register(_p)
    }
  
    _pro._$update = function () {
      _pro.__switch_filter(_pro.__filter_state)
    }
  
    _pro.__init()
  });

if(module.hot) {
    module.hot.accept();
}

