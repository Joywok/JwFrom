'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _datePicker = require('antd-mobile/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickers = function (_Component) {
	_inherits(DatePickers, _Component);

	function DatePickers() {
		_classCallCheck(this, DatePickers);

		return _possibleConstructorReturn(this, (DatePickers.__proto__ || Object.getPrototypeOf(DatePickers)).apply(this, arguments));
	}

	_createClass(DatePickers, [{
		key: 'onChange',
		value: function onChange(value, schema) {
			this.props.onChange(value.format('X'), schema);
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
		key: '_init_layout',
		value: function _init_layout() {
			var schema = this.props.schema;
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
			var data = Object.assign({}, {
				mode: "date",
				title: "选择日期",
				disabled: false,
				value: (0, _moment2.default)(schema['defaultValue'] * 1000) || (0, _moment2.default)(),
				format: function format(val) {
					return val.format('YYYY-MM-DD HH:mm:ss');
				}
			}, schema['attr'], schema["events"]);
			var target = _react2.default.createElement(
				_datePicker2.default,
				_extends({}, data, { onChange: function onChange(e) {
						return self.onChange(e, schema);
					} }),
				_react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' })
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
				{ className: "Form-item-w " + this._init_layout(), ref: 'container' },
				this.getLabel(schema.label),
				target
			);
		}
	}]);

	return DatePickers;
}(_react.Component);

exports.default = DatePickers;