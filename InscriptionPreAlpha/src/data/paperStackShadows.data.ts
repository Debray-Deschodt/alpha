const shadows = [
  {
    top: 20,
    left: 28,
    size: 10,
    initSpread : 22,
    spread: 50,
    rotate: 155,
    relativeShadowPos : 3,
    id: 'firstShadow'
  },
  {
    top: 22,
    left: 46.5,
    size: 7,
    initSpread : 16,
    spread:0,
    rotate: 250,
    relativeShadowPos : 3,
    id: 'secondShadow'
  },
     {
    top: 33.3,
    left: 44.7,
    size: 7,
    initSpread : 40,
    spread: 114,
    rotate: 270,
    relativeShadowPos : 4,
    id: 'thirdShadow'
  },
  {
    top: 32,
    left: 23,
    size: 7,
    initSpread : 39,
    spread: 114,
    rotate: 90,
    relativeShadowPos : 2,
    id: 'fourthShadow'
  },
  {
    top: 42,
    left: 27,
    size: 8,
    initSpread : 40,
    spread: 40,
    rotate: 50,
    relativeShadowPos : 4,
    id: 'fifthShadow'
  },
]

const virtualShadows = [
    {
        posX: 41,
        posY: 17,
        shadowType: 1,
        shadowCorrection: 55,
        index: 0
    },
    {
        posX: 61,
        posY: 18,
        shadowType: 2,
        shadowCorrection: 130,
        index: 1
    },
    {
        posX: 60,
        posY: 30,
        shadowType: 2,
        shadowCorrection: 85,
        index: 2
    },
    {
        posX: 40,
        posY: 30,
        shadowType: 3,
        shadowCorrection: 275,
        index: 3
    },
    {
        posX: 41,
        posY: 43,
        shadowType: 3,
        shadowCorrection: 290,
        index: 4
    },
]

export {shadows as dataShadows, virtualShadows as dataVirtualShadows }