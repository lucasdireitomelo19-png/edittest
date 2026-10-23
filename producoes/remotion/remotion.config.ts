import {Config} from '@remotion/cli/config';
import fs from 'fs';

// No ambiente da nuvem o Chromium já vem instalado; usar ele em vez de baixar outro.
const CHROME = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (fs.existsSync(CHROME)) Config.setBrowserExecutable(CHROME);
Config.setVideoImageFormat('jpeg');
Config.setCrf(20);
