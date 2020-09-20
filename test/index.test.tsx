import React from 'react';
import test from 'ava';
import proxyquire from 'proxyquire';
import sinon, {stub} from 'sinon';
import {shallow} from 'enzyme';

import simple from '../src/icons/simple.json';
import expanding from '../src/icons/expanding.json';

const delay = async (ms = 100): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

const getFn = () => {
  const handlers: any = {};

  const animation = {
    play: stub(),
    goToAndStop: stub(),
    setDirection: stub(),
    addEventListener: (name: string, event: (...args: any[]) => any): void => {
      handlers[name] = event;
    },
    _callEventListener: (name: string, ...args: any[]): void => {
      handlers[name]?.(...args);
    }
  };

  const lottie = {
    loadAnimation: stub().returns(animation)
  };

  const {default: Icon} = proxyquire('../src', {
    react: {
      ...React,
      useEffect: (fn) => fn(),
      useRef: () => ({current: 'some-ref'})
    },
    'lottie-web': lottie
  });

  return {animation, lottie, Icon, handlers};
};

test('loads the shallow icon by default', async (t) => {
  const {Icon, lottie} = getFn();
  shallow(<Icon size={96} />);
  await delay();
  t.true(
    lottie.loadAnimation.calledWith({
      container: sinon.match.any,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: simple
    }),
    'failed to load simple'
  );
});

test('loads the expanding icon if requested', async (t) => {
  const {Icon, lottie} = getFn();
  shallow(<Icon size={96} type="expanding" />);
  await delay();
  t.true(
    lottie.loadAnimation.calledWith({
      container: sinon.match.any,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: expanding
    })
  );
});

test('runs play on mouse over', async (t) => {
  const {Icon, animation} = getFn();
  const tree = shallow(<Icon size={96} />);
  await delay();

  const div = tree.find('div');
  t.is(div.length, 1);

  div.simulate('mouseover');

  t.true(animation.play.called);
});

test('with simple style, resets animation on complete', async (t) => {
  const {Icon, animation} = getFn();
  const tree = shallow(<Icon size={96} />);
  await delay();

  const div = tree.find('div');
  div.simulate('mouseover');
  animation._callEventListener('complete');

  t.true(animation.goToAndStop.calledWith(0, true));
});

test('with expanding style, reverses animation and then stops', async (t) => {
  const {Icon, animation} = getFn();
  const tree = shallow(<Icon size={96} type="expanding" />);
  await delay();

  const div = tree.find('div');
  div.simulate('mouseout');

  t.true(animation.setDirection.calledWith(-1));
  t.true(animation.play.called);
});
