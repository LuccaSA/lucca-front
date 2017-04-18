import {BogusBasic} from './basic/bogus-basic';

export const DEMO_DIRECTIVES =
    [BogusBasic];
declare var require: any;
export const DEMO_SNIPPETS = {
  // basic: {
  //   code: './basic/bogus-basic',
  //   markup: './basic/bogus-basic.html',
  // },
  basic: {
    code: require('./basic/bogus-basic.ts'),
    markup: require('./basic/bogus-basic.html'),
  },
  // basic: {
  //   code: require('!!prismjs-loader?lang=typescript!./basic/bogus-basic'),
  //   markup: require('!!prismjs-loader?lang=markup!./basic/bogus-basic.html')
  // },
};
