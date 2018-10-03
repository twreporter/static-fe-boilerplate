import script1 from './script-1.json' // 老人
import script2 from './script-2.json' // 中年家庭
import script3 from './script-3.json' // 年輕人
import script4 from './script-4.json' // 房東
import script5 from './script-5.json' // 房仲
import illustration1 from './illustration-1.js'
import illustration2 from './illustration-2.js'
import illustration3 from './illustration-3.js'
import illustration4 from './illustration-4.js'
import illustration5 from './illustration-5.js'
import metaInfo1 from './meta-1.json'
import metaInfo2 from './meta-2.json'
import metaInfo3 from './meta-3.json'
import metaInfo4 from './meta-4.json'
import metaInfo5 from './meta-5.json'
import utilTXT from './conversation-util-text'
import scriptTXT1 from './script-text1.json'
import scriptTXT2 from './script-text2.json'
import scriptTXT3 from './script-text3.json'
import scriptTXT4 from './script-text4.json'
import scriptTXT5 from './script-text5.json'

// TODO: 改為 object-oriented, 如下：
// oldMan = {
//  script: "script-1",
//  illustration: "illustration2"    
// }

export const scripts = {
  "script-1": script1,
  "script-2": script2,
  "script-3": script3,
  "script-4": script4,
  "script-5": script5,
}

export const scriptText = {
  "util-text": utilTXT,
  "script-1": scriptTXT1,
  "script-2": scriptTXT2,
  "script-3": scriptTXT3,
  "script-4": scriptTXT4,
  "script-5": scriptTXT5,
}

export const illustrations = {
  "script-1": illustration1,
  "script-2": illustration2,
  "script-3": illustration3,
  "script-4": illustration4,
  "script-5": illustration5
}

export const meta = {
  "script-1": metaInfo1,
  "script-2": metaInfo2,
  "script-3": metaInfo3,
  "script-4": metaInfo4,
  "script-5": metaInfo5,
}