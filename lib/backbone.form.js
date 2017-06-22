
;(function(root) {
  if (typeof exports !== 'undefined' && typeof require !== 'undefined') {
    var _ = root._ || require('underscore'),
        Backbone = root.Backbone || require('backbone');
  }else {
    var _ = root._,
        Backbone = root.Backbone;
  }
  var Form = Backbone.View.extend({

    events: {
      'submit': function(event) {
        this.trigger('submit', event);
      }
    },

    /**
     * Constructor
     * 
     * @param {Object} [options.schema]
     * @param {Backbone.Model} [options.model]
     * @param {Object} [options.data]
     * @param {String[]|Object[]} [options.fieldsets]
     * @param {String[]} [options.fields]
     * @param {String} [options.idPrefix]
     * @param {Form.Field} [options.Field]
     * @param {Form.Fieldset} [options.Fieldset]
     * @param {Function} [options.template]
     * @param {Boolean|String} [options.submitButton]
     */
    initialize: function(options) {
      var self = this;

      //Merge default options
      options = this.options = _.extend({
        submitButton: false
      }, options);

      //Find the schema to use
      var schema = this.schema = (function() {
        //Prefer schema from options
        if (options.schema) return _.result(options, 'schema');

        //Then schema on model
        var model = options.model;
        if (model && model.schema) return _.result(model, 'schema');

        //Then built-in schema
        if (self.schema) return _.result(self, 'schema');

        //Fallback to empty schema
        return {};
      })();

      //Store important data
      _.extend(this, _.pick(options, 'model', 'data', 'idPrefix', 'templateData'));

      //Override defaults
      var constructor = this.constructor;
      this.template = options.template || this.template || constructor.template;
      this.Fieldset = options.Fieldset || this.Fieldset || constructor.Fieldset;
      this.Field = options.Field || this.Field || constructor.Field;
      this.NestedField = options.NestedField || this.NestedField || constructor.NestedField;

      //Check which fields will be included (defaults to all)
      var selectedFields = this.selectedFields = options.fields || _.keys(schema);

      //Create fields
      var fields = this.fields = {};

      _.each(selectedFields, function(key) {
        var fieldSchema = schema[key];
        fields[key] = this.createField(key, fieldSchema);
      }, this);

      //Create fieldsets
      var fieldsetSchema = options.fieldsets || _.result(this, 'fieldsets') || _.result(this.model, 'fieldsets') || [selectedFields],
          fieldsets = this.fieldsets = [];

      _.each(fieldsetSchema, function(itemSchema) {
        this.fieldsets.push(this.createFieldset(itemSchema));
      }, this);
    },

    /**
     * Creates a Fieldset instance
     *
     * @param {String[]|Object[]} schema       Fieldset schema
     *
     * @return {Form.Fieldset}
     */
    createFieldset: function(schema) {
      var options = {
        schema: schema,
        fields: this.fields,
        legend: schema.legend || null
      };

      return new this.Fieldset(options);
    },

    /**
     * Creates a Field instance
     *
     * @param {String} key
     * @param {Object} schema       Field schema
     *
     * @return {Form.Field}
     */
    createField: function(key, schema) {
      var options = {
        form: this,
        key: key,
        schema: schema,
        idPrefix: this.idPrefix
      };

      if (this.model) {
        options.model = this.model;
      } else if (this.data) {
        options.value = this.data[key];
      } else {
        options.value = null;
      }

      var field = new this.Field(options);

      this.listenTo(field.editor, 'all', this.handleEditorEvent);

      return field;
    },

    /**
     * Callback for when an editor event is fired.
     * Re-triggers events on the form as key:event and triggers additional form-level events
     *
     * @param {String} event
     * @param {Editor} editor
     */
    handleEditorEvent: function(event, editor) {
      //Re-trigger editor events on the form
      var formEvent = editor.key+':'+event;

      this.trigger.call(this, formEvent, this, editor, Array.prototype.slice.call(arguments, 2));

      //Trigger additional events
      switch (event) {
        case 'change':
          this.trigger('change', this);
          break;

        case 'focus':
          if (!this.hasFocus) this.trigger('focus', this);
          break;

        case 'blur':
          if (this.hasFocus) {
            //TODO: Is the timeout etc needed?
            var self = this;
            setTimeout(function() {
              var focusedField = _.find(self.fields, function(field) {
                return field.editor.hasFocus;
              });

              if (!focusedField) self.trigger('blur', self);
            }, 0);
          }
          break;
      }
    },

    templateData: function() {
      var options = this.options;

      return {
        submitButton: options.submitButton
      }
    },

    render: function() {
      var self = this,
          fields = this.fields,
          $ = Backbone.$;

      //Render form
      var $form = $($.trim(this.template(_.result(this, 'templateData'))));

      //Render standalone editors
      $form.find('[data-editors]').add($form).each(function(i, el) {
        var $container = $(el),
            selection = $container.attr('data-editors');

        if (_.isUndefined(selection)) return;

        //Work out which fields to include
        var keys = (selection == '*')
          ? self.selectedFields || _.keys(fields)
          : selection.split(',');

        //Add them
        _.each(keys, function(key) {
          var field = fields[key];

          $container.append(field.editor.render().el);
        });
      });

      //Render standalone fields
      $form.find('[data-fields]').add($form).each(function(i, el) {
        var $container = $(el),
            selection = $container.attr('data-fields');

        if (_.isUndefined(selection)) return;

        //Work out which fields to include
        var keys = (selection == '*')
          ? self.selectedFields || _.keys(fields)
          : selection.split(',');

        //Add them
        _.each(keys, function(key) {
          var field = fields[key];

          $container.append(field.render().el);
        });
      });

      //Render fieldsets
      $form.find('[data-fieldsets]').add($form).each(function(i, el) {
        var $container = $(el),
            selection = $container.attr('data-fieldsets');

        if (_.isUndefined(selection)) return;

        _.each(self.fieldsets, function(fieldset) {
          $container.append(fieldset.render().el);
        });
      });

      //Set the main element
      this.setElement($form);
      
      //Set class
      $form.addClass(this.className);

      return this;
    },

    /**
     * Validate the data
     *
     * @return {Object}       Validation errors
     */
    validate: function(options) {
      var self = this,
          fields = this.fields,
          model = this.model,
          errors = {};

      options = options || {};

      //Collect errors from schema validation
      _.each(fields, function(field) {
        var error = field.validate();
        if (error) {
          errors[field.key] = error;
        }
      });

      //Get errors from default Backbone model validator
      if (!options.skipModelValidate && model && model.validate) {
        var modelErrors = model.validate(this.getValue());

        if (modelErrors) {
          var isDictionary = _.isObject(modelErrors) && !_.isArray(modelErrors);

          //If errors are not in object form then just store on the error object
          if (!isDictionary) {
            errors._others = errors._others || [];
            errors._others.push(modelErrors);
          }

          //Merge programmatic errors (requires model.validate() to return an object e.g. { fieldKey: 'error' })
          if (isDictionary) {
            _.each(modelErrors, function(val, key) {
              //Set error on field if there isn't one already
              if (fields[key] && !errors[key]) {
                fields[key].setError(val);
                errors[key] = val;
              }

              else {
                //Otherwise add to '_others' key
                errors._others = errors._others || [];
                var tmpErr = {};
                tmpErr[key] = val;
                errors._others.push(tmpErr);
              }
            });
          }
        }
      }

      return _.isEmpty(errors) ? null : errors;
    },

    /**
     * Update the model with all latest values.
     *
     * @param {Object} [options]  Options to pass to Model#set (e.g. { silent: true })
     *
     * @return {Object}  Validation errors
     */
    commit: function(options) {
      //Validate
      options = options || {};

      var validateOptions = {
          skipModelValidate: !options.validate
      };

      var errors = this.validate(validateOptions);
      if (errors) return errors;

      //Commit
      var modelError;

      var setOptions = _.extend({
        error: function(model, e) {
          modelError = e;
        }
      }, options);

      this.model.set(this.getValue(), setOptions);
      
      if (modelError) return modelError;
    },

    /**
     * Get all the field values as an object.
     * Use this method when passing data instead of objects
     *
     * @param {String} [key]    Specific field value to get
     */
    getValue: function(key) {
      //Return only given key if specified
      if (key) return this.fields[key].getValue();

      //Otherwise return entire form
      var values = {};
      _.each(this.fields, function(field) {
        values[field.key] = field.getValue();
      });

      return values;
    },

    /**
     * Update field values, referenced by key
     *
     * @param {Object|String} key     New values to set, or property to set
     * @param val                     Value to set
     */
    setValue: function(prop, val) {
      var data = {};
      if (typeof prop === 'string') {
        data[prop] = val;
      } else {
        data = prop;
      }

      var key;
      for (key in this.schema) {
        if (data[key] !== undefined) {
          this.fields[key].setValue(data[key]);
        }
      }
    },

    /**
     * Returns the editor for a given field key
     *
     * @param {String} key
     *
     * @return {Editor}
     */
    getEditor: function(key) {
      var field = this.fields[key];
      if (!field) throw new Error('Field not found: '+key);

      return field.editor;
    },

    /**
     * Gives the first editor in the form focus
     */
    focus: function() {
      if (this.hasFocus) return;

      //Get the first field
      var fieldset = this.fieldsets[0],
          field = fieldset.getFieldAt(0);

      if (!field) return;

      //Set focus
      field.editor.focus();
    },

    /**
     * Removes focus from the currently focused editor
     */
    blur: function() {
      if (!this.hasFocus) return;

      var focusedField = _.find(this.fields, function(field) {
        return field.editor.hasFocus;
      });

      if (focusedField) focusedField.editor.blur();
    },

    /**
     * Manages the hasFocus property
     *
     * @param {String} event
     */
    trigger: function(event) {
      if (event === 'focus') {
        this.hasFocus = true;
      }
      else if (event === 'blur') {
        this.hasFocus = false;
      }

      return Backbone.View.prototype.trigger.apply(this, arguments);
    },

    /**
     * Override default remove function in order to remove embedded views
     *
     * TODO: If editors are included directly with data-editors="x", they need to be removed
     * May be best to use XView to manage adding/removing views
     */
    remove: function() {
      _.each(this.fieldsets, function(fieldset) {
        fieldset.remove();
      });

      _.each(this.fields, function(field) {
        field.remove();
      });

      return Backbone.View.prototype.remove.apply(this, arguments);
    }

  }, {

    //STATICS
    template: _.template('\
      <form>\
      <div data-fieldsets></div>\
        <% if (submitButton) { %>\
          <button type="submit"><%= submitButton %></button>\
        <% } %>\
      </form>\
    ', null, this.templateSettings),

    templateSettings: {
      evaluate: /<%([\s\S]+?)%>/g, 
      interpolate: /<%=([\s\S]+?)%>/g, 
      escape: /<%-([\s\S]+?)%>/g
    },

    editors: {}

  });
  Form.validators = (function() {

    var validators = {};

    validators.errMessages = {
      required: 'Required',
      regexp: 'Invalid',
      number: 'Must be a number',
      email: 'Invalid email address',
      url: 'Invalid URL',
      match: _.template('Must match field "<%= field %>"', null, Form.templateSettings)
    };
    
    validators.required = function(options) {
      options = _.extend({
        type: 'required',
        message: this.errMessages.required
      }, options);
      
      return function required(value) {
        options.value = value;
        
        var err = {
          type: options.type,
          message: _.isFunction(options.message) ? options.message(options) : options.message
        };
        
        if (value === null || value === undefined || value === false || value === '') return err;
      };
    };
    
    validators.regexp = function(options) {
      if (!options.regexp) throw new Error('Missing required "regexp" option for "regexp" validator');
    
      options = _.extend({
        type: 'regexp',
        match: true,
        message: this.errMessages.regexp
      }, options);
      
      return function regexp(value) {
        options.value = value;
        
        var err = {
          type: options.type,
          message: _.isFunction(options.message) ? options.message(options) : options.message
        };
        
        //Don't check empty values (add a 'required' validator for this)
        if (value === null || value === undefined || value === '') return;

        //Create RegExp from string if it's valid
        if ('string' === typeof options.regexp) options.regexp = new RegExp(options.regexp, options.flags);

        if ((options.match) ? !options.regexp.test(value) : options.regexp.test(value)) return err;
      };
    };

    validators.number = function(options) {
      options = _.extend({
        type: 'number',
        message: this.errMessages.number,
        regexp: /^[0-9]*\.?[0-9]*?$/
      }, options);
      
      return validators.regexp(options);
    };
    
    validators.email = function(options) {
      options = _.extend({
        type: 'email',
        message: this.errMessages.email,
        regexp: /^[\w\-]{1,}([\w\-\+.]{1,1}[\w\-]{1,}){0,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/
      }, options);
      
      return validators.regexp(options);
    };
    
    validators.url = function(options) {
      options = _.extend({
        type: 'url',
        message: this.errMessages.url,
        regexp: /^(http|https):\/\/(([A-Z0-9][A-Z0-9_\-]*)(\.[A-Z0-9][A-Z0-9_\-]*)+)(:(\d+))?\/?/i
      }, options);
      
      return validators.regexp(options);
    };
    
    validators.match = function(options) {
      if (!options.field) throw new Error('Missing required "field" options for "match" validator');
      
      options = _.extend({
        type: 'match',
        message: this.errMessages.match
      }, options);
      
      return function match(value, attrs) {
        options.value = value;
        
        var err = {
          type: options.type,
          message: _.isFunction(options.message) ? options.message(options) : options.message
        };
        
        //Don't check empty values (add a 'required' validator for this)
        if (value === null || value === undefined || value === '') return;
        
        if (value !== attrs[options.field]) return err;
      };
    };

    return validators;
  })();
  Form.Fieldset = Backbone.View.extend({

    /**
     * Constructor
     *
     * Valid fieldset schemas:
     *   ['field1', 'field2']
     *   { legend: 'Some Fieldset', fields: ['field1', 'field2'] }
     *
     * @param {String[]|Object[]} options.schema      Fieldset schema
     * @param {Object} options.fields           Form fields
     */
    initialize: function(options) {
      options = options || {};

      //Create the full fieldset schema, merging defaults etc.
      var schema = this.schema = this.createSchema(options.schema);

      //Store the fields for this fieldset
      this.fields = _.pick(options.fields, schema.fields);
      
      //Override defaults
      this.template = options.template || schema.template || this.template || this.constructor.template;
    },

    /**
     * Creates the full fieldset schema, normalising, merging defaults etc.
     *
     * @param {String[]|Object[]} schema
     *
     * @return {Object}
     */
    createSchema: function(schema) {
      //Normalise to object
      if (_.isArray(schema)) {
        schema = { fields: schema };
      }

      //Add null legend to prevent template error
      schema.legend = schema.legend || null;

      return schema;
    },

    /**
     * Returns the field for a given index
     *
     * @param {Number} index
     *
     * @return {Field}
     */
    getFieldAt: function(index) {
      var key = this.schema.fields[index];

      return this.fields[key];
    },

    /**
     * Returns data to pass to template
     *
     * @return {Object}
     */
    templateData: function() {
      return this.schema;
    },

    /**
     * Renders the fieldset and fields
     *
     * @return {Fieldset} this
     */
    render: function() {
      var schema = this.schema,
          fields = this.fields,
          $ = Backbone.$;

      //Render fieldset
      var $fieldset = $($.trim(this.template(_.result(this, 'templateData'))));

      //Render fields
      $fieldset.find('[data-fields]').add($fieldset).each(function(i, el) {
        var $container = $(el),
            selection = $container.attr('data-fields');

        if (_.isUndefined(selection)) return;

        _.each(fields, function(field) {
          $container.append(field.render().el);
        });
      });

      this.setElement($fieldset);

      return this;
    },

    /**
     * Remove embedded views then self
     */
    remove: function() {
      _.each(this.fields, function(field) {
        field.remove();
      });

      Backbone.View.prototype.remove.call(this);
    }
    
  }, {
    //STATICS

    template: _.template('\
      <fieldset data-fields>\
        <% if (legend) { %>\
          <legend><%= legend %></legend>\
        <% } %>\
      </fieldset>\
    ', null, Form.templateSettings)

  });
  Form.Field = Backbone.View.extend({

    /**
     * Constructor
     *
     * @param {Object} options.key
     * @param {Object} options.form
     * @param {Object} [options.schema]
     * @param {Function} [options.schema.template]
     * @param {Backbone.Model} [options.model]
     * @param {Object} [options.value]
     * @param {String} [options.idPrefix]
     * @param {Function} [options.template]
     * @param {Function} [options.errorClassName]
     */
    initialize: function(options) {
      options = options || {};

      //Store important data
      _.extend(this, _.pick(options, 'form', 'key', 'model', 'value', 'idPrefix'));

      //Create the full field schema, merging defaults etc.
      var schema = this.schema = this.createSchema(options.schema);

      //Override defaults
      this.template = options.template || schema.template || this.template || this.constructor.template;
      this.errorClassName = options.errorClassName || this.errorClassName || this.constructor.errorClassName;

      //Create editor
      this.editor = this.createEditor();
    },

    /**
     * Creates the full field schema, merging defaults etc.
     *
     * @param {Object|String} schema
     *
     * @return {Object}
     */
    createSchema: function(schema) {
      if (_.isString(schema)) schema = { type: schema };

      //Set defaults
      schema = _.extend({
        type: 'Text',
        title: this.createTitle()
      }, schema);

      //Get the real constructor function i.e. if type is a string such as 'Text'
      schema.type = (_.isString(schema.type)) ? Form.editors[schema.type] : schema.type;

      return schema;
    },

    /**
     * Creates the editor specified in the schema; either an editor string name or
     * a constructor function
     *
     * @return {View}
     */
    createEditor: function() {
      var options = _.extend(
        _.pick(this, 'schema', 'form', 'key', 'model', 'value'),
        { id: this.createEditorId() }
      );

      var constructorFn = this.schema.type;

      return new constructorFn(options);
    },

    /**
     * Creates the ID that will be assigned to the editor
     *
     * @return {String}
     */
    createEditorId: function() {
      var prefix = this.idPrefix,
          id = this.key;

      //Replace periods with underscores (e.g. for when using paths)
      id = id.replace(/\./g, '_');

      //If a specific ID prefix is set, use it
      if (_.isString(prefix) || _.isNumber(prefix)) return prefix + id;
      if (_.isNull(prefix)) return id;

      //Otherwise, if there is a model use it's CID to avoid conflicts when multiple forms are on the page
      if (this.model) return this.model.cid + '_' + id;

      return id;
    },

    /**
     * Create the default field title (label text) from the key name.
     * (Converts 'camelCase' to 'Camel Case')
     *
     * @return {String}
     */
    createTitle: function() {
      var str = this.key;

      //Add spaces
      str = str.replace(/([A-Z])/g, ' $1');

      //Uppercase first character
      str = str.replace(/^./, function(str) { return str.toUpperCase(); });

      return str;
    },

    /**
     * Returns the data to be passed to the template
     *
     * @return {Object}
     */
    templateData: function() {
      var schema = this.schema;

      return {
        help: schema.help || '',
        title: schema.title,
        titleHTML: schema.titleHTML,
        fieldAttrs: schema.fieldAttrs,
        editorAttrs: schema.editorAttrs,
        key: this.key,
        editorId: this.editor.id
      };
    },

    /**
     * Render the field and editor
     *
     * @return {Field} self
     */
    render: function() {
      var schema = this.schema,
          editor = this.editor,
          $ = Backbone.$;

      //Only render the editor if requested
      if (this.editor.noField === true) {
        return this.setElement(editor.render().el);
      }

      //Render field
      var $field = $($.trim(this.template(_.result(this, 'templateData'))));

      if (schema.fieldClass) $field.addClass(schema.fieldClass);
      if (schema.fieldAttrs) $field.attr(schema.fieldAttrs);

      //Render editor
      $field.find('[data-editor]').add($field).each(function(i, el) {
        var $container = $(el),
            selection = $container.attr('data-editor');

        if (_.isUndefined(selection)) return;

        $container.append(editor.render().el);
      });

      this.setElement($field);

      return this;
    },

    /**
     * Disable the field's editor
     * Will call the editor's disable method if it exists
     * Otherwise will add the disabled attribute to all inputs in the editor
     */
    disable: function(){
      if ( _.isFunction(this.editor.disable) ){
        this.editor.disable();
      }
      else {
        $input = this.editor.$el;
        $input = $input.is("input") ? $input : $input.find("input");
        $input.attr("disabled",true);
      }
    },

    /**
     * Enable the field's editor
     * Will call the editor's disable method if it exists
     * Otherwise will remove the disabled attribute to all inputs in the editor
     */
    enable: function(){
      if ( _.isFunction(this.editor.enable) ){
        this.editor.enable();
      }
      else {
        $input = this.editor.$el;
        $input = $input.is("input") ? $input : $input.find("input");
        $input.attr("disabled",false);
      }
    },

    /**
     * Check the validity of the field
     *
     * @return {String}
     */
    validate: function() {
      var error = this.editor.validate();

      if (error) {
        this.setError(error.message);
      } else {
        this.clearError();
      }

      return error;
    },

    /**
     * Set the field into an error state, adding the error class and setting the error message
     *
     * @param {String} msg     Error message
     */
    setError: function(msg) {
      //Nested form editors (e.g. Object) set their errors internally
      if (this.editor.hasNestedForm) return;

      //Add error CSS class
      this.$el.addClass(this.errorClassName);

      //Set error message
      this.$('[data-error]').html(msg);
    },

    /**
     * Clear the error state and reset the help message
     */
    clearError: function() {
      //Remove error CSS class
      this.$el.removeClass(this.errorClassName);

      //Clear error message
      this.$('[data-error]').empty();
    },

    /**
     * Update the model with the new value from the editor
     *
     * @return {Mixed}
     */
    commit: function() {
      return this.editor.commit();
    },

    /**
     * Get the value from the editor
     *
     * @return {Mixed}
     */
    getValue: function() {
      return this.editor.getValue();
    },

    /**
     * Set/change the value of the editor
     *
     * @param {Mixed} value
     */
    setValue: function(value) {
      this.editor.setValue(value);
    },

    /**
     * Give the editor focus
     */
    focus: function() {
      this.editor.focus();
    },

    /**
     * Remove focus from the editor
     */
    blur: function() {
      this.editor.blur();
    },

    /**
     * Remove the field and editor views
     */
    remove: function() {
      this.editor.remove();

      Backbone.View.prototype.remove.call(this);
    }

  }, {
    //STATICS

    template: _.template('\
      <div>\
        <label for="<%= editorId %>">\
          <% if (titleHTML){ %><%= titleHTML %>\
          <% } else { %><%- title %><% } %>\
        </label>\
        <div>\
          <span data-editor></span>\
          <div data-error></div>\
          <div><%= help %></div>\
        </div>\
      </div>\
    ', null, Form.templateSettings),

    /**
     * CSS class name added to the field when there is a validation error
     */
    errorClassName: 'error'

  });
  Form.NestedField = Form.Field.extend({

    template: _.template('\
      <div>\
        <label for="<%= editorId %>">\
          <% if (titleHTML){ %><%= titleHTML %>\
          <% } else { %><%- title %><% } %>\
        </label>\
        <div>\
          <span data-editor></span>\
          <div class="error-text" data-error></div>\
          <div class="error-help"><%= help %></div>\
        </div>\
      </div>\
    ', null, Form.templateSettings)

  });

  Form.Editor = Form.editors.Base = Backbone.View.extend({

    defaultValue: null,

    hasFocus: false,

    initialize: function(options) {
      var options = options || {};

      //Set initial value
      if (options.model) {
        if (!options.key) throw new Error("Missing option: 'key'");

        this.model = options.model;

        this.value = this.model.get(options.key);
      }
      else if (options.value !== undefined) {
        this.value = options.value;
      }

      if (this.value === undefined) this.value = this.defaultValue;

      //Store important data
      _.extend(this, _.pick(options, 'key', 'form'));

      var schema = this.schema = options.schema || {};

      this.validators = options.validators || schema.validators;

      //Main attributes
      this.$el.attr('id', this.id);
      this.$el.attr('name', this.getName());
      if (schema.editorClass) this.$el.addClass(schema.editorClass);
      if (schema.editorAttrs) this.$el.attr(schema.editorAttrs);
    },

    /**
     * Get the value for the form input 'name' attribute
     *
     * @return {String}
     *
     * @api private
     */
    getName: function() {
      var key = this.key || '';

      //Replace periods with underscores (e.g. for when using paths)
      return key.replace(/\./g, '_');
    },

    /**
     * Get editor value
     * Extend and override this method to reflect changes in the DOM
     *
     * @return {Mixed}
     */
    getValue: function() {
      return this.value;
    },

    /**
     * Set editor value
     * Extend and override this method to reflect changes in the DOM
     *
     * @param {Mixed} value
     */
    setValue: function(value) {
      this.value = value;
    },

    /**
     * Give the editor focus
     * Extend and override this method
     */
    focus: function() {
      throw new Error('Not implemented');
    },
    
    /**
     * Remove focus from the editor
     * Extend and override this method
     */
    blur: function() {
      throw new Error('Not implemented');
    },

    /**
     * Update the model with the current value
     *
     * @param {Object} [options]              Options to pass to model.set()
     * @param {Boolean} [options.validate]    Set to true to trigger built-in model validation
     *
     * @return {Mixed} error
     */
    commit: function(options) {
      var error = this.validate();
      if (error) return error;

      this.listenTo(this.model, 'invalid', function(model, e) {
        error = e;
      });
      this.model.set(this.key, this.getValue(), options);

      if (error) return error;
    },

    /**
     * Check validity
     *
     * @return {Object|Undefined}
     */
    validate: function() {
      var $el = this.$el,
          error = null,
          value = this.getValue(),
          formValues = this.form ? this.form.getValue() : {},
          validators = this.validators,
          getValidator = this.getValidator;

      if (validators) {
        //Run through validators until an error is found
        _.every(validators, function(validator) {
          error = getValidator(validator)(value, formValues);

          return error ? false : true;
        });
      }

      return error;
    },

    /**
     * Set this.hasFocus, or call parent trigger()
     *
     * @param {String} event
     */
    trigger: function(event) {
      if (event === 'focus') {
        this.hasFocus = true;
      }
      else if (event === 'blur') {
        this.hasFocus = false;
      }

      return Backbone.View.prototype.trigger.apply(this, arguments);
    },

    /**
     * Returns a validation function based on the type defined in the schema
     *
     * @param {RegExp|String|Function} validator
     * @return {Function}
     */
    getValidator: function(validator) {
      var validators = Form.validators;

      //Convert regular expressions to validators
      if (_.isRegExp(validator)) {
        return validators.regexp({ regexp: validator });
      }
      
      //Use a built-in validator if given a string
      if (_.isString(validator)) {
        if (!validators[validator]) throw new Error('Validator "'+validator+'" not found');
        
        return validators[validator]();
      }

      //Functions can be used directly
      if (_.isFunction(validator)) return validator;

      //Use a customised built-in validator if given an object
      if (_.isObject(validator) && validator.type) {
        var config = validator;
        
        return validators[config.type](config);
      }
      
      //Unkown validator type
      throw new Error('Invalid validator: ' + validator);
    }
  });
  Form.editors.Text = Form.Editor.extend({

    tagName: 'input',

    defaultValue: '',

    previousValue: '',

    events: {
      'keyup':    'determineChange',
      'keypress': function(event) {
        var self = this;
        setTimeout(function() {
          self.determineChange();
        }, 0);
      },
      'select':   function(event) {
        this.trigger('select', this);
      },
      'focus':    function(event) {
        this.trigger('focus', this);
      },
      'blur':     function(event) {
        this.trigger('blur', this);
      }
    },

    initialize: function(options) {
      Form.editors.Base.prototype.initialize.call(this, options);

      var schema = this.schema;

      //Allow customising text type (email, phone etc.) for HTML5 browsers
      var type = 'text';

      if (schema && schema.editorAttrs && schema.editorAttrs.type) type = schema.editorAttrs.type;
      if (schema && schema.dataType) type = schema.dataType;

      this.$el.attr('type', type);
    },

    /**
     * Adds the editor to the DOM
     */
    render: function() {
      this.setValue(this.value);

      return this;
    },

    determineChange: function(event) {
      var currentValue = this.$el.val();
      var changed = (currentValue !== this.previousValue);

      if (changed) {
        this.previousValue = currentValue;

        this.trigger('change', this);
      }
    },

    /**
     * Returns the current editor value
     * @return {String}
     */
    getValue: function() {
      return this.$el.val();
    },

    /**
     * Sets the value of the form element
     * @param {String}
     */
    setValue: function(value) {
      this.$el.val(value);
    },

    focus: function() {
      if (this.hasFocus) return;

      this.$el.focus();
    },

    blur: function() {
      if (!this.hasFocus) return;

      this.$el.blur();
    },

    select: function() {
      this.$el.select();
    }

  });
  Form.VERSION = '0.14.0';
  //Exports
  Backbone.Form = Form;
  if (typeof module !== 'undefined') module.exports = Form;
})(window || global || this);
