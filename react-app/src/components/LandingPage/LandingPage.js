import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const LandingPage = () => {

  return (
    <div>
      <Parallax pages={4}>
        <ParallaxLayer>
          <h1>hi</h1>
        </ParallaxLayer>

        <ParallaxLayer>
          <h2>Welcome to Eventure!</h2>
        </ParallaxLayer>

        <ParallaxLayer>
          <h3>The fun never stops!</h3>
        </ParallaxLayer>

        <ParallaxLayer>
          <h4>Find your next Eventure.</h4>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}