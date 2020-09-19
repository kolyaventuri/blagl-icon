import React, {useRef, useEffect, useState} from 'react';
import lottie, {AnimationItem} from 'lottie-web';

import animationData from './icon.json';

export type IconProps = {
  readonly size: number;
};

const Icon = ({size = 48}: IconProps): JSX.Element => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [anim, setAnim] = useState<null | AnimationItem>(null);

  console.log(size);
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const ani = lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData
    });

    ani.addEventListener('complete', () => {
      ani.goToAndStop(0, true);
    });

    setAnim(ani);
  }, [ref]);

  const handleMouseOver = () => {
    if (anim) {
      anim.play();
    }
  };

  return (
    <div
      ref={ref}
      style={{
        cursor: 'pointer',
        width: size,
        height: size
      }}
      onMouseOver={handleMouseOver}
    />
  );
};

export default Icon;
