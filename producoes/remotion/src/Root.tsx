import {Composition} from 'remotion';
import {Video as TodoMundoSumiu, DURACAO as DUR_SUMIU} from './videos/TodoMundoSumiu';

// Cada vídeo novo vira um arquivo em src/videos/ e uma <Composition> aqui.
export const Root = () => (
  <>
    <Composition id="TodoMundoSumiu" component={TodoMundoSumiu} durationInFrames={DUR_SUMIU} fps={30} width={1080} height={1920} />
  </>
);
