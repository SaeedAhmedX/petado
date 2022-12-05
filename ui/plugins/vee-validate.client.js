import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

extend('odd', {
  validate: (value) => {
    return value % 2 === 0;
  },
  message: 'This field must be an odd number',
});
