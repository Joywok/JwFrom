'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = require('jw-components-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _button = require('jw-components-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('jw-components-mobile/lib/list/style');

require('jw-components-mobile/lib/button/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _radio = require('./editors/mobile/radio');

var _radio2 = _interopRequireDefault(_radio);

var _input = require('./editors/mobile/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('./editors/mobile/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _select = require('./editors/mobile/select');

var _select2 = _interopRequireDefault(_select);

var _Section = require('./editors/mobile/Section');

var _Section2 = _interopRequireDefault(_Section);

var _textarea = require('./editors/mobile/textarea');

var _textarea2 = _interopRequireDefault(_textarea);

var _datepicker = require('./editors/mobile/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _switch = require('./editors/mobile/switch');

var _switch2 = _interopRequireDefault(_switch);

var _rate = require('./editors/mobile/rate');

var _rate2 = _interopRequireDefault(_rate);

var _area = require('./editors/mobile/area');

var _area2 = _interopRequireDefault(_area);

var _refill = require('./editors/mobile/refill');

var _refill2 = _interopRequireDefault(_refill);

var _custom = require('./editors/mobile/custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./styles/loading.css');
// require('antd/lib/form/style/index.css');
require('./styles/mobile/form.css');

var FormItem = _form2.default.Item;

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
      var selected_schame = Object.assign(schema, { defaultValue: value });
      var init_schema = this.props.formData.schema;
      for (var i in init_schema) {
        if (init_schema == schema) {
          init_schema[i] = selected_schame;
        }
      }
      this.props.formData.changeData(init_schema, schema, value);
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
      this.props.formData.changeData(data);
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
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_input2.default, data));
      }
      if (schema.element == 'Radio') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_radio2.default, data));
      }
      if (schema.element == 'Checkbox') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_checkbox2.default, data));
      }
      if (schema.element == 'Select') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_select2.default, data));
      }
      if (schema.element == 'Area') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_select2.default, data));
      }
      if (schema.element == 'Refill') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_refill2.default, data));
      }
      if (schema.element == 'Section') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue'],
          trigger: 'onChange', validateTrigger: 'onChange'
        })(_react2.default.createElement(_Section2.default, data));
      }
      if (schema.element == 'Textarea') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_textarea2.default, data));
      }
      if (schema.element == 'DatePicker') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_datepicker2.default, data));
      }
      if (schema.element == 'Switch') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_switch2.default, data));
      }

      if (schema.element == 'Rate') {
        component = getFieldDecorator(schema["name"], {
          rules: schema["rules"] || [],
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
        { key: schema['name'], className: 'form-item-' + schema['element'] + ' ' + (schema['className'] || ''), style: schema['style'] || {}, help: schema["help"] || '', extra: schema['extra'] || '', colon: schema['colon'], hasFeedback: schema['hasFeedback'] || false, validateStatus: schema['validateStatus'] },
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
            _button2.default,
            { type: 'button', className: 'form-cancel' },
            '\u53D6\u6D88'
          ),
          _react2.default.createElement(
            _button2.default,
            { type: 'button', onClick: this.handleSubmit.bind(this) },
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
      return _react2.default.createElement(
        'div',
        { className: "form-detail " + self.props.formData['className'] },
        _react2.default.createElement(
          _form2.default,
          { ref: 'form' },
          _react2.default.createElement(
            _list2.default,
            { className: 'jw-list' },
            items
          ),
          this._init_button()
        )
      );
    }
  }]);

  return BasicDemo;
}(_react2.default.Component);

var WrappedRegistrationForm = _form2.default.create()(BasicDemo);
exports.default = WrappedRegistrationForm;