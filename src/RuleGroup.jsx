import React from 'react';
import Rule from './Rule';
import { ActionElement, GroupSelector, ValueSelector } from './controls';


export default class RuleGroup extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      rules: [],
      combinator: 'and',
      schema: {}
    };
  }

  render() {
    const {
      combinator,
      rules,
      translations,
      schema: { combinators, controls, onRuleRemove, isRuleGroup, getLevel, classNames }
    } = this.props;
    const level = getLevel(this.props.id);
    return (
      <div className={`ruleGroup ${classNames.ruleGroup}`}>
        {/* <h5>Button Add</h5>
        <h5>Button close</h5>
        <h5>Dropdown AND OR</h5>
        <h5>Dropdown FIELD</h5>
        <h5>Operators</h5>
        <h5>Value Field</h5> */}

        {/* <ActionElement
          label={translations.addRule.label}
          title={translations.addRule.title}
          handleOnClick={this.addRule}
          rules={rules}
          level={level}
        /> */}

        {/* // change to remove query line */}
        {/* <ActionElement
          label={translations.removeGroup.label}
          title={translations.removeGroup.title}
          handleOnClick={this.removeGroup}
          rules={rules}
          level={level}
        /> */}

        {/* // checkbox will be used to group query entries and deactivate once queries are in a group */}
        {/* <GroupSelector
          label={translations.addGroup.label}
          title={translations.addGroup.title}
          handleOnClick={this.addGroup}
          rules={rules}
          level={level}
        /> */}

        {/* // univessal compinator loaded upon fetching payload data */}
        {/* <ValueSelector
          options={combinators}
          value={combinator}
          title={translations.combinators.title}
          handleOnChange={this.onCombinatorChange}
          rules={rules}
          level={level}
        /> */}

        {rules.map(((r, index) => {
          console.log('index', index)
          
          return (
          // return isRuleGroup(r) ? (
            <div>
              {/* <RuleGroup
                key={r.id}
                id={r.id}
                schema={this.props.schema}
                parentId={this.props.id}
                combinator={r.combinator}
                translations={this.props.translations}
                rules={r.rules}
              /> */}

                <Rule
                  index={index}
                  key={r.id}
                  id={r.id}
                  field={r.field}
                  value={r.value}
                  operator={r.operator}
                  schema={this.props.schema}
                  parentId={this.props.id}
                  translations={this.props.translations}
                  onRuleRemove={onRuleRemove}
                  combinators={combinators}
                  rules={r.rules}
                  onAddRule={this.addRule}
                />
              </div>
            )}))
        }
      </div>
    );
  }

  hasParentGroup() {
    return this.props.parentId;
  }

  onCombinatorChange = (value) => {
    const { onPropChange } = this.props.schema;

    onPropChange('combinator', value, this.props.id);
  };

  addRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { createRule, onRuleAdd } = this.props.schema;

    const newRule = createRule();
    onRuleAdd(newRule, this.props.id);
  };

  addGroup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { createRuleGroup, onGroupAdd } = this.props.schema;
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, this.props.id);
  };

  removeGroup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onGroupRemove(this.props.id, this.props.parentId);
  };
}
