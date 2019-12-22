import 'core-js/shim';
import 'regenerator-runtime/runtime';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// https://github.com/facebook/jest/issues/6121
// eslint-disable-next-line no-console
const { error } = console;
// eslint-disable-next-line no-console
console.error = (message, ...args) => {
  error.apply(console, args); // keep default behaviour
  const err = message instanceof Error ? message : new Error(message);
  throw err;
};
