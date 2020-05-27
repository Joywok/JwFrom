'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textareaItem = require('jw-components-mobile/lib/textarea-item');

var _textareaItem2 = _interopRequireDefault(_textareaItem);

var _radio = require('jw-components-mobile/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('jw-components-mobile/lib/textarea-item/style');

require('jw-components-mobile/lib/radio/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioItem = _radio2.default.RadioItem;

var Radios = function (_Component) {
  _inherits(Radios, _Component);

  function Radios(props) {
    _classCallCheck(this, Radios);

    var _this = _possibleConstructorReturn(this, (Radios.__proto__ || Object.getPrototypeOf(Radios)).call(this, props));

    _this.state = {
      schema: _this.props.schema
    };
    return _this;
  }

  _createClass(Radios, [{
    key: 'getLabel',
    value: function getLabel(txt) {
      if (txt) {
        return _react2.default.createElement('div', { className: 'label ant-form-item-label', dangerouslySetInnerHTML: { __html: txt } });
      } else {
        return '';
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value, schema) {
      this.props.onChange(value, schema);
      var propsSchema = this.props.schema;
      if (propsSchema['events'] && propsSchema['events']['onChange']) {
        propsSchema['events']['onChange'].call(this, arguments);
      }
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      var _focusElem = null; //输入框焦点
      if ($(e.target).is(":focus")) {} else {
        if (/(iPhone|iOS)/i.test(navigator.userAgent)) {
          $(e.target).focus();
          _focusElem = e.target || e.srcElement;
          _focusElem.scrollIntoView();
          _focusElem.scrollIntoViewIfNeeded(true);
        }
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus(v) {
      var _focusElem = null; //输入框焦点
      if (/(iPhone|iOS)/i.test(navigator.userAgent)) {
        _focusElem = e.target || e.srcElement;
        _focusElem.scrollIntoView();
        _focusElem.scrollIntoViewIfNeeded(true);
      }
      var self = this;
      for (var i in self.state.schema.options) {
        if (self.state.schema.options[i].hasInput) {
          self.onChange(self.state.schema.options[i].value, self.state.schema);
        }
      }
    }
  }, {
    key: 'changeData',
    value: function changeData(data) {
      this.props.onChange(value, schema);
    }
  }, {
    key: 'selectData',
    value: function selectData(selected_schame, data) {
      var self = this;
      var nowSchema = [];
      data.map(function (i, index) {
        if (i.length) {
          nowSchema.push(self.selectData(selected_schame, i));
        } else {
          if (i['name'] == selected_schame['name']) {
            nowSchema.push(selected_schame);
          } else {
            nowSchema.push(i);
          }
        }
      });
      return nowSchema;
    }
  }, {
    key: 'inputChange',
    value: function inputChange(item, value) {

      console.log(item, value);
      var self = this;
      for (var i in self.props.schema.options) {
        if (item.value == self.props.schema.options[i].value) {
          self.props.schema.options[i].inputValue = value;
        }
      }
      self.setState({
        schema: self.props.schema
      });
    }
  }, {
    key: 'resetOptions',
    value: function resetOptions(data) {
      var self = this;
      var schemas = self["props"]['schemas'];
      var schema = self.props.schema;
      schema['options'] = data;
      var nowSchema = this.selectData(schema, schemas);
      var changeSchemas = self.props.changeSchemas;
      changeSchemas(schemas);
    }
  }, {
    key: '_init_layout',
    value: function _init_layout() {
      var schema = this.state.schema;
      if (schema['layout'] == 'horizontal') {
        return 'layout-horizontal';
      } else if (schema['layout'] == 'vertical') {
        return 'layout-vertical';
      } else {
        return 'layout-column layout-column-' + schema['column'];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var schema = this.props.schema;
      var self = this;
      var target = void 0;
      if (schema["remote"] && (!schema['options'] || schema['options'].length == 0)) {
        target = schema["remote"]["loading"] || _react2.default.createElement(
          'div',
          { className: 'loading-bounce ' },
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null)
        );
        if (schema['remote']['fetch'] && typeof schema['remote']['fetch'] == 'function') {
          schema['remote']['fetch'](this.resetOptions.bind(this));
        } else {
          axios({
            method: schema["remote"]["method"],
            url: schema["remote"]["url"],
            data: schema["remote"]["data"]
          }).then(function (response) {
            console.log(response);
            self.resetOptions(response);
          }).catch(function (error) {
            message.error(error.toString(), 2);
          });
        }
      } else {
        target = _react2.default.createElement(
          'div',
          _extends({ className: 'radio-list' }, schema['attr']),
          _.map(schema.options, function (item) {
            if (item.hasInput) {
              var inputClassName = "radio-textarea " + item.className;
              return _react2.default.createElement(
                'div',
                { className: 'radio-list-i-1' },
                _react2.default.createElement(
                  RadioItem,
                  { name: item.name || item.value, key: item.value, className: 'radio-list-i', checked: schema.defaultValue == item.value ? true : false, disabled: item["disabled"] || false, onChange: function onChange() {
                      return self.onChange(item.value, schema);
                    } },
                  item.label
                ),
                _react2.default.createElement(_textareaItem2.default, { className: inputClassName, autoHeight: true, onChange: self.inputChange.bind(self, item), placeholder: '\u5982\u9009\u62E9\u8BE5\u9879\uFF0C\u8BF7\u586B\u5199', value: item.inputValue })
              );
            } else {
              return _react2.default.createElement(
                'div',
                { className: 'radio-list-i-1' },
                _react2.default.createElement(
                  RadioItem,
                  { name: item.name || item.value, key: item.value, className: 'radio-list-i', checked: schema.defaultValue == item.value ? true : false, disabled: item["disabled"] || false, onChange: function onChange() {
                      return self.onChange(item.value, schema);
                    } },
                  item.label
                )
              );
            }
          })
        );
      }

      if (schema["other"] && schema["other"]['template']) {
        var Template = schema["other"]['template'];
        target = _react2.default.createElement(
          'div',
          { className: 'Form-item-c' },
          _react2.default.createElement(Template, { children: target, target: self, changeData: self.props.changeData, changeSchemas: self.props.changeSchemas })
        );
      } else {
        target = _react2.default.createElement(
          'div',
          { className: 'Form-item-c' },
          target
        );
      }

      return _react2.default.createElement(
        'div',
        { className: "Form-item-w " + this._init_layout(), ref: 'container' },
        this.getLabel(schema.label),
        target
      );
    }
  }]);

  return Radios;
}(_react.Component);

exports.default = Radios;