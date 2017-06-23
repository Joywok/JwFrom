'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style3 = require('jw-components-mobile/lib/list/style');

var _list = require('jw-components-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _style4 = require('jw-components-mobile/lib/button/style');

var _button = require('jw-components-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

var _radio = require('./editors/mobile/radio');

var _radio2 = _interopRequireDefault(_radio);

var _input = require('./editors/mobile/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('./editors/mobile/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _select = require('./editors/mobile/select');

var _select2 = _interopRequireDefault(_select);

var _textarea = require('./editors/mobile/textarea');

var _textarea2 = _interopRequireDefault(_textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    key: 'getLabel',
    value: function getLabel(index, txt) {
      if (txt) {
        return _react2.default.createElement('div', { className: 'label', dangerouslySetInnerHTML: { __html: txt } });
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'label' },
          _react2.default.createElement(
            'span',
            { className: 'sequence_number' },
            index + 1
          ),
          _react2.default.createElement(
            'span',
            { className: 'txt' },
            txt
          )
        );
      }
    }
  }, {
    key: 'getFields',
    value: function getFields(schema, index) {
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
          rules: [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_select2.default, data));
      }
      if (schema.element == 'Textarea') {
        component = getFieldDecorator(schema["name"], {
          rules: [{ required: true, message: 'Please select your gender!' }],
          initialValue: schema['defaultValue']
        })(_react2.default.createElement(_textarea2.default, data));
      }

      if (component == '') {
        return '';
      }
      return _react2.default.createElement(
        'div',
        { className: schema['className'] || '', style: schema['style'] || {}, help: schema["help"] || '', extra: schema['extra'] || '', colon: schema['colon'], hasFeedback: schema['hasFeedback'] || false, validateStatus: schema['validateStatus'] },
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var items = [];
      _.each(self.props.formData.schema, function (item, index) {
        items.push(self.getFields(item, index));
      });
      return _react2.default.createElement(
        'div',
        { className: 'form-detail' },
        _react2.default.createElement(
          'div',
          { onValuesChange: function onValuesChange() {
              return _this2.onValuesChange();
            } },
          _react2.default.createElement(
            _list2.default,
            { renderHeader: function renderHeader() {
                return '基本样式';
              }, className: 'jw-list' },
            items
          ),
          this._init_button()
        )
      );
    }
  }]);

  return BasicDemo;
}(_react2.default.Component);

var WrappedRegistrationForm = (0, _rcForm.createForm)()(BasicDemo);
exports.default = WrappedRegistrationForm;