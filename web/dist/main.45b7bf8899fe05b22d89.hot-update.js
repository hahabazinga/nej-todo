webpackHotUpdate("main",{

/***/ "./web/index.js":
/*!**********************!*\
  !*** ./web/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("NEJ.define(['base/element', 'base/event', 'util/template/tpl', '../components/Item/index.js', 'text!../index.css', '../store.js'], function (_e, _event, _tpl, _item, _css, _store, _p) {\n  console.log('css');\n  var _pro = _p;\n\n  var _count = _e._$getByClassName('app', 'todos-count')[0];\n\n  var __toggle_all = _e._$getByClassName('app', 'toggle-all')[0];\n\n  var __input = _e._$getByClassName('app', 'new-todo')[0];\n\n  var __filter_btns = _e._$getByClassName('app', 'filter');\n\n  var __clear_btn = _e._$getByClassName('app', 'clear')[0];\n\n  _pro.__update = function (store) {\n    _pro.__updateCount(store.length);\n\n    _pro.__updateItems(store);\n  };\n\n  _pro.__updateCount = function (num) {\n    _count.innerText = num;\n  };\n\n  _pro.__updateItems = function (store) {\n    _e._$clearChildren(\"todo-list\");\n\n    var _list = _tpl._$getItemTemplate(store, _item._$$TodoItem, {\n      parent: 'todo-list',\n      ontoggle: function ontoggle(_data) {\n        // TODO\n        console.log('ontoggle', _data);\n      },\n      ondelete: function ondelete(_data) {\n        // TODO\n        console.log('ondelete', _data);\n      }\n    }); // _item._$$TodoItem._$recycle()\n\n  };\n\n  _pro.__addNewTodo = function (event) {\n    if (event.keyCode === 13) {\n      _store._$addTodo(__input.value);\n\n      __input.value = '';\n    }\n  };\n\n  _pro.__getAllTodos = function () {\n    _pro.__switch_filter('all');\n  };\n\n  _pro.__getActiveTodos = function () {\n    _pro.__switch_filter('active');\n  };\n\n  _pro.__getCompletedTodos = function () {\n    _pro.__switch_filter('completed');\n  };\n\n  _pro.__toggleAllTodos = function () {\n    console.log('__toggleAllTodos');\n\n    _store._$toggleAll();\n  };\n\n  _pro.__clearTodosCompleted = function () {\n    _store._$clearAllCompletedTodos();\n  };\n  /**\n   * 筛选按钮\n   * \n   * all------------所有\n   * active---------可用（待完成）\n   * completed------已完成\n   */\n\n\n  _pro.__switch_filter = function (state) {\n    _pro.__filter_state = state;\n\n    switch (state) {\n      case 'all':\n        _pro.__update(_store._$getAllTodos());\n\n        _e._$addClassName(__filter_btns[0], 'selected');\n\n        _e._$delClassName(__filter_btns[1], 'selected');\n\n        _e._$delClassName(__filter_btns[2], 'selected');\n\n        break;\n\n      case 'active':\n        _pro.__update(_store._$getActiveTodos());\n\n        _e._$delClassName(__filter_btns[0], 'selected');\n\n        _e._$addClassName(__filter_btns[1], 'selected');\n\n        _e._$delClassName(__filter_btns[2], 'selected');\n\n        break;\n\n      case 'completed':\n        _pro.__update(_store._$getCompletedTodos());\n\n        _e._$delClassName(__filter_btns[0], 'selected');\n\n        _e._$delClassName(__filter_btns[1], 'selected');\n\n        _e._$addClassName(__filter_btns[2], 'selected');\n\n        break;\n\n      default:\n        break;\n    }\n  };\n\n  _pro.__initXGUI = function () {\n    _e._$pushCSSText(_css); //_tpl._$addNodeTemplate(_html);\n\n  }();\n\n  _pro.__init = function () {\n    // 初始化组件\n    _pro.__update(_store._$getAllTodos());\n\n    _pro.__filter_state = 'all';\n\n    _event._$addEvent(__toggle_all, 'click', _pro.__toggleAllTodos);\n\n    _event._$addEvent(__input, 'keydown', _pro.__addNewTodo);\n\n    _event._$addEvent(__filter_btns[0], 'click', _pro.__getAllTodos);\n\n    _event._$addEvent(__filter_btns[1], 'click', _pro.__getActiveTodos);\n\n    _event._$addEvent(__filter_btns[2], 'click', _pro.__getCompletedTodos);\n\n    _event._$addEvent(__clear_btn, 'click', _pro.__clearTodosCompleted); // 注册store，开始观察者模式\n\n\n    _store._$register(_p);\n  };\n\n  _pro._$update = function () {\n    _pro.__switch_filter(_pro.__filter_state);\n  };\n\n  _pro.__init();\n});\n\nif (true) {\n  module.hot.accept();\n}\n\n//# sourceURL=webpack:///./web/index.js?");

/***/ })

})