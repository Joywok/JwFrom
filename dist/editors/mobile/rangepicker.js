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

var RangePicker = function (_Component) {
	_inherits(RangePicker, _Component);

	function RangePicker() {
		_classCallCheck(this, RangePicker);

		return _possibleConstructorReturn(this, (RangePicker.__proto__ || Object.getPrototypeOf(RangePicker)).apply(this, arguments));
	}

	_createClass(RangePicker, [{
		key: 'onChangeStart',
		value: function onChangeStart(value, schema) {
			console.log(schema, value);
			this.props.onChange(value.format('X'), schema.schema[0], "start");
			var propsSchema = this.props.schema;
			if (propsSchema['events'] && propsSchema['events']['onChange']) {
				propsSchema['events']['onChange'].call(this, arguments);
			}
		}
	}, {
		key: 'onChangeEnd',
		value: function onChangeEnd(value, schema) {
			this.props.onChange(value.format('X'), schema.schema[1], "end");
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
			console.log(schema, 'xxx');
			var self = this;
			var dataStart = Object.assign({}, {
				mode: "date",
				title: "开始",
				disabled: false,
				value: schema.schema[0]['defaultValue'] ? (0, _moment2.default)(schema.schema[0]['defaultValue'] * 1000) : (0, _moment2.default)(),
				format: function format(val) {
					return val.format(schema.schema[0]['format'] ? schema.schema[0]['format'] : 'YYYY-MM-DD HH:mm:ss');
				}
			}, schema.schema[0]['attr'], schema.schema[0]["events"]);
			var dataEnd = Object.assign({}, {
				mode: "date",
				title: "结束",
				disabled: false,
				value: schema.schema[1]['defaultValue'] ? (0, _moment2.default)(schema.schema[1]['defaultValue'] * 1000) : (0, _moment2.default)(),
				format: function format(val) {
					return val.format(schema.schema[1]['format'] ? schema.schema[1]['format'] : 'YYYY-MM-DD HH:mm:ss');
				}
			}, schema.schema[1]['attr'], schema.schema[1]["events"]);
			var targetStart = _react2.default.createElement(
				_datePicker2.default,
				_extends({}, dataStart, { onChange: function onChange(e) {
						return self.onChangeStart(e, schema);
					} }),
				_react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' })
			);
			var targetEnd = _react2.default.createElement(
				_datePicker2.default,
				_extends({}, dataEnd, { onChange: function onChange(e) {
						return self.onChangeEnd(e, schema);
					} }),
				_react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' })
			);
			if (schema.schema[0]["other"] && schema.schema[0].schema["other"]['template']) {
				var Template = schema["other"]['template'];
				targetStart = _react2.default.createElement(
					'div',
					{ className: 'Form-item-c' },
					_react2.default.createElement(Template, { children: targetStart, target: self, changeData: self.props.changeData, changeSchemas: self.props.changeSchemas })
				);
			} else {
				targetStart = _react2.default.createElement(
					'div',
					{ className: 'Form-item-c' },
					targetStart
				);
			}

			if (schema.schema[1]["other"] && schema.schema[1].schema["other"]['template']) {
				var _Template = schema["other"]['template'];
				targetEnd = _react2.default.createElement(
					'div',
					{ className: 'Form-item-c' },
					_react2.default.createElement(_Template, { children: targetEnd, target: self, changeData: self.props.changeData, changeSchemas: self.props.changeSchemas })
				);
			} else {
				targetEnd = _react2.default.createElement(
					'div',
					{ className: 'Form-item-c' },
					targetEnd
				);
			}
			return _react2.default.createElement(
				'div',
				{ className: "Form-item-w " + this._init_layout(), ref: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'rangepicker-title' },
					this.getLabel(schema.label)
				),
				_react2.default.createElement(
					'div',
					{ className: 'rangepicker-start' },
					_react2.default.createElement(
						'div',
						{ className: 'rangepicker-start-label' },
						schema.schema[0]['label']
					),
					targetStart
				),
				_react2.default.createElement(
					'div',
					{ className: 'rangepicker-start' },
					_react2.default.createElement(
						'div',
						{ className: 'rangepicker-start-label' },
						schema.schema[1]['label']
					),
					targetStart
				)
			);
		}
	}]);

	return RangePicker;
}(_react.Component);

exports.default = RangePicker;