import React, {useRef, useEffect, useState} from 'react';
import lottie, {AnimationItem} from 'lottie-web';
import simple from './icons/simple.json';
import expanding from './icons/expanding.json';

export type IconProps = {
  readonly size: number;
  readonly type?: 'simple' | 'expanding';
  readonly onClick?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Icon = ({
  size = 48,
  type = 'simple',
  onClick = noop
}: IconProps): JSX.Element => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [anim, setAnim] = useState<null | AnimationItem>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref?.current || ready) {
      return;
    }

    const animationData = type === 'simple' ? simple : expanding;

    const ani = lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData
    });

    ani.addEventListener('complete', () => {
      if (type === 'simple') {
        ani.goToAndStop(0, true);
      }
    });

    setAnim(ani);
    setReady(true);
  }, [ref, ready, type]);

  const handleMouseOver = (): void => {
    if (anim) {
      anim.setDirection(1);
      anim.play();
    }
  };

  const handleMouseOut = (): void => {
    if (anim) {
      if (type === 'expanding') {
        anim.setDirection(-1);
        anim.play();
      }
    }
  };

  return (
    <div
      ref={ref}
      style={{
        cursor: 'pointer',
        width: type === 'simple' ? size : size * 2.5,
        height: size
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    />
  );
};

export default Icon;
