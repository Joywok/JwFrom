'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('jw-components/lib/input');

var _input2 = _interopRequireDefault(_input);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputCustom = function (_Component) {
	_inherits(InputCustom, _Component);

	function InputCustom() {
		_classCallCheck(this, InputCustom);

		return _possibleConstructorReturn(this, (InputCustom.__proto__ || Object.getPrototypeOf(InputCustom)).apply(this, arguments));
	}

	_createClass(InputCustom, [{
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
		value: function onChange(e, schema) {
			var value = e.target.value;
			this.props.onChange(value, schema);
			var propsSchema = this.props.schema;
			if (propsSchema['events'] && propsSchema['events']['onChange']) {
				propsSchema['events']['onChange'].call(this, arguments);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var schema = this.props.schema;
			var target = void 0;
			var data = Object.assign({});
			// ,(schema["attr"]||{}),(schema["events"]||{})
			if (schema && schema['attr']) {
				data = Object.assign(data, schema["attr"]);
			}
			if (schema && schema['events']) {
				data = Object.assign(data, schema["events"]);
			}
			if (this.props.type && this.props.type == 'Textarea') {
				var TextArea = _input2.default;
				target = _react2.default.createElement(TextArea, _extends({}, data, { onChange: function onChange(e) {
						return _this2.onChange(e, schema);
					}, value: schema['defaultValue'] }));
			} else {
				target = _react2.default.createElement(_input2.default, _extends({}, data, { onChange: function onChange(e) {
						return _this2.onChange(e, schema);
					}, value: schema['defaultValue'] }));
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
				{ className: 'Form-item-w', ref: 'container' },
				this.getLabel(schema.label),
				target
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			//初始化
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			//变化
			// console.log(this.refs.template,'123');
		}
	}]);

	return InputCustom;
}(_react.Component);

exports.default = InputCustom;