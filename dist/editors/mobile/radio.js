'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _style2 = require('jw-components-mobile/lib/radio/style');

var _radio = require('jw-components-mobile/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioItem = _radio2.default.RadioItem;

var Radios = function (_Component) {
	_inherits(Radios, _Component);

	function Radios() {
		_classCallCheck(this, Radios);

		return _possibleConstructorReturn(this, (Radios.__proto__ || Object.getPrototypeOf(Radios)).apply(this, arguments));
	}

	_createClass(Radios, [{
		key: 'onChange',
		value: function onChange(value, schema) {
			console.log(value, "Radiovalue");
			this.props.onChange(value, schema);
		}
	}, {
		key: 'changeData',
		value: function changeData(data) {
			this.props.onChange(value, schema);
		}
	}, {
		key: 'render',
		value: function render() {

			var schema = this.props.schema;
			var self = this;
			var target = _react2.default.createElement(
				'div',
				null,
				_.map(schema.options, function (item) {
					return _react2.default.createElement(
						RadioItem,
						{ checked: schema.defaultValue == item.value, onChange: function onChange() {
								return self.onChange(item.value, schema);
							} },
						item.label
					);
				})
			);
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

	return Radios;
}(_react.Component);

exports.default = Radios;