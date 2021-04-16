'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _datePicker = require('jw-components/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangePicker = _datePicker2.default.RangePicker,
    MonthPicker = _datePicker2.default.MonthPicker;

var DateCustom = function (_Component) {
	_inherits(DateCustom, _Component);

	function DateCustom() {
		_classCallCheck(this, DateCustom);

		return _possibleConstructorReturn(this, (DateCustom.__proto__ || Object.getPrototypeOf(DateCustom)).apply(this, arguments));
	}

	_createClass(DateCustom, [{
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
			var self = this;
			var schema = this.props.schema;
			var data = Object.assign({}, {
				type: schema['type']
			}, schema['attr'], schema["events"], {
				placeholder: schema['placeholder']
			});
			var target = void 0;
			// if(schema['type'] == 'month'){
			// 	target = <MonthPicker {...data} />
			// }else if(schema['type'] == 'range'){
			// 	target = <RangePicker {...data} />
			// }else{
			target = _react2.default.createElement(_datePicker2.default, data);
			// }

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
		value: function componentDidMount() {}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}]);

	return DateCustom;
}(_react.Component);

exports.default = DateCustom;