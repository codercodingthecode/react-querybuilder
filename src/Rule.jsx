import React from 'react';
import { ActionElement, ValueEditor, ValueSelector, GroupSelector, GateSelector } from './controls';

export default class Rule extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      field: null,
      operator: null,
      value: null,
      schema: null
    };
  }

  render() {
    const {
      index,
      onAddRule,
      rules,
      field,
      operator,
      value,
      translations,
      schema: { fields, controls, getOperators, getLevel, classNames, combinators }
    } = this.props;
    const level = getLevel(this.props.id);
    const setOperator = operator === 'null' ? '=' : operator
    console.log('OPERATOR -> ', operator, setOperator)
    return (
      <div className={`rule ${classNames.rule}`}>



        <ActionElement
          label={translations.addRule.label}
          title={translations.addRule.title}
          handleOnClick={onAddRule}
          rules={rules}
          level={level}
        />

        <ActionElement
          label={translations.removeRule.label}
          title={translations.removeRule.title}
          handleOnClick={this.removeRule}
          level={level}
        />

        {/* // checkbox will be used to group query entries and deactivate once queries are in a group */}
        <GroupSelector
          label={translations.addRule.label}
          title={translations.addRule.title}
        // handleOnClick={this.addGroup}
        // rules={rules}
        // level={level}
        />

        {/* // univessal compinator loaded upon fetching payload data */}

          <GateSelector
          
          isVisible={index}
          options={combinators}
          // value={combinator}
          // title={translations.combinators.title}
          // handleOnChange={this.onCombinatorChange}
          rules={rules}
          level={level}
          />


        <ValueSelector
          options={fields}
          title={translations.fields.title}
          value={field}
          handleOnChange={this.onFieldChanged}
          level={level}
        />


        <ValueSelector
          field={field}
          title={translations.operators.title}
          options={getOperators(field)}
          value={setOperator}
          handleOnChange={this.onOperatorChanged}
          level={level}
        />

        <ValueEditor
          field={field}
          title={translations.value.title}
          operator={setOperator}
          value={value}
          options={getOperators(field)}
          handleOnChange={this.onValueChanged}
          level={level}
        />
      </div>
    );
  }

  onFieldChanged = (value) => {
    this.onElementChanged('field', value);
  };

  onOperatorChanged = (value) => {
    this.onElementChanged('operator', value);
  };

  onValueChanged = (value) => {
    this.onElementChanged('value', value);
  };

  onElementChanged = (property, value) => {
    const {
      id,
      schema: { onPropChange }
    } = this.props;

    onPropChange(property, value, id);
  };

  removeRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
  };
}
