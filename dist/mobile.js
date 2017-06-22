'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

var _antdMobile = require('antd-mobile');

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

// const schema= [
//   {name: 'pwd', element:'Input', type: 'text', label: '姓名', placeholder:'请输入姓名', defaultValue:'12312312312'},
//   {name: 'hobby', element:'Radio',label: '爱好', options: [
//     { value: '篮球', checked:false,label: '篮球'},
//     { value: '足球', checked:false,label: '足球'}
//   ], defaultValue:'篮球',arrayType:'vertical'},
//   {name: 'instrest', element:'CheckBox', label: '兴趣',options: ['电影' ,'睡觉'], defaultValue:[],arrayType:'vertical'},
//   {name:'txt', element:'Input', type: 'textarea', label: '描述', placeholder:'请给出一段描述',defaultValue: '这是一段描述'},
//   {name:'select',element:'Select',label:'select',options:[
//     {value:'电影',label:'电影'}
//     ,{value:'睡觉',label:'睡觉'}
//   ],defaultValue:''},
//   {name:'date',element:'Date',label:'日期',placeholder:'请选择日期',defaultValue:''}
// ]
var data = {
  layout: 'horizontal',
  schema: []
};

// import { Input } from 'antd';
var FormItem = _antdMobile.Form.Item;
var Option = Select.Option;

_moment2.default.locale('zh-cn');
var dateFormat = 'YYYY/MM/DD';
var now = "08:00";
var timeformat = 'h:mm a';

var BasicDemo = function (_React$Component) {
  _inherits(BasicDemo, _React$Component);

  function BasicDemo(props) {
    _classCallCheck(this, BasicDemo);

    var _this = _possibleConstructorReturn(this, (BasicDemo.__proto__ || Object.getPrototypeOf(BasicDemo)).call(this, props));

    _this.state = {
      formData: props.formData
    };
    return _this;
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
        console.log(values, '生成后的代码');
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(value, schema) {
      var selected_schame = _.extend(schema, { defaultValue: value });
      var init_schema = this.state.schema;
      for (var i in init_schema) {
        if (init_schema == schema) {
          init_schema[i] = selected_schame;
        }
      }
      this.setState({
        schema: init_schema
      });
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
      var _this2 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;

      if (!schema['label']) {
        schema['label'] = '';
      }
      var data = {
        schema: schema,
        onChange: this.onChange.bind(this),
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
          Select,
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
      if (component == '') {
        return '';
      }
      return _react2.default.createElement(
        FormItem,
        { className: schema['className'] || '', style: schema['style'] || {}, label: this.getLabel(index, schema.label), labelCol: schema["labelCol"] || {}, help: schema["help"] || '', extra: schema['extra'] || '', colon: schema['colon'], hasFeedback: schema['hasFeedback'] || false, validateStatus: schema['validateStatus'] },
        component
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var items = [];
      _.each(self.state.formData["schema"], function (item, index) {
        items.push(self.getFields(item, index));
      });
      var getFieldDecorator = this.props.form.getFieldDecorator;

      return _react2.default.createElement(
        'div',
        { className: 'form-detail' },
        _react2.default.createElement(
          _antdMobile.Form,
          { onSubmit: this.handleSubmit.bind(this) },
          items,
          _react2.default.createElement(
            FormItem,
            { className: 'form-btns' },
            _react2.default.createElement(
              _antdMobile.Button,
              { type: 'button', className: 'form-cancel' },
              '\u53D6\u6D88'
            ),
            _react2.default.createElement(
              _antdMobile.Button,
              { type: 'primary', htmlType: 'submit' },
              '\xA0\u63D0\u4EA4'
            )
          )
        )
      );
    }
  }]);

  return BasicDemo;
}(_react2.default.Component);

var WrappedRegistrationForm = _antdMobile.Form.create()(BasicDemo);
exports.default = WrappedRegistrationForm;