export const waypoints = [
  {
    'id': 'TW1',
    'name': '台灣高雄',
    'position': '559.64 165.54',
    'cumulativePortion': 0,
    'scale': 1
  },
  {
    'id': 'HK',
    'name': '香港',
    'position': '546.99 166.77',
    'cumulativePortion': 0.0347, 
    'scale': 1.5
  },
  {
    'id': 'MOS',
    'name': '模里西斯',
    'position': '442.01 242.19',
    'cumulativePortion': 0.387,
    'scale': 1.5 
  },
  {
    'id': 'IO1',
    'name': '東經66度，北緯6度',
    'position': '458.43 199.58',
    'cumulativePortion': 0.512,
    'scale': 2 
  },
  {
    'id': 'IO2',
    'name': '東經55度，北緯6度',
    'position': '436.62 199.34', 
    'cumulativePortion': 0.572, 
    'scale': 2 
  },
  { 
    'id': 'IO3',
    'name': '東經57度，北緯6度', 
    'position': '436.62 200',
    'cumulativePortion': 0.573, 
    'scale': 2
  },
  {
    'id': 'IO4',
    'name': '東經48度，北緯5度',
    'position': '422.60 200.32', 
    'cumulativePortion': 0.612, 
    'scale': 2 
  },
  {
    'id': 'HOB',
    'name': 'Hobyo',
    'position': '426.12 197.13',
    'cumulativePortion': 0.625, 
    'scale': 1.5 
  },
  {
    'id': 'TW2',
    'name': '台灣高雄',
    'position': '559.64 165.54',
    'cumulativePortion': 1,
    'scale': 1
  }
]

const startWaypoint = {
  'id': 'Start',
  'position': '344.5 165.91',
  'cumulativePortion': 0,
  'scale': 1
}

const finalWaypoint = {
  'id': 'Final',
  'position': '344.5 165.91',
  'cumulativePortion': 1,
  'scale': 1
}

function getWaypointWithId() {
  var waypointMapId = {}
  var point
  for (var i = 0; i < waypoints.length; i++) {
    point = waypoints[i]
    waypointMapId[point['id']] = point
  }
  waypointMapId[finalWaypoint['id']] = finalWaypoint
  waypointMapId[startWaypoint['id']] = startWaypoint
  return waypointMapId
}

export const waypointsWithId = getWaypointWithId() 

export const content = [ 
  {
    title: 'Naham3號的行走路徑，船員們1,672天囚禁地圖',
    description: '台資阿曼籍Naham3漁船上，有29名來自6國的船員，他們為台灣遠洋漁業服務，卻遭海盜劫持1,672天。',
    waypoint: waypointsWithId['Start']
  },
  {
    title: '關於Naham3號',
    description: '這艘Naham3號有個複雜的身世：它登記在阿拉伯半島東南沿海的國家阿曼（Oman），登記的負責人應是位中國人，卻由台灣人出資。把船掛在管理鬆散甚至亳無監理能力的國家，是降低成本、惡意過撈最佳的掩護。',
    image: 'naham3',
    waypoint: waypointsWithId['TW1']
  },
  {
    date: '2011.12.23',
    event: '沈瑞章自高雄小港搭機至香港，再轉機至模里西斯',
    waypoint: waypointsWithId['HK']
  },
  {
    date: '2011.12.30',
    event: '到了模里西斯的沈瑞章，搭日本籍轉載船，登上Naham3漁船',
    waypoint: waypointsWithId['MOS']
  },
  {
    date: '2012.01.03 ~ 2012.03.16',
    event: 'Naham3在東經66度、北緯6度的印度洋上作業',
    waypoint: waypointsWithId['IO1']
  },
  {
    date: '2012.03.16 ~ 2012.03.25',
    event: 'Naham3接獲船東衛星電話，指示前往別處抓黑鮪魚。沈瑞章與船員認為該海域海盜多，建議離開',
    waypoint: waypointsWithId['IO2']
  },
  {
    date: '2012.03.26',
    event: '船東兒子洪振能要求在東經57度停船捕魚',
    waypoint: waypointsWithId['IO3']
  },
  {
    date: '2012.03.27',
    event: '凌晨遭11位海盜以兩艘小艇，持衝鋒槍掃射襲擊，船長當場死亡，後來船員們在塞席爾（Seychelles）南方遭劫持',
  },
  {
    date: '2012.03.27 ~ 2012.09',
    event: '海盜將船開往索馬利亞海域，至霍比奧（Hobyo）附近，海盜查出此艘船原來掛籍在阿拉伯半島上的阿曼',
    waypoint: waypointsWithId['IO4']
  },
  {
    date: '2012.09 ~ 2012.12.24',
    event: '9月海盜透過中國籍輪機長與船東聯繫，開始談判，經過2個月談判最終破裂無進展',
    waypoint: waypointsWithId['HOB']
  },
  {
    date: '2014 ~ 2015',
    event: '沈瑞章向外交部網站求援，2015年人質影片流出，海盜手持衝鋒槍與火箭筒直指人質；日後才得知Naham3是台資漁船'
  },
  {
    date: '2012.03.27 ~ 2016.10.22',
    event: '26名船員歷經了1,672天的監禁，過程中兩名漁工病死；船員於2016年獲救，沈瑞章才得以回到國內',
    waypoint: waypointsWithId['TW2']
  },
  {
    date: '2017',
    event: '沈瑞章向漁業署、勞動部、監察院等申訴政府未積極提供協助'
  },
  {
    date: '2018.11',
    event: '沈瑞章以民事訴訟控告船東洪高雄，二審民事判決定讞 ，船東賠償沈瑞章被挾期間內的部分薪資；柬國、印尼、菲律賓漁工仍未拿到補償',
    waypoint: waypointsWithId['Final']
  }
]
