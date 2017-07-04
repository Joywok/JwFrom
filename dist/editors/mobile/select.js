'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style3 = require('jw-components-mobile/lib/picker/style');

var _picker = require('jw-components-mobile/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _style4 = require('jw-components-mobile/lib/list/style');

var _list = require('jw-components-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));
  }

  _createClass(Select, [{
    key: 'onChange',
    value: function onChange(value, schema) {
      this.props.onChange(value, schema);
    }
  }, {
    key: 'getLabel',
    value: function getLabel(txt) {
      if (txt) {
        return _react2.default.createElement('div', { className: 'label ant-form-item-label', dangerouslySetInnerHTML: { __html: txt } });
      } else {
        return '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var schema = this.props.schema;
      var self = this;

      var target = _react2.default.createElement(
        _picker2.default,
        _extends({}, schema, { data: schema.options, onChange: function onChange(value) {
            return _this2.onChange(value, schema);
          }, value: schema.defaultValue }),
        _react2.default.createElement(
          _list2.default.Item,
          { arrow: 'horizontal' },
          '\u9009\u62E9\u5730\u533A\uFF08\u5355\u5217\uFF09'
        )
      );

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
        { className: 'Form-item-w ', ref: 'container' },
        this.getLabel(schema.label),
        target
      );
    }
  }]);

  return Select;
}(_react.Component);

exports.default = Select;