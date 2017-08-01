'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jwComponents = require('jw-components');

var _antd = require('antd');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Radio } from 'antd';

var RadioButton = _jwComponents.Radio.Button;
var RadioGroup = _jwComponents.Radio.Group;

var Radios = function (_Component) {
	_inherits(Radios, _Component);

	function Radios() {
		_classCallCheck(this, Radios);

		return _possibleConstructorReturn(this, (Radios.__proto__ || Object.getPrototypeOf(Radios)).apply(this, arguments));
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
		value: function onChange(e, schema) {
			var value = e.target.value;
			this.props.onChange(value, schema);
			var propsSchema = this.props.schema;
			if (propsSchema['events'] && propsSchema['events']['onChange']) {
				propsSchema['events']['onChange'].call(this, arguments);
			}
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
					(0, _axios2.default)({
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
					RadioGroup,
					{ value: schema['defaultValue'].toString(), onChange: function onChange(e) {
							return self.onChange(e, schema);
						} },
					_.map(schema.options, function (item) {
						return _react2.default.createElement(
							_jwComponents.Radio,
							{ value: item["value"] },
							item.label
						);
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