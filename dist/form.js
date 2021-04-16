'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _radio = require('./editors/pc/radio');

var _radio2 = _interopRequireDefault(_radio);

var _input = require('./editors/pc/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('./editors/pc/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _matrix = require('./editors/pc/matrix');

var _matrix2 = _interopRequireDefault(_matrix);

var _switch = require('./editors/pc/switch');

var _switch2 = _interopRequireDefault(_switch);

var _select = require('./editors/pc/select');

var _select2 = _interopRequireDefault(_select);

var _datepicker = require('./editors/pc/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _rate = require('./editors/pc/rate');

var _rate2 = _interopRequireDefault(_rate);

var _custom = require('./editors/pc/custom');

var _custom2 = _interopRequireDefault(_custom);

var _upload = require('./editors/pc/upload');

var _upload2 = _interopRequireDefault(_upload);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./styles/loading.css');


var FormItem = _antd.Form.Item;
var Option = _select2.default.Option;

_moment2.default.locale('zh-cn');
var dateFormat = 'YYYY/MM/DD';
var now = "08:00";
var timeformat = 'h:mm a';

var BasicDemo = function (_React$Component) {
  _inherits(BasicDemo, _React$Component);

  function BasicDemo() {
    _classCallCheck(this, BasicDemo);

    return _possibleConstructorReturn(this, (BasicDemo.__proto__ || Object.getPrototypeOf(BasicDemo)).apply(this, arguments));
  }

  _createClass(BasicDemo, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var self = this;
      e.preventDefault();
      this.props.form.validateFields(function (errors, values) {
        if (!!errors) {
          console.log('Errors in form!!!', errors);
          return;
        }
        if (typeof self.props.submit == 'function') {
          self.props.submit(values);
        }
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(value, schema) {
      var self = this;
      var selected_schame = Object.assign(schema, { defaultValue: value });
      var init_schema = this.props.formData.schema;
      for (var i in init_schema) {
        if (init_schema == schema) {
          init_schema[i] = selected_schame;
        }
      }
      this.props.formData.changeData(init_schema);
    }
  }, {
    key: 'changeData',
    value: function changeData(name, data, reset) {
      var init_schema = this.props.formData.schema;
      _.each(init_schema, function (i) {
        if (i['name'] == name) {
          Object.assign(i, data);
        } else {
          if (reset) {
            Object.assign(i, reset);
          }
        }
      });
      this.props.formData.changeData(init_schema);
    }
  }, {
    key: 'changeSchemas',
    value: function changeSchemas(data) {
      var self = this;
      this.props.formData.changeData(data);
    }
  }, {
    key: 'SelectChange',
    value: function SelectChange(value, schema) {
      this.onChange(value, schema);
    }
  }, {
    key: 'dateChange',
    value: function dateChange(date, datestring, schema) {
      if (date) {
        // console.log(Date.parse(new Date(date._d)),datestring);
        var timeStr = Date.parse(new Date(date._d));
        this.onChange(timeStr, schema);
      }
    }
  }, {
    key: 'timeChange',
    value: function timeChange(v, time, schema) {
      // console.log(v,time,schema);
    }
  }, {
    key: 'getFields',
    value: function getFields(schema, index) {
      var getFieldDecorator = this.props.form.getFieldDecorator;

      if (!schema['label']) {
        schema['label'] = '';
      }
      var data = {
        formData: this.props.formData,
        schemas: this.props.formData.schema,
        schema: schema,
        onChange: this.onChange.bind(this),
        changeData: this.changeData.bind(this),
        changeSchemas: this.changeSchemas.bind(this),
        index: index
      };
      var component = '';
      if (schema.element == 'Input') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please input your' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_input2.default, data));
      }
      if (schema.element == 'Textarea') {
        data['type'] = "Textarea";
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please input your' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_input2.default, data));
      }
      if (schema.element == 'Radio') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please input your' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_radio2.default, data));
      }
      if (schema.element == 'Checkbox') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please input your' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_checkbox2.default, data));
      }
      if (schema.element == 'Matrix') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please input your' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_matrix2.default, data));
      }
      if (schema.element == 'Switch') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please input your' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_switch2.default, data));
      }
      if (schema.element == 'Select') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_select2.default, data));
      }
      if (schema.element == 'DatePicker') {
        var mode = ['month', 'month'];
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_datepicker2.default, _extends({ mode: mode }, data)));
      }

      if (schema.element == 'Upload') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_upload2.default, data));
      }

      if (schema.element == 'Rate') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_rate2.default, data));
      }
      if (schema.element == 'Custom') {
        component = _react2.default.createElement(_custom2.default, data);
      }
      if (component == '') {
        return '';
      }
      return _react2.default.createElement(
        FormItem,
        { key: schema['name'], className: 'form-item-' + schema['element'] + ' ' + (schema['className'] || ''), style: schema['style'] || {}, help: schema["help"] || '', extra: schema['extra'] || '', hasFeedback: schema['hasFeedback'] || false, validateStatus: schema['validateStatus'] },
        component
      );
    }
  }, {
    key: '_init_button',
    value: function _init_button() {
      var data = this.props.formData;
      if (data['buttons']) {
        return _react2.default.createElement(
          FormItem,
          { className: 'form-btns' },
          _react2.default.createElement(
            _antd.Button,
            { type: 'button', className: 'form-cancel' },
            '\u53D6\u6D88'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', htmlType: 'submit', onClick: this.handleSubmit.bind(this) },
            '\u63D0\u4EA4'
          )
        );
      }
    }
  }, {
    key: '_init_list',
    value: function _init_list(data) {
      var self = this;

      if (data.length == 0) {
        return false;
      }
      return _.map(data, function (item, index) {
        if (item.length) {
          var nowData = self._init_list(item);
          return _react2.default.createElement(
            'div',
            { className: 'form-block' },
            _react2.default.createElement(
              'div',
              { className: 'form-block-w' },
              nowData
            )
          );
        } else {
          return self.getFields(item, index);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var items = this._init_list(self.props.formData.schema);
      // console.log(items,'这个是什么啊');
      return _react2.default.createElement(
        'div',
        { className: "form-detail " + self.props.formData['className'] },
        _react2.default.createElement(
          _antd.Form,
          { ref: 'form' },
          items,
          this._init_button()
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {}
  }]);

  return BasicDemo;
}(_react2.default.Component);

var WrappedRegistrationForm = _antd.Form.create({})(BasicDemo);
exports.default = WrappedRegistrationForm;