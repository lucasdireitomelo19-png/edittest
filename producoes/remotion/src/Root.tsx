import {Composition, Still} from 'remotion';
import {Video as TodoMundoSumiu, DURACAO as DUR_SUMIU} from './videos/TodoMundoSumiu';
import {Video as Kikai, DURACAO as DUR_KIKAI} from './videos/Kikai';
import {Video as Meteoro, DURACAO as DUR_METEORO} from './videos/Meteoro';
import {Video as SemVerao, DURACAO as DUR_SEMVERAO} from './videos/SemVerao';
import {Video as Tsunami, DURACAO as DUR_TSUNAMI} from './videos/Tsunami';
import {Video as FimSolar, Thumb as ThumbFimSolar, DURACAO as DUR_FIMSOLAR} from './videos/FimSolar';
import {Video as SemLua, Thumb as ThumbSemLua, ThumbA as ThumbSemLuaA, ThumbB as ThumbSemLuaB, DURACAO as DUR_SEMLUA} from './videos/SemLua';

// Cada vídeo novo vira um arquivo em src/videos/ e uma <Composition> aqui.
export const Root = () => (
  <>
    <Composition id="TodoMundoSumiu" component={TodoMundoSumiu} durationInFrames={DUR_SUMIU} fps={30} width={1080} height={1920} />
    <Composition id="Kikai" component={Kikai} durationInFrames={DUR_KIKAI} fps={30} width={1080} height={1920} />
    <Composition id="Meteoro" component={Meteoro} durationInFrames={DUR_METEORO} fps={30} width={1080} height={1920} />
    <Composition id="SemVerao" component={SemVerao} durationInFrames={DUR_SEMVERAO} fps={30} width={1080} height={1920} />
    <Composition id="SemLua" component={SemLua} durationInFrames={DUR_SEMLUA} fps={30} width={1920} height={1080} />
    <Still id="ThumbSemLua" component={ThumbSemLua} width={1920} height={1080} />
    <Still id="ThumbSemLuaA" component={ThumbSemLuaA} width={1920} height={1080} />
    <Still id="ThumbSemLuaB" component={ThumbSemLuaB} width={1920} height={1080} />
    <Composition id="FimSolar" component={FimSolar} durationInFrames={DUR_FIMSOLAR} fps={30} width={1920} height={1080} />
    <Still id="ThumbFimSolar" component={ThumbFimSolar} width={1920} height={1080} />
    <Composition id="Tsunami" component={Tsunami} durationInFrames={DUR_TSUNAMI} fps={30} width={1080} height={1920} />
  </>
);
