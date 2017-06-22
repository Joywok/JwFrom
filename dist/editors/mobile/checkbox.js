'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkbox = require('jw-components-mobile/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;
var CheckboxGroup = _checkbox2.default.Group;

var Checkboxs = function (_Component) {
	_inherits(Checkboxs, _Component);

	function Checkboxs() {
		_classCallCheck(this, Checkboxs);

		return _possibleConstructorReturn(this, (Checkboxs.__proto__ || Object.getPrototypeOf(Checkboxs)).apply(this, arguments));
	}

	_createClass(Checkboxs, [{
		key: 'onChange',
		value: function onChange(value, schema) {
			this.props.onChange(value, schema);
		}
	}, {
		key: 'render',
		value: function render() {
			var schema = this.props.schema;
			var self = this;
			var target = _react2.default.createElement(CheckboxGroup, { options: schema.options, onChange: function onChange(v) {
					return self.onChange(v, schema);
				}, value: schema["defaultValue"] });
			if (schema["other"] && schema["other"]['template']) {
				var Template = schema["other"]['template'];
				target = _react2.default.createElement(Template, { children: target, target: this });
			} else {
				target = _react2.default.createElement(
					'div',
					{ className: 'Form-item-c' },
					target
				);
			}
			return _react2.default.createElement(
				'div',
				{ className: 'Form-item-w' },
				target
			);
		}
	}]);

	return Checkboxs;
}(_react.Component);

exports.default = Checkboxs;