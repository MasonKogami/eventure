// import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const image1 = 'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const image2 = 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

const LandingPage = () => {

  return (
    <div style={{width: '100%'}}>
      <img src={`${image1}`} style={{backgroundSize: 'cover'}}/>
    </div>
  )
};

export default LandingPage;