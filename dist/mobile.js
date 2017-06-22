'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style3 = require('jw-components-mobile/lib/button/style');

var _button = require('jw-components-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _style4 = require('jw-components-mobile/lib/list/style');

var _list = require('jw-components-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

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
// const Option = Select.Option;


// import {Picker} from 'jw-components-mobile';
// alert(Picker)

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
    key: 'onChange',
    value: function onChange(value, schema) {
      var selected_schame = _.extend(schema, { defaultValue: value });
      var init_schema = this.state.formData.schema;
      for (var i in init_schema) {
        if (init_schema[i] == schema) {
          init_schema[i] = selected_schame;
        }
      }
      var init_formData = this.state.formData;
      init_formData.schema = init_schema;
      this.setState({
        formData: init_formData
      });
      var values = this.props.form.getFieldsValue();

      this.props.onChange(values, this.state.formData);
    }
  }, {
    key: 'submit',
    value: function submit() {
      var values = this.props.form.getFieldsValue();
      this.props.submit(values, this.state.formData);
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
        { className: schema['className'] || '', style: schema['style'] || {}, label: this.getLabel(index, schema.label), labelCol: schema["labelCol"] || {}, help: schema["help"] || '', extra: schema['extra'] || '', colon: schema['colon'], hasFeedback: schema['hasFeedback'] || false, validateStatus: schema['validateStatus'] },
        component
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
          _react2.default.createElement(
            _button2.default,
            { onClick: function onClick() {
                return _this2.submit();
              } },
            '\u63D0\u4EA4'
          )
        )
      );
    }
  }]);

  return BasicDemo;
}(_react2.default.Component);

var WrappedRegistrationForm = (0, _rcForm.createForm)()(BasicDemo);
exports.default = WrappedRegistrationForm;