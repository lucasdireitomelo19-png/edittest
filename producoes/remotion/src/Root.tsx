import {Composition, Still} from 'remotion';
import {Video as TodoMundoSumiu, DURACAO as DUR_SUMIU} from './videos/TodoMundoSumiu';
import {Video as Kikai, DURACAO as DUR_KIKAI} from './videos/Kikai';
import {Video as Meteoro, DURACAO as DUR_METEORO} from './videos/Meteoro';
import {Video as SemVerao, DURACAO as DUR_SEMVERAO} from './videos/SemVerao';
import {Video as Tsunami, DURACAO as DUR_TSUNAMI} from './videos/Tsunami';
import {Video as Asteroide2025TF, DURACAO as DUR_2025TF} from './videos/Asteroide2025TF';
import {Video as SolAviao, DURACAO as DUR_SOLAVIAO} from './videos/SolAviao';
import {Video as LuzesOlhos, DURACAO as DUR_LUZES} from './videos/LuzesOlhos';
import {Video as MinasVietna, DURACAO as DUR_MINAS} from './videos/MinasVietna';
import {Video as Amaterasu, DURACAO as DUR_AMATERASU} from './videos/Amaterasu';
import {Video as MarteRadiacao, DURACAO as DUR_MARTE} from './videos/MarteRadiacao';
import {Video as Shoemaker, DURACAO as DUR_SHOEMAKER} from './videos/Shoemaker';
import {Video as Boltzmann, DURACAO as DUR_BOLTZMANN} from './videos/Boltzmann';
import {Video as NaveMarte, DURACAO as DUR_NAVEMARTE} from './videos/NaveMarte';
import {Video as Venus, DURACAO as DUR_VENUS} from './videos/Venus';
import {Video as Sinal, DURACAO as DUR_SINAL} from './videos/Sinal';
import {Video as SemSol, DURACAO as DUR_SEMSOL} from './videos/SemSol';
import {Video as CeuVazio, DURACAO as DUR_CEUVAZIO} from './videos/CeuVazio';
import {Video as NasceuMarte, DURACAO as DUR_NASCEUMARTE} from './videos/NasceuMarte';
import {Video as Agenda2027, DURACAO as DUR_AGENDA2027} from './videos/Agenda2027';
import {Video as BigRip, Thumb as ThumbBigRip, DURACAO as DUR_BIGRIP} from './videos/BigRip';
import {Video as Area51, Thumb as ThumbArea51, ThumbVerdade as ThumbArea51Verdade, DURACAO as DUR_AREA51} from './videos/Area51';
import {Video as FimSolar, Thumb as ThumbFimSolar, ThumbA as ThumbFimSolarA, ThumbB as ThumbFimSolarB, DURACAO as DUR_FIMSOLAR} from './videos/FimSolar';
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
    <Still id="ThumbFimSolarA" component={ThumbFimSolarA} width={1920} height={1080} />
    <Still id="ThumbFimSolarB" component={ThumbFimSolarB} width={1920} height={1080} />
    <Composition id="Asteroide2025TF" component={Asteroide2025TF} durationInFrames={DUR_2025TF} fps={30} width={1080} height={1920} />
    <Composition id="LuzesOlhos" component={LuzesOlhos} durationInFrames={DUR_LUZES} fps={30} width={1080} height={1920} />
    <Composition id="MinasVietna" component={MinasVietna} durationInFrames={DUR_MINAS} fps={30} width={1080} height={1920} />
    <Composition id="Amaterasu" component={Amaterasu} durationInFrames={DUR_AMATERASU} fps={30} width={1080} height={1920} />
    <Composition id="Area51" component={Area51} durationInFrames={DUR_AREA51} fps={30} width={1920} height={1080} />
    <Still id="ThumbArea51" component={ThumbArea51} width={1920} height={1080} />
    <Still id="ThumbArea51Verdade" component={ThumbArea51Verdade} width={1920} height={1080} />
    <Composition id="Shoemaker" component={Shoemaker} durationInFrames={DUR_SHOEMAKER} fps={30} width={1080} height={1920} />
    <Composition id="Boltzmann" component={Boltzmann} durationInFrames={DUR_BOLTZMANN} fps={30} width={1080} height={1920} />
    <Composition id="NaveMarte" component={NaveMarte} durationInFrames={DUR_NAVEMARTE} fps={30} width={1080} height={1920} />
    <Composition id="Venus" component={Venus} durationInFrames={DUR_VENUS} fps={30} width={1080} height={1920} />
    <Composition id="Agenda2027" component={Agenda2027} durationInFrames={DUR_AGENDA2027} fps={30} width={1080} height={1920} />
    <Composition id="Sinal" component={Sinal} durationInFrames={DUR_SINAL} fps={30} width={1080} height={1920} />
    <Composition id="SemSol" component={SemSol} durationInFrames={DUR_SEMSOL} fps={30} width={1080} height={1920} />
    <Composition id="CeuVazio" component={CeuVazio} durationInFrames={DUR_CEUVAZIO} fps={30} width={1080} height={1920} />
    <Composition id="NasceuMarte" component={NasceuMarte} durationInFrames={DUR_NASCEUMARTE} fps={30} width={1080} height={1920} />
    <Composition id="BigRip" component={BigRip} durationInFrames={DUR_BIGRIP} fps={30} width={1920} height={1080} />
    <Still id="ThumbBigRip" component={ThumbBigRip} width={1920} height={1080} />
    <Composition id="MarteRadiacao" component={MarteRadiacao} durationInFrames={DUR_MARTE} fps={30} width={1080} height={1920} />
    <Composition id="SolAviao" component={SolAviao} durationInFrames={DUR_SOLAVIAO} fps={30} width={1080} height={1920} />
    <Composition id="Tsunami" component={Tsunami} durationInFrames={DUR_TSUNAMI} fps={30} width={1080} height={1920} />
  </>
);
