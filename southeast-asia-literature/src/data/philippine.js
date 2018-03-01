import audioPath from '../../static/audio/audio-philippine.mp3'
import mobileImage from '../../static/image/mobile-philippine-768x768.jpg'
import tabletImage from '../../static/image/tablet-philippine-1024x1024.jpg'

const interview = [
  {
    question: 'Q1. 對你來說馬尼拉最迷人的特質是什麼？最讓你不喜歡的又是什麼？',
    answer: ['我覺得馬尼拉最迷人的特點，是具有壁毯般的質地：此刻你在繁華的市中心商業區，下一刻你又身處正對馬尼拉港的寬闊公園；在紅燈區的隔壁，又緊鄰著數百年歷史的教堂。對一個開發中國家來說，擁有幾間全球最大的購物中心是一件驚人的事。至今我未曾見過一座城市像馬尼拉一樣這麼亢奮，就像永遠不寐的不夜城。這裡無時無刻都有事情正在發生，我想這也是我不愛城市的原因，永遠塞車、芳鄰深夜引吭高歌卡拉 OK 也旁若無人，只有一段時間，那就是在復活節前一週才會靜下來，就連車水馬龍的EDSA大道也奇蹟般地門可羅雀。'],
  },
  {
    question: 'Q2. 你的詩裡有某些永恆的概念，例如〈廿一則斷片的家屋史〉裡未曾離開的女主人、〈延遲〉裡死者手中的時間無窮無盡，如果在世上選一件最能代表永恆的事，你覺得是什麼？',
    answer: ['我認為世間最永恆的一件事是「希望」，只要抱持希望，我們便能擱置生命的有限性，畢竟人類只是在世間短暫停留的物種。相信凡事都會好轉的信念，使我們振奮地迎接新的每一天。正因如此，即使名氣漸朽，詩人也會繼續創作；儘管時光荏苒，愛侶們也會宣示彼此不滅的情感。這使我意識到，當我們突然之間對任何事都不抱希望時還蠻可怕的。'],
  },
  {
    question: 'Q3. 童年的哀傷是你詩作談論的重點之一，你是何時知道自己長大了？知道自己有勇氣承擔哀傷了呢？',
    answer: ['我外婆帶我長大，她是世上我最深愛的人。當她被緊急送醫陷入昏迷時，我相信她會度過難關，不過那之後，她像一個老當益壯的女人出現在我夢裡，平和安詳、聖光環繞。當我陷入對她的思念時，我哭著醒來，幾天後，她便往生了，就像她等著向我道別一樣。在那時我長大了，開始懂得承受悲傷，並且接受這樣的事實：終其一生，我們會以各種方式失去摯愛的人。'],
  },
  {
    question: 'Q4. 你提到寫作是人們掌握命運的方法之一，在什麼情況下你有過寫作改變了自己的領悟？',
    answer: ['我家境不好，念公立學校，爸媽無法給我太多幫助。大學時，我只能有兩套制服，但我運用文字的天賦，其他人也多少發現了。接下來我贏得了徵文比賽，有寫詩的、有寫書的，我體認到這可能是我擺脫貧窮的方法，並以此改變我的命運。如果寫詩這件事未曾降臨在我的生命中，我難以想像此刻的我將以何種方式過活。我無法坦言生活已走出困境，但寫作給了我信心，讓我想像和原生家庭不一樣的生活，單純透過寫詩，我得以確認自己在世界上的位置。我想書寫、創作是我人生向前走的願景吧。'],
  },
  {
    question: 'Q5. 你的詩句中常提及植物和氣味，你能談談最喜歡什麼植物嗎？通常怎麼選擇這些材料入詩？',
    answer: ['儘管家境簡樸，我們依然在家的窗臺上種些盆栽。我外婆就是綠手指，凡經她手，欣欣向榮。茉莉花是我最愛的，在我的語言把它叫做「sampaguita」，它有小而潔白的花瓣，甚至在還只是蓓蕾時，就充滿濃郁的芬芳。它們像聚在枝頭上的小星星，掉落時我會將他們一頁一頁壓在書裡，當他們變成乾燥花時，香氣好像也未曾消散一樣，我喜歡這種讓花朵永生的做法，也許你也可說茉莉花是世上眾多永恆的事物中，我們有幸能獲得的一種。'],
  },
]

const audio = {
  id: 'philippine',
  audioSrc: audioPath,
  translator: ['劉維人'],
  title: {
    chinese: '〈二十一則斷片的家屋史〉',
    origin: '〈History of a House in 21 Fragments〉',
  },
  letter: {
    chinese: [
      'i<br />這棟 bahay na bato (踏著木腿，披著石衣) ——<br />兩層樓撐在樑柱上——斜斜地<br />面向東方，讓朝日的光芒',
      'ii<br />在褐牆內的木隔板之間來回搖晃。<br />百葉簾將窗面刻成溝槽，使得整棟房舍<br />更能一眼看穿，讓人聯想到',
      'iii<br />多孔的樹幹。在那裏你可以看見移動的軀體<br />被簾板乾淨地一條條切開，彷彿以自己的意志<br />做出許多決定。如果你仔細研究',
      'iv<br />也許會發現一些平凡的東西，跨越了邊界。<br />過去一個終日無所事事的男孩，<br />傾身探進屋中，瞥見肉身順服於',
      'v<br />清澄大水的沖襲。在窗櫺上<br />有幾盆sampaguita和奧勒岡，將葉子扔在<br />捧著鐵鏽與乾硬貓屎的',
      'vi<br />一樓屋頂上。那位男孩拿起了掃把<br />掃去一切穢物，告訴世界<br />他已準備好被侮辱。除了這些小把戲',
      'vii<br />他還能有什麼伎倆可耍？天空永無止盡地<br />將焦慮傾倒而下，穿越破紋、孔洞、裂縫，填滿一切<br />只餘留地板下的空間。當你伸出手爪',
      'viii<br />掀開木條，你便看見裡面的塵球、<br />白蠍子、金屬箔絲。男孩獨自一人<br />繼續挖掘，挖出失去同伴的耳環、',
      'ix<br />上個世紀的郵票、Bagong Lipunan 的硬幣。這棟屋子裡<br />沒有東西會被丟掉，於是每一件事物<br />都難以尋找：找不著一雙成對的襪子、找不著',
      'x.<br />那條乳牛印花浴巾、找不著叔叔的珍貴戒指。戒指是不見了<br />還是典當了？耶穌的目光會陪伴著你<br />一同搜尋，在樓梯旁的牆邊',
      'xi<br />找到遺失的原因。家中的鏡子負責所有的敘事<br />但只在事件發生的時候吐出言語，從來不會分享<br />它過去的回憶。正如它年老的女主人',
      'xii<br />希望遺忘自己的過去。在那些破損的家具之間<br />鏡子是最有智慧的成員，總是方方正正地<br />把危險的時刻與凶險的未來',
      'xiii<br />一幅一幅接連顯現：在那場火災，當女主人看見<br />遠方的火焰掀起羽翼，氣定神閒地打包她那幾件<br />所剩無幾的細軟——多年未穿的衣裳、大鐵罐裡的',
      'xiv<br />裁縫粉餅與織線。鏡子映出的錯誤從未比真實更多。<br />拿著開山刀和鐵橇的工人<br />拔去釘子、砸爛地基，大力掄起槌子',
      'xv.<br />往每面牆上揮去，整棟房子坍成瓦礫。<br />容納更多天空與鄰居的眼睛，讓吹過的風<br />形狀更為有機，不必再與',
      'xvi<br />不懈的日光，爭奪<br />昔日一百五十平方公尺的領地。過去的居民<br />如今已爬上貨車，在擁擠的床褥、咖啡機、',
      'xvii.<br />縫紉機——在任何一件可能帶來富貴的物事中<br />揚長而去——傻傻地相信<br />各自分居公寓',
      'xvii<br />與貧民窟似的大樓之後，便能重逢好運。<br />不到一天的功夫，家屋便化為<br />一堆廢品，具體的住處淪為原型的地景，',
      'xix<br />再也撐不起任何重量、任何細節。它全新的自由<br />正如它古遠的過去，讓天空佔據此地<br />成為唯一的爐灶，將整個地方蓋在圓頂之下',
      'xx.<br />照耀著永不散逸的光芒。如今你走進其中一間房，<br />另一間就會消失，就像纖細的夢一樣<br />盪回你的頭顱後方。如果再靠近點',
      'xxi.<br />放大細節，你就能看見家具如今都裹了金箔<br />鏡子全都不再反光。失落的戒指<br />回到原地，只有老婦人從未離去。',
    ],
    // origin: [
    //   'I.<br />Here was the bahay na bato (wooden legs, stone skirt)—<br />Two floors held standing by post and lintel—facing<br />Obliquely to the east, so the ascending sun flickered<br />',
    //   'II.<br />Between the clapboard slats of its brown walls.<br />The windows, louvered, slotted into grooves, adding<br />Further transparency to the house, likewise recalled<br />',
    //   'III.<br />The porousness of wood. You could see passing bodies<br />Sliced neatly by spaces between panels and exercising<br />Decisions that resembled free will. A careful study<br />',
    //   'IV.<br />Might reveal something ordinary, transgressive.<br />It was the boy who had all the time to observe, leaning<br />Into the floor, getting glimpses of flesh submissive<br />',
    //   'V.<br />To water’s clarifying assault. On the sills of windows,<br />Pots of sampaguita and oregano shedding<br />Their leaves on the jutting first floor roof endowed<br />',
    //   'VI.<br />With rust and hardened excrement of cats. The boy<br />Would broom off the offending material, meaning<br />He was ready to be humiliated by the world. Whose ploy<br />',
    //   'VII.<br />Was it but his own? The sky relentlessly poured<br />Its worry through cracks, holes, slits, missing<br />Nothing but the space under floorboards. Should<br />',
    //   'VIII.<br />You claw open the slats, you would see balls of dust,<br />White scorpions, strips of foil. The boy, conducting<br />',
    //   'IX.<br />Decade’s stamps, Bagong Lipunan coins. It was a house<br />Where nothing was ever thrown out, making everything<br />Difficult to find: matching pair of socks, towel with cow<br />',
    //   'X.<br />Print, a precious ring of uncle. Was the ring lost or pawned?<br />But Jesus Who Follows You with His Gaze surveying<br />From the wall near the stairs would have known<br />',
    //   'XI.<br />The culprit. The mirror, however, did all the talking,<br />But only in the span of the event, never sharing<br />In retrospect. It was the old woman’s, deflecting<br />',
    //   'XII.<br />What it wished to forget. Among the broken furniture,<br />The mirror had the most wisdom, rectangularly revealing<br />The moment by moment crisis, the terrible future<br />',
    //   'XIII.<br />Awaiting the house: fire. When she saw plumes of distant<br />Smoke, she assuredly packed her meager belongings—<br />Dresses unworn through the years, a large metal can<br />',
    //   'XIV.<br />Of tailor’s chalk, threads. The mirror was never more wrong.<br />Workers armed with machetes and crowbars, loosening<br />Nails, smashing foundations, swinging their strong<br />',
    //   'XV.<br />Hammer force on every surface, made the house cave in.<br />The house opened to more sky and neighbors’ eyes, letting<br />The wind to have a more organic shape, not countering<br />',
    //   'XVI.<br />The sun’s unremitting claim on 150 square meters<br />Of once sovereign space. By then, its dwellers were riding<br />In a cargo truck, jostling with beds, coffee makers,<br />',
    //   'XVII.<br />Sewing machines—anything to see all of them<br />To a more fortunate life—foolishly investing<br />Their faith on separate dwellings in apartments,<br />',
    //   'XVIII.<br />Condominiums, almost shanties. In less than a day,<br />The house was sequestered in junk shops, transitioning<br />From the actual to the archetypal, which is to say<br />',
    //   'XIX.<br />It is no longer load-bearing, site-specific. Its freedom<br />Resembles nothing of its old self, allowing<br />The sky to claim it as its singular hearth, domed<br />',
    //   'XX.<br />With a perpetual glow that will never leak. Once a room<br />Is entered, another disappears, swinging<br />At the back of the head like a slim dream. Zoom<br />',
    //   'XXI.<br />Further in and you see the furniture gold-leafed,<br />All the mirrors opaque. The once lost ring<br />Is returned. Only the old woman has never left.<br />',
    // ],
  },
  lang: 'philippine',
}

const author = {
  image: {
    mobile: mobileImage,
    tablet: tabletImage,
    desktop: mobileImage,
  },
  nameChinese: '卡羅瑪・雅康吉・戴歐納',
  nameOrigin: 'CARLOMAR ARCANGEL DAOANA',
  country: '菲律賓',
  description: '1979 年出生於菲律賓馬尼拉。大學於聖多瑪斯大學（Royal and Pontifical University of Santo Tomas）主修文學，曾出版四本詩集，其中最新作品為 2014 年由聖多瑪斯大學出版的《Loose Tongue: Poems 2001-2013》。詩作曾收錄於《Vagabond Asia Pacific Poetry Series》和《Naratif Kisah》等國際出版物當中。現擔任《菲律賓星報》（The Philippine Star）藝術與文化版面的專欄作家，同時也任教於馬尼拉亞典耀大學（Ateneo de Manila University）藝術學系，教授詩歌、藝術評論及其他課程。',
}

export default {
  author,
  audio,
  interview,
}
