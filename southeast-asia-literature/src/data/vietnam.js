/* eslint max-len: 0 */
import audioPath from '../../static/audio/audio-vietnam.mp3'
import mobileImage from '../../static/image/mobile-vietnam-768x768.jpg'
import tabletImage from '../../static/image/tablet-vietnam-1024x1024.jpg'

const interview = [
  {
    question: 'Q1. 河內這座城市是否帶給你創作靈感？',
    answer: ['河內是個古老的城市，已過一千多年歲數。但對我而言，這個城市很年輕，因為它就是我的青春年華。我熟悉河內的每一間房子、每一個街角。除了從軍在抗美戰場的時間，我不曾離開河內多過一個月。如果不呼吸河內的空氣和生活，我無法工作，甚至無法寫一張紙。'],
  },
  {
    question: 'Q2. 身為一個從戰爭回來的人，能不能和我們聊聊你心中的烏托邦？',
    answer: ['在越南，烏托邦不是一個普遍的概念，我對此概念也不是了解得很詳盡。是不是就如天堂一般，是人們對一片幸福之地的夢想？身為一名從戰場回來的士兵，當然我對大的願望是我的國家永遠和平，有和平才有幸福。'],
  },
  {
    question: 'Q3. 你和家人或晚輩聊過戰爭的經驗嗎？',
    answer: ['對父母、妻子和兒子，我有跟他們提及我的戰鬥生活，但只一兩次，也只簡約得講。也是很久以前了，當我剛從戰場回來的時候，越到後來我越少提及戰爭的事。現在越南人常說「要讓過去沉睡」，意思是別忘記過去，但也別讓過去阻礙今日的生活。人生的記憶，特別是戰爭的記憶，對我而言，不可能以尋常的言語來述說，而只能通過音樂和文學。'],
  },
  {
    question: 'Q4. 在戰爭中，你最絕望的事是什麼？有沒有遇見過希望？',
    answer: [
      '在戰爭，人們，尤其是戰士，為了存活必須拋棄那些遙遠的希望和夢想，因為希望越多失望越多，甚至絕望。而在戰爭，特別是對美國打戰，如果落入絕望之心態，你難以存活下來，一天也沒辦法。在戰爭，戰士針對每一個具體任務、每一場直接對戰、每一天而思考和行動著。在戰爭，每一天猶如一生，因此人們都活在今天，而明天、後天只是幻影，不該想起。',
      '不過，也有一些時候，戰士們有著希望，例如：當收到家書的時候，當被一首詩或一首歌充滿對和平、對生活的燦爛嚮往所感動著⋯⋯。而比希望更高的是，大多數越南士兵有一個信念，即便自己有可能沒能活到國家和平之時，但越南祖國一定將會趕走外侵軍隊，將會走過戰爭，到達和平生活。',
    ],
  },
  {
    question: 'Q5. 你覺得戰爭的味道像什麼？',
    answer: ['由於多年在熱帶雨林戰鬥，所以對我而言，在陣雨中飄起濃郁的濕土和樹葉混合的味道就是最讓我想起戰爭的味道。'],
  },
  {
    question: 'Q6. 假設有時光機，能帶你穿越過去和當年的人重逢：河內收留你的姑娘、康復中心的阿姜、阿秀、光爺、阿鸞和阿海，還有你的媽媽。如果能和他們再說一句話，會是什麼？',
    answer: ['我們的時代是個戰爭時代，充滿災殃和淚水，但也是越南的一個榮光時代，是越南人為國家的獨立而勇敢戰鬥。可以活在那個時代，我們充滿自豪。這就是我想對我的同時期的朋友和晚輩朋友說。'],
  },
]

const audio = {
  id: 'vietnam',
  audioSrc: audioPath,
  translator: ['夏露'],
  title: {
    chinese: '選讀自〈刻舟求劍〉',
    origin: '〈khắc dấu mạn thuyền〉',
  },
  letter: {
    chinese: [
      '我這一生，也算走南闖北，去過不少地方，但去首都河內的次數卻極其有限。印象中，總共就去過四次，一次是小時候，一次是抗美戰爭時期服役時，然後戰爭結束後又去過兩次。所以，我對河內的印象並不深刻，除了大家都熟悉的市中心的還劍湖以及著名的龍編橋外，我大概就只對草市火車站和其中一條通電車的街道略有記憶。然而，奇特的是，那一條街道給我留下了永生難忘的印象。每當我閉上眼睛回首往事時，腦海裡總浮現出那街道的模模糊糊的影子，感覺那個遙遠而陌生的城市，就像曾經長久生活過的一片最親愛的土地，靜靜地融進了我的生命裡。這彷彿是一種毫無來由的愛戀，一種說不清的情懷，一種十分飄渺的感覺，又像是我青年時代的一股揮之不去的淡淡憂愁。如今，雖然我的青春早已和戰爭一道留在了記憶深處，可那些往事，包括那天的風聲、雨聲和樹葉飄零的聲音，都還時時縈繞在我的生活裡。',
    ],
    // origin: [
    //   'Đời tôi, đi đây đó đã nhiều, nhưng lại rất hiếm dịp được thấy Hà Nội. Chỉ một lần thuở bé, rồi một lần hồi chiến tranh, và mấy năm sau này thêm đôi lần nữa. Thành thử, ở Hà Nội, ngoài hồ Hoàn Kiếm với cầu Long Biên, tôi chỉ đại khái biết một ngôi nhà là nhà ga Hàng Cỏ và một con đường là đường xe điện. Nhưng, mặc dù như vậy, mỗi khi nhắm mắt lại nhìn sâu vào những nẻo đường của ký ức, bao giờ tôi cũng thấy hiện lên, tuy rất đỗi mơ hồ, bóng dáng của Hà Nội phố xá. Cái thành phố sâu thẳm, xa lạ, chẳng chút thân thuộc ấy, từ lâu lắm rồi đã lẳng lặng ăn vào đời tôi như là một trong những miền đất thân yêu nhất, dẫu rằng đấy là một tình thân yêu tưởng như không đâu, một duyên nợ hầu như vô cớ. Không hẳn là một nỗi niềm mà chỉ là bâng quơ một cảm giác, không thành một câu chuyện mà chỉ như là một nốt sầu còn vương lại của thời trai trẻ chiến tranh, một thời tuổi trẻ đã hoàn toàn mai một nhưng dư âm vọng suốt đời. Như tiếng mưa rơi. Như tiếng gió lùa. Như tiếng lá rụng. Mà không bao giờ quên.',
    // ],
  },
  lang: 'vietnamese',
}

const author = {
  image: {
    mobile: mobileImage,
    tablet: tabletImage,
    desktop: mobileImage,
  },
  nameChinese: '保寧',
  nameOrigin: 'BẢO NINH',
  country: '越南',
  description: '1952 年生於越南河內，1969 年加入專門招募年輕人的二七青年旅（27th Youth Brigade），過了六年軍旅生活，越戰結束後才退伍，五百多人的部隊只有十名士兵存活，而他是其一。其首部長篇小說《青春的悲愴》（The Sorrow of War，又譯《戰爭哀歌》）於 1991 年出版，共翻譯成 15 種語言。1994 年獲得英國獨立報外國小說獎（The Independent Foreign Fiction Award），為當今世界文壇最具代表性的越南作家之一。',
}

export default {
  author,
  audio,
  interview,
}
