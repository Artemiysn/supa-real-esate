import bg from '../../public/bg.jpeg';

const bgStyle = {
  backgroundImage: `linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.7)), url(${bg.src})`,
  width:"100%",
  height:"100%",
  backgroundPosition: 'center top',
  backgroundRepeat: 'repeat-x',
  minHeight: '700px',
}


export default function Home() {
  return (
    <div className="w-screen min-h-[400px] flex items-start justify-center pt-16" style={bgStyle}>
      <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Find your apartment with ease</h2>
    </div>
  );
}
