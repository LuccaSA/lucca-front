import { NgPage } from './app.po';

describe('ng App', () => {
  let page: NgPage;

  beforeEach(() => {
    page = new NgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
