
import { Student, GroupName } from './types';

const rawData = [
  ["A", "ABDULLAHI IBRAHIM ALI"], ["A", "ABDI ADAN HASSAN"], ["A", "MOHAMED MUSTAF IBRAHIM"], ["A", "MOHAMED NOR IBRAHIM"], ["A", "YUUSUF AADAN ALI"], ["A", "SACIID OSMAN AHMED"], ["A", "ABDISALAN ABDIRAHMAN"], ["A", "ABDIRAHMAN BASHIR MOHAMED"],
  ["B", "AHMED ALI MOHAMOUD"], ["B", "MOHAMED MAYOW ABDI"], ["B", "MOHAMUD MOHAMED NOR"], ["B", "ABDIRAHIN MOHAMOUD SAMMAAN"], ["B", "YOUSUF MOHAMED ALI"], ["B", "ADOW ALI HASSAN"], ["B", "HASSAN MOHAMED NOR"], ["B", "MASLAH ADAM HASSAN"], ["B", "ALI MOHAMED ALI"], ["B", "ADAM MOHAMOUD ABDIRAHMAN"], ["B", "MAXAMED NORDIN XAJI"],
  ["C", "AMIR ABBAS OMAR"], ["C", "ABDINOR ABDULAHI ISGOWE"], ["C", "ISSE HUSSEIN IBRAHIM"], ["C", "ABDIRAHMAN IDRIS ABDIDHAQTAR"], ["C", "SULIEMAN MUKTAR ABDI"], ["C", "ABDISALAN NUUX MOHAMOUD"], ["C", "HUSSEIN HASSAN IBRAHIM"], ["C", "YUUSUF XASAN ABUUKAR"],
  ["E", "ABDI ABDULLAHI MOHAMED"], ["E", "MOHAMED DEEQ ALI ABDI"], ["E", "ABDINASIR HUSSEIN ISSACK"], ["E", "MAZIN HASSAN MOHAMUD"], ["E", "HASSAN MOHAMUD HASSAN"], ["E", "ABDUWAHID ASED MOHAMUD"], ["E", "AHMED ADAN DHAYOW"], ["E", "ABDULLAHI FARAH WEHLIYE"],
  ["F", "MAHAMUD JELE"], ["F", "MAHAMED NUR AXMED"], ["F", "YACQUUN ADAN OSMAN"], ["F", "ABDIQANI AXMED"], ["F", "IBRAHIM MAHAMED"], ["F", "MAHAMED ABDI KARIN ABDOW"], ["F", "ABDISALAN HAMID HUSEN"], ["F", "ABDIKARIN AWIL MUKHTAR"], ["F", "MAHAD KEROW HASAN"],
  ["G", "ALIKHEER AADAN MAXAMED C/LAAHI"], ["G", "MASLAX CUMAR MUUSE MAXAMED"], ["G", "AYUB HASSAN IBRAAHIM"], ["G", "MOWLID ISSE RINJELE"], ["G", "ABDIRAHMAN AHMED ABDIRAHMAN"], ["G", "ABDAZIIZ IIDOW ALI"], ["G", "ABDIQANI ABDISALAM MOHAMED"], ["G", "SAABIR ABUUKAR AADAN"], ["G", "MOHAMED ABDUQAADIR MUKHTAAR"], ["G", "ABDI AADAN XASAN"],
  ["H", "RAHMO ABDULKADIR HUSSEIN"], ["H", "SUMEYA HUSSEIN DAHIR"], ["H", "IDIL ABDIKHADAR ABDISHIRE"], ["H", "MAANDEEQ ALI YAROW"], ["H", "IFRAH ABUKAR SHEIK"], ["H", "ZAMZAM"]
];

export const INITIAL_STUDENTS: Student[] = rawData.map((item, index) => {
  const group = item[0] as GroupName;
  const name = item[1];
  // Group H is for girls, others for boys
  const isFemale = group === 'H';
  
  // Using Dicebear Personas style which has distinct male/female vibes based on seeds
  // Prefixing seed with gender string to nudge the generator
  const avatarSeed = isFemale ? `female_${name}` : `male_${name}`;
  
  return {
    id: `s-${index}`,
    group: group,
    name: name,
    avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=f1f5f9`
  };
});

export const GROUPS: GroupName[] = ['A', 'B', 'C', 'E', 'F', 'G', 'H'];
