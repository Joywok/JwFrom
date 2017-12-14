'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inputItem = require('jw-components-mobile/lib/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('jw-components-mobile/lib/input-item/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcForm = require('rc-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Refill = function (_Component) {
	_inherits(Refill, _Component);

	function Refill(props) {
		_classCallCheck(this, Refill);

		var _this = _possibleConstructorReturn(this, (Refill.__proto__ || Object.getPrototypeOf(Refill)).call(this, props));

		_this.state = {
			pageClass: "refill-page hide"
		};
		return _this;
	}

	_createClass(Refill, [{
		key: 'onChange',
		value: function onChange(value, schema) {

			var self = this;
			setTimeout(function () {
				self.state.pageClass = "refill-page hide";
				self.setState(self.state);
			}, 500);
			console.log(this.state.left, "left");
			$(".refill-page").animate({ left: this.state.left }, 500);
			this.props.onChange(value, schema);
			var propsSchema = this.props.schema;
			if (propsSchema['events'] && propsSchema['events']['onChange']) {
				propsSchema['events']['onChange'].call(this, arguments);
			}
		}
	}, {
		key: 'onSearchChange',
		value: function onSearchChange(value, schema) {
			this.props.onChange(value, { name: schema.name + "_refill" });
			var propsSchema = this.props.schema;
			if (propsSchema['events'] && propsSchema['events']['onChange']) {
				propsSchema['events']['onChange'].call(this, arguments);
			}
		}
	}, {
		key: 'getLabel',
		value: function getLabel(txt) {
			if (txt) {
				return _react2.default.createElement('div', { className: 'label form-refill', dangerouslySetInnerHTML: { __html: txt } });
			} else {
				return '';
			}
		}
	}, {
		key: 'openSearch',
		value: function openSearch(schema) {
			this.state.pageClass = "refill-page";
			this.state.left = this.state.left = $("body").width();
			this.setState(this.state);
			$(".refill-page").animate({ left: 0 }, 500);
		}
	}, {
		key: 'view',
		value: function view() {
			var self = this;
			var schema = this.props.schema;
			var a = _.map(schema.dataList, function (dataItem) {
				return _react2.default.createElement(
					'div',
					{ className: 'refill-group', onClick: self.onChange.bind(self, dataItem, schema) },
					_.map(schema.viewSchema, function (viewItem) {
						return _react2.default.createElement(
							'div',
							{ className: 'refill-item' },
							_react2.default.createElement(
								'div',
								{ className: 'refill-label' },
								viewItem.label
							),
							_react2.default.createElement(
								'div',
								{ className: 'refill-value' },
								dataItem[viewItem.key]
							)
						);
					})
				);
			});

			return a;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var schema = this.props.schema;
			var self = this;
			var className = "Form-item-w am-refill " + schema.className;
			return _react2.default.createElement(
				'div',
				{ className: className, ref: 'container' },
				this.getLabel(schema.label),
				_react2.default.createElement(
					'div',
					{ className: 'refill-open-icon', onClick: this.openSearch.bind(self, schema) },
					'\u2192'
				),
				_react2.default.createElement(
					'div',
					{ className: self.state.pageClass },
					_react2.default.createElement('div', null),
					_react2.default.createElement(_inputItem2.default, { className: 'refill-input', placeholder: schema.placeholder, onChange: function onChange(value) {
							return _this2.onSearchChange(value, schema);
						} }),
					self.view()
				)
			);
		}
	}]);

	return Refill;
}(_react.Component);

exports.default = Refill;