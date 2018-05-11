'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _add12x = require('../../images/add1@2x.png');

var _add12x2 = _interopRequireDefault(_add12x);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrivePicker = function (_Component) {
	_inherits(DrivePicker, _Component);

	function DrivePicker() {
		_classCallCheck(this, DrivePicker);

		return _possibleConstructorReturn(this, (DrivePicker.__proto__ || Object.getPrototypeOf(DrivePicker)).apply(this, arguments));
	}

	_createClass(DrivePicker, [{
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

			return _react2.default.createElement(
				'div',
				{ className: 'Form-item-w', ref: 'container' },
				this.getLabel(schema.label),
				_react2.default.createElement(
					'div',
					{ className: 'file-upload-label' },
					'\u4E0A\u4F20'
				),
				_react2.default.createElement('img', { className: 'file-upload-icon', src: _add12x2.default })
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

	return DrivePicker;
}(_react.Component);

exports.default = DrivePicker;