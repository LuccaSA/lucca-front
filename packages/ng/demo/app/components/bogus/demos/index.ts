declare var require: any;
import {BogusBasic} from './basic/bogus-basic';

export const DEMO_DIRECTIVES = [
  BogusBasic,
];
export const DEMO_SNIPPETS = {
  basic: {
    code: require('!!prismjs-loader?lang=typescript!./basic/bogus-basic'),
    markup: require('!!prismjs-loader?lang=markup!./basic/bogus-basic.html')
  },
};
