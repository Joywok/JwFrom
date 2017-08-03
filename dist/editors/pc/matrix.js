'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _radio = require('jw-components/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = require('jw-components/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./../../styles/form.css');
var FormItem = _antd.Form.Item;
var RadioButton = _radio2.default.Button;

var Matrix = function (_Component) {
	_inherits(Matrix, _Component);

	function Matrix() {
		_classCallCheck(this, Matrix);

		return _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).apply(this, arguments));
	}

	_createClass(Matrix, [{
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
		value: function onChange(e, targetIndex, targetChildrenIndex) {
			var checked = e.target.checked;
			var schema = this.props.schema;
			var data = this.props.schema['defaultValue'];
			_.each(data, function (i, index) {
				if (index == targetIndex) {
					_.each(i['list'], function (item, childrenIndex) {
						if (childrenIndex == targetChildrenIndex) {
							item['value'] = checked;
						}
					});
				}
			});
			this.props.onChange(data, schema);
		}
	}, {
		key: 'resetOptions',
		value: function resetOptions(data) {
			var self = this;
			var schemas = self["props"]['schemas'];
			_.each(schemas, function (i) {
				if (i['name'] == self.props.schema["name"]) {
					i['options'] = data;
				}
			});
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
					{ className: 'loader' },
					'Loading...'
				);
				if (schema['remote']['fetch'] && typeof schema['remote']['fetch'] == 'function') {
					schema['remote']['fetch'](this.resetOptions.bind(this));
				} else {
					(0, _axios2.default)({
						method: schema["remote"]["method"],
						url: schema["remote"]["url"],
						data: schema["remote"]["data"]
					}).then(function (response) {
						self.resetOptions(response);
					}).catch(function (error) {
						_message2.default.error(error.toString(), 2);
					});
				}
			} else {
				// console.log(schema['options']);
				// <CheckboxGroup options={schema.options} onChange={v=>self.onChange(v,schema)} value={schema["defaultValue"]} />
				target = _react2.default.createElement(
					'div',
					{ className: 'matrix-list' },
					_react2.default.createElement(
						'div',
						{ className: 'matrix-title' },
						_.map(schema['options']['title'], function (i) {
							return _react2.default.createElement(
								'div',
								{ className: 'matrix-title-i' },
								i
							);
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'matrix-list-c' },
						_.map(schema['defaultValue'], function (i, index) {
							return _react2.default.createElement(
								'div',
								{ className: 'matrix-row-i' },
								_react2.default.createElement(
									'div',
									{ className: 'matrix-series-i title' },
									i["label"]
								),
								_.map(i['list'], function (i, childrenIndex) {
									return _react2.default.createElement(
										'div',
										{ className: 'matrix-series-i' },
										_react2.default.createElement(_checkbox2.default, { checked: i["value"], disabled: i["disabled"] || false, onChange: function onChange(e) {
												return self.onChange(e, index, childrenIndex);
											} })
										// i['element'] && i['element']=='checkbox'?
										//  :<Radio checked={i["value"]} onChange={(e)=>self.onChange(e,index,childrenIndex)}></Radio>

									);
								})
							);
						})
					)
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

	return Matrix;
}(_react.Component);

exports.default = Matrix;