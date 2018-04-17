'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

var _Group2x = require('../../images/Group@2x.png');

var _Group2x2 = _interopRequireDefault(_Group2x);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelObjs = function (_Component) {
  _inherits(SelObjs, _Component);

  function SelObjs() {
    _classCallCheck(this, SelObjs);

    return _possibleConstructorReturn(this, (SelObjs.__proto__ || Object.getPrototypeOf(SelObjs)).apply(this, arguments));
  }

  _createClass(SelObjs, [{
    key: 'onChange',
    value: function onChange(value, schema) {
      this.props.onChange(value, schema);
      var propsSchema = this.props.schema;
      if (propsSchema['events'] && propsSchema['events']['onChange']) {
        propsSchema['events']['onChange'].call(this, arguments);
      }
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
      var schema = this.props.schema;
      var self = this;
      var target = _react2.default.createElement(
        'div',
        { className: 'selobjs-icon' },
        _react2.default.createElement('img', { src: _Group2x2.default })
      );
      return _react2.default.createElement(
        'div',
        { className: 'Form-item-w ', ref: 'container' },
        this.getLabel(schema.label),
        target
      );
    }
  }]);

  return SelObjs;
}(_react.Component);

exports.default = SelObjs;