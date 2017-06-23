'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { Input } from 'antd';
var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;

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
          console.log('Errors in form!!!');
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
      var selected_schame = _.extend(schema, { defaultValue: value });
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
          _.extend(i, data);
        } else {
          if (reset) {
            _.extend(i, reset);
          }
        }
      });
      this.props.formData.changeData(init_schema);
    }
  }, {
    key: 'changeSchemas',
    value: function changeSchemas(data) {
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
        console.log(Date.parse(new Date(date._d)), datestring);
        var timeStr = Date.parse(new Date(date._d));
        this.onChange(timeStr, schema);
      }
    }
  }, {
    key: 'timeChange',
    value: function timeChange(v, time, schema) {
      console.log(v, time, schema);
    }
  }, {
    key: 'getFields',
    value: function getFields(schema, index) {
      var _this2 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;

      if (!schema['label']) {
        schema['label'] = '';
      }
      var data = {
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
      if (schema.element == 'Select') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(
          _antd.Select,
          { onChange: function onChange(v) {
              return _this2.SelectChange(v, schema);
            }, placeholder: '\u8BF7\u9009\u62E9', className: 'jw-web-select' },
          _.map(schema.options, function (item) {
            return _react2.default.createElement(
              Option,
              { value: item.label },
              item.label
            );
          })
        ));
      }
      if (schema.element == 'Date') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_antd.DatePicker, { onChange: function onChange(v, date) {
            return _this2.dateChange(v, date, schema);
          }, defaultValue: schema.defaultValue, format: dateFormat }));
      }
      if (schema.element == 'Time') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(
          'div',
          { className: 'timePicker' },
          _react2.default.createElement(_antd.TimePicker, {
            onChange: function onChange(v, time) {
              return _this2.timeChange(v, time, schema);
            },
            disabledHours: function disabledHours() {
              return [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            },
            hideDisabledOptions: true,
            format: 'HH'
          }),
          _react2.default.createElement(
            'span',
            null,
            ':'
          ),
          _react2.default.createElement(_antd.TimePicker, {
            onChange: function onChange(v, time) {
              return _this2.timeChange(v, time, schema);
            },
            format: 'mm'
          })
        ));
      }
      if (component == '') {
        return '';
      }
      return _react2.default.createElement(
        FormItem,
        { className: schema['className'] || '', style: schema['style'] || {}, help: schema["help"] || '', extra: schema['extra'] || '', hasFeedback: schema['hasFeedback'] || false, validateStatus: schema['validateStatus'] },
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
            '\xA0\u63D0\u4EA4'
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var items = [];
      _.each(self.props.formData.schema, function (item, index) {
        items.push(self.getFields(item, index));
      });
      return _react2.default.createElement(
        'div',
        { className: 'form-detail' },
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
  }]);

  return BasicDemo;
}(_react2.default.Component);

var WrappedRegistrationForm = (0, _rcForm.createForm)({})(BasicDemo);
exports.default = WrappedRegistrationForm;