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
import {Video as CopiaExata, DURACAO as DUR_COPIA} from './videos/CopiaExata';
import {Video as Gemeos, DURACAO as DUR_GEMEOS} from './videos/Gemeos';
import {Video as Avo, DURACAO as DUR_AVO} from './videos/Avo';
import {Video as Multiverso, Thumb as ThumbMultiverso, DURACAO as DUR_MULTIVERSO} from './videos/Multiverso';
import {Video as BigRip, Thumb as ThumbBigRip, ThumbRasgo as ThumbBigRipRasgo, DURACAO as DUR_BIGRIP} from './videos/BigRip';
import {Video as Area51, Thumb as ThumbArea51, ThumbVerdade as ThumbArea51Verdade, DURACAO as DUR_AREA51} from './videos/Area51';
import {Video as FimSolar, Thumb as ThumbFimSolar, ThumbA as ThumbFimSolarA, ThumbB as ThumbFimSolarB, DURACAO as DUR_FIMSOLAR} from './videos/FimSolar';
import {Video as SemLua, Thumb as ThumbSemLua, ThumbA as ThumbSemLuaA, ThumbB as ThumbSemLuaB, DURACAO as DUR_SEMLUA} from './videos/SemLua';

import {Video as Jupiter, Thumb as ThumbJupiter, DURACAO as DUR_JUPITER} from './videos/Jupiter';
import {Video as MaiorEstrela, Thumb as ThumbMaiorEstrela, DURACAO as DUR_MAIORESTRELA} from './videos/MaiorEstrela';
import {Video as Tesla, Thumb as ThumbTesla, DURACAO as DUR_TESLA} from './videos/Tesla';
import {Video as Memorial, Thumb as ThumbMemorial, DURACAO as DUR_MEMORIAL} from './videos/Memorial';
import {Video as Betelgeuse, Thumb as ThumbBetelgeuse, DURACAO as DUR_BETELGEUSE} from './videos/Betelgeuse';
import {Video as Yr4, Thumb as ThumbYr4, DURACAO as DUR_YR4} from './videos/Yr4';
import {Video as Magnetar, Thumb as ThumbMagnetar, DURACAO as DUR_MAGNETAR} from './videos/Magnetar';
import {Video as Errante, Thumb as ThumbErrante, DURACAO as DUR_ERRANTE} from './videos/Errante';
import {Video as SolTerra, Thumb as ThumbSolTerra, DURACAO as DUR_SOLTERRA} from './videos/SolTerra';
import {Video as BnAno, Thumb as ThumbBnAno, DURACAO as DUR_BNANO} from './videos/BnAno';
import {Video as SnPerto, Thumb as ThumbSnPerto, DURACAO as DUR_SNPERTO} from './videos/SnPerto';
import {ThumbBetelgeuse2, ThumbYr42, ThumbMagnetar2, ThumbErrante2, ThumbSolTerra2, ThumbBnAno2, ThumbSnPerto2} from './lote/thumbs2';
import {Video as LuaBate, Thumb as ThumbLuaBate, DURACAO as DUR_LUABATE} from './videos/LuaBate';
import {Video as PiTres, Thumb as ThumbPiTres, DURACAO as DUR_PITRES} from './videos/PiTres';
import {Video as Vulcoes, Thumb as ThumbVulcoes, DURACAO as DUR_VULCOES} from './videos/Vulcoes';
import {Video as Alien, Thumb as ThumbAlien, DURACAO as DUR_ALIEN} from './videos/Alien';
import {Video as BnSala, ThumbCena as ThumbBnSala, DURACAO as DUR_BNSALA} from './videos/BnSala';
import {Video as Pangeia, ThumbCena as ThumbPangeia, DURACAO as DUR_PANGEIA} from './videos/Pangeia';
import {Video as PangeiaLongo, ThumbCena as ThumbPangeiaLongo, DURACAO as DUR_PGL} from './videos/PangeiaLongo';
import {Video as Gelo, ThumbCena as ThumbGelo, DURACAO as DUR_GELO} from './videos/Gelo';
import {Video as Antartida, DURACAO as DUR_ANT} from './videos/Antartida';
import {Video as Cubo, DURACAO as DUR_CUBO} from './videos/Cubo';
import {Teste3D, DURACAO_3D} from './videos/Teste3D';
import {Video as BnPerto, Thumb as ThumbBnPerto, DURACAO as DUR_BNPERTO} from './videos/BnPerto';
// Cada vídeo novo vira um arquivo em src/videos/ e uma <Composition> aqui.
export const Root = () => (
  <>
    <Composition id="Betelgeuse" component={Betelgeuse} durationInFrames={DUR_BETELGEUSE} fps={30} width={1080} height={1920} />
    <Still id="ThumbBetelgeuse" component={ThumbBetelgeuse} width={1080} height={1920} />
    <Composition id="Yr4" component={Yr4} durationInFrames={DUR_YR4} fps={30} width={1080} height={1920} />
    <Still id="ThumbYr4" component={ThumbYr4} width={1080} height={1920} />
    <Composition id="Magnetar" component={Magnetar} durationInFrames={DUR_MAGNETAR} fps={30} width={1080} height={1920} />
    <Still id="ThumbMagnetar" component={ThumbMagnetar} width={1080} height={1920} />
    <Composition id="Errante" component={Errante} durationInFrames={DUR_ERRANTE} fps={30} width={1080} height={1920} />
    <Still id="ThumbErrante" component={ThumbErrante} width={1080} height={1920} />
    <Composition id="SolTerra" component={SolTerra} durationInFrames={DUR_SOLTERRA} fps={30} width={1080} height={1920} />
    <Still id="ThumbSolTerra" component={ThumbSolTerra} width={1080} height={1920} />
    <Composition id="BnAno" component={BnAno} durationInFrames={DUR_BNANO} fps={30} width={1920} height={1080} />
    <Still id="ThumbBnAno" component={ThumbBnAno} width={1920} height={1080} />
    <Composition id="SnPerto" component={SnPerto} durationInFrames={DUR_SNPERTO} fps={30} width={1920} height={1080} />
    <Still id="ThumbSnPerto" component={ThumbSnPerto} width={1920} height={1080} />
    <Still id="ThumbBetelgeuse2" component={ThumbBetelgeuse2} width={1080} height={1920} />
    <Still id="ThumbYr42" component={ThumbYr42} width={1080} height={1920} />
    <Still id="ThumbMagnetar2" component={ThumbMagnetar2} width={1080} height={1920} />
    <Still id="ThumbErrante2" component={ThumbErrante2} width={1080} height={1920} />
    <Still id="ThumbSolTerra2" component={ThumbSolTerra2} width={1080} height={1920} />
    <Still id="ThumbBnAno2" component={ThumbBnAno2} width={1920} height={1080} />
    <Still id="ThumbSnPerto2" component={ThumbSnPerto2} width={1920} height={1080} />
    <Composition id="LuaBate" component={LuaBate} durationInFrames={DUR_LUABATE} fps={30} width={1080} height={1920} />
    <Still id="ThumbLuaBate" component={ThumbLuaBate} width={1080} height={1920} />
    <Composition id="PiTres" component={PiTres} durationInFrames={DUR_PITRES} fps={30} width={1080} height={1920} />
    <Still id="ThumbPiTres" component={ThumbPiTres} width={1080} height={1920} />
    <Composition id="Vulcoes" component={Vulcoes} durationInFrames={DUR_VULCOES} fps={30} width={1080} height={1920} />
    <Still id="ThumbVulcoes" component={ThumbVulcoes} width={1080} height={1920} />
    <Composition id="Alien" component={Alien} durationInFrames={DUR_ALIEN} fps={30} width={1080} height={1920} />
    <Still id="ThumbAlien" component={ThumbAlien} width={1080} height={1920} />
    <Still id="ThumbBnSala" component={ThumbBnSala} width={1080} height={1920} />
    <Composition id="BnSala" component={BnSala} durationInFrames={DUR_BNSALA} fps={30} width={1080} height={1920} />
    <Composition id="Pangeia" component={Pangeia} durationInFrames={DUR_PANGEIA} fps={30} width={1080} height={1920} />
    <Still id="ThumbPangeia" component={ThumbPangeia} width={1080} height={1920} />
    <Composition id="PangeiaLongo" component={PangeiaLongo} durationInFrames={DUR_PGL} fps={30} width={1920} height={1080} />
    <Still id="ThumbPangeiaLongo" component={ThumbPangeiaLongo} width={1920} height={1080} />
    <Composition id="Gelo" component={Gelo} durationInFrames={DUR_GELO} fps={30} width={1080} height={1920} />
    <Still id="ThumbGelo" component={ThumbGelo} width={1080} height={1920} />
    <Composition id="Antartida" component={Antartida} durationInFrames={DUR_ANT} fps={30} width={1080} height={1920} />
    <Composition id="Cubo" component={Cubo} durationInFrames={DUR_CUBO} fps={30} width={1080} height={1920} />
    <Composition id="Teste3D" component={Teste3D} durationInFrames={DURACAO_3D} fps={30} width={1080} height={1920} />
    <Composition id="BnPerto" component={BnPerto} durationInFrames={DUR_BNPERTO} fps={30} width={1080} height={1920} />
    <Still id="ThumbBnPerto" component={ThumbBnPerto} width={1080} height={1920} />
    <Composition id="Memorial" component={Memorial} durationInFrames={DUR_MEMORIAL} fps={30} width={1080} height={1920} />
    <Still id="ThumbMemorial" component={ThumbMemorial} width={1080} height={1920} />
    <Composition id="Tesla" component={Tesla} durationInFrames={DUR_TESLA} fps={30} width={1080} height={1920} />
    <Still id="ThumbTesla" component={ThumbTesla} width={1080} height={1920} />
    <Composition id="MaiorEstrela" component={MaiorEstrela} durationInFrames={DUR_MAIORESTRELA} fps={30} width={1080} height={1920} />
    <Still id="ThumbMaiorEstrela" component={ThumbMaiorEstrela} width={1080} height={1920} />
    <Composition id="Jupiter" component={Jupiter} durationInFrames={DUR_JUPITER} fps={30} width={1080} height={1920} />
    <Still id="ThumbJupiter" component={ThumbJupiter} width={1080} height={1920} />
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
    <Composition id="CopiaExata" component={CopiaExata} durationInFrames={DUR_COPIA} fps={30} width={1080} height={1920} />
    <Composition id="Gemeos" component={Gemeos} durationInFrames={DUR_GEMEOS} fps={30} width={1080} height={1920} />
    <Composition id="Avo" component={Avo} durationInFrames={DUR_AVO} fps={30} width={1080} height={1920} />
    <Composition id="Multiverso" component={Multiverso} durationInFrames={DUR_MULTIVERSO} fps={30} width={1920} height={1080} />
    <Still id="ThumbMultiverso" component={ThumbMultiverso} width={1920} height={1080} />
    <Composition id="BigRip" component={BigRip} durationInFrames={DUR_BIGRIP} fps={30} width={1920} height={1080} />
    <Still id="ThumbBigRip" component={ThumbBigRip} width={1920} height={1080} />
    <Still id="ThumbBigRipRasgo" component={ThumbBigRipRasgo} width={1920} height={1080} />
    <Composition id="MarteRadiacao" component={MarteRadiacao} durationInFrames={DUR_MARTE} fps={30} width={1080} height={1920} />
    <Composition id="SolAviao" component={SolAviao} durationInFrames={DUR_SOLAVIAO} fps={30} width={1080} height={1920} />
    <Composition id="Tsunami" component={Tsunami} durationInFrames={DUR_TSUNAMI} fps={30} width={1080} height={1920} />
  </>
);
