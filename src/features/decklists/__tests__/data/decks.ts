type TestDeck = {
  desc: string;
  deckList: string;
  data: { count: number; name: string; set?: string; setNumber?: string }[];
};

const decks: TestDeck[] = [
  {
    desc: 'English Gholdengo decklist',
    deckList: `
        Pokémon: 15
        3 Gimmighoul SSP 97
        1 Gimmighoul PAR 87
        4 Gholdengo ex PAR 139
        2 Lunatone MEG 74
        2 Solrock MEG 75
        1 Genesect ex BLK 67
        1 Fezandipiti ex SFA 38
        1 Hop's Cramorant JTG 138
            
        Trainer: 34
        4 Arven OBF 186
        4 Boss's Orders MEG 114
        2 Professor Turo's Scenario PAR 171
        1 Team Rocket's Petrel DRI 176
        4 Superior Energy Retrieval PAL 189
        3 Nest Ball SVI 181
        3 Buddy-Buddy Poffin TEF 144
        3 Earthen Vessel PAR 163
        2 Fighting Gong MEG 116
        1 Ultra Ball MEG 131
        1 Super Rod PAL 188
        1 Picnic Basket SVI 184
        1 Secret Box TWM 163
        2 Air Balloon BLK 79
        1 Vitality Band SVI 197
        1 Artazon PAL 171
            
        Energy: 11
        8 Fighting Energy MEE 6
        3 Metal Energy MEE 8
        `,
    data: [
      { count: 3, name: 'Gimmighoul', set: 'SSP', setNumber: '097' },
      { count: 1, name: 'Gimmighoul', set: 'PAR', setNumber: '087' },
      { count: 4, name: 'Gholdengo ex', set: 'PAR', setNumber: '139' },
      { count: 2, name: 'Lunatone', set: 'MEG', setNumber: '074' },
      { count: 2, name: 'Solrock', set: 'MEG', setNumber: '075' },
      { count: 1, name: 'Genesect ex', set: 'BLK', setNumber: '067' },
      { count: 1, name: 'Fezandipiti ex', set: 'SFA', setNumber: '038' },
      { count: 1, name: "Hop's Cramorant", set: 'JTG', setNumber: '138' },
      { count: 4, name: 'Arven', set: 'OBF', setNumber: '186' },
      { count: 4, name: "Boss's Orders", set: 'MEG', setNumber: '114' },
      { count: 2, name: "Professor Turo's Scenario", set: 'PAR', setNumber: '171' },
      { count: 1, name: "Team Rocket's Petrel", set: 'DRI', setNumber: '176' },
      { count: 4, name: 'Superior Energy Retrieval', set: 'PAL', setNumber: '189' },
      { count: 3, name: 'Nest Ball', set: 'SVI', setNumber: '181' },
      { count: 3, name: 'Buddy-Buddy Poffin', set: 'TEF', setNumber: '144' },
      { count: 3, name: 'Earthen Vessel', set: 'PAR', setNumber: '163' },
      { count: 2, name: 'Fighting Gong', set: 'MEG', setNumber: '116' },
      { count: 1, name: 'Ultra Ball', set: 'MEG', setNumber: '131' },
      { count: 1, name: 'Super Rod', set: 'PAL', setNumber: '188' },
      { count: 1, name: 'Picnic Basket', set: 'SVI', setNumber: '184' },
      { count: 1, name: 'Secret Box', set: 'TWM', setNumber: '163' },
      { count: 2, name: 'Air Balloon', set: 'BLK', setNumber: '079' },
      { count: 1, name: 'Vitality Band', set: 'SVI', setNumber: '197' },
      { count: 1, name: 'Artazon', set: 'PAL', setNumber: '171' },
      { count: 8, name: 'Fighting Energy', set: 'MEE', setNumber: '006' },
      { count: 3, name: 'Metal Energy', set: 'MEE', setNumber: '008' },
    ],
  },
  {
    desc: 'English Gholdengo, some cards without set info',
    deckList: `
        Pokémon: 15
        3 Gimmighoul SSP 97
        1 Gimmighoul PAR 87
        4 Gholdengo ex PAR 139
        2 Lunatone MEG 74
        2 Solrock MEG 75
        1 Genesect ex BLK 67
        1 Fezandipiti ex SFA 38
        1 Hop's Cramorant JTG 138
            
        Trainer: 34
        4 Arven OBF 186
        4 Boss's Orders MEG 114
        2 Professor Turo's Scenario PAR 171
        1 Team Rocket's Petrel DRI 176
        4 Superior Energy Retrieval PAL 189
        3 Nest Ball
        3 Buddy-Buddy Poffin TEF 144
        3 Earthen Vessel 
        2 Fighting Gong MEG 116
        1 Ultra Ball 
        1 Super Rod PAL 188
        1 Picnic Basket SVI 184
        1 Secret Box TWM 163
        2 Air Balloon BLK 79
        1 Vitality Band SVI 197
        1 Artazon PAL 171
            
        Energy: 11
        8 Fighting Energy 
        3 Metal Energy MEE 8
        `,
    data: [
      { count: 3, name: 'Gimmighoul', set: 'SSP', setNumber: '097' },
      { count: 1, name: 'Gimmighoul', set: 'PAR', setNumber: '087' },
      { count: 4, name: 'Gholdengo ex', set: 'PAR', setNumber: '139' },
      { count: 2, name: 'Lunatone', set: 'MEG', setNumber: '074' },
      { count: 2, name: 'Solrock', set: 'MEG', setNumber: '075' },
      { count: 1, name: 'Genesect ex', set: 'BLK', setNumber: '067' },
      { count: 1, name: 'Fezandipiti ex', set: 'SFA', setNumber: '038' },
      { count: 1, name: "Hop's Cramorant", set: 'JTG', setNumber: '138' },
      { count: 4, name: 'Arven', set: 'OBF', setNumber: '186' },
      { count: 4, name: "Boss's Orders", set: 'MEG', setNumber: '114' },
      { count: 2, name: "Professor Turo's Scenario", set: 'PAR', setNumber: '171' },
      { count: 1, name: "Team Rocket's Petrel", set: 'DRI', setNumber: '176' },
      { count: 4, name: 'Superior Energy Retrieval', set: 'PAL', setNumber: '189' },
      { count: 3, name: 'Nest Ball' },
      { count: 3, name: 'Buddy-Buddy Poffin', set: 'TEF', setNumber: '144' },
      { count: 3, name: 'Earthen Vessel' },
      { count: 2, name: 'Fighting Gong', set: 'MEG', setNumber: '116' },
      { count: 1, name: 'Ultra Ball' },
      { count: 1, name: 'Super Rod', set: 'PAL', setNumber: '188' },
      { count: 1, name: 'Picnic Basket', set: 'SVI', setNumber: '184' },
      { count: 1, name: 'Secret Box', set: 'TWM', setNumber: '163' },
      { count: 2, name: 'Air Balloon', set: 'BLK', setNumber: '079' },
      { count: 1, name: 'Vitality Band', set: 'SVI', setNumber: '197' },
      { count: 1, name: 'Artazon', set: 'PAL', setNumber: '171' },
      { count: 8, name: 'Fighting Energy' },
      { count: 3, name: 'Metal Energy', set: 'MEE', setNumber: '008' },
    ],
  },
  {
    desc: 'English dragapult decklist',
    deckList: `
        Pokémon: 23
        4 Dreepy TWM 128
        4 Drakloak TWM 129
        2 Dragapult ex TWM 130
        2 Duskull PRE 35
        2 Dusclops PRE 36
        1 Dusknoir PRE 37
        2 Budew PRE 4
        1 Toedscool PAR 16
        1 Toedscruel PAR 17
        1 Shaymin DRI 10
        1 Fezandipiti ex SFA 38
        1 Munkidori TWM 95
        1 Hawlucha SVI 118

        Trainer: 30
        4 Iono PAL 185
        4 Lillie's Determination MEG 119
        2 Boss's Orders MEG 114
        1 Hilda WHT 84
        1 Professor's Research JTG 155
        4 Ultra Ball MEG 131
        4 Buddy-Buddy Poffin TEF 144
        3 Counter Catcher PAR 160
        3 Night Stretcher SFA 61
        1 Enhanced Hammer TWM 148
        1 Air Balloon BLK 79
        1 Jamming Tower 
        1 Artazon PAL 171

        Energy: 7
        3 Luminous Energy 
        2 Psychic Energy MEE 5
        1 Neo Upper Energy TEF 162
        1 Fire Energy MEE 2`,
    data: [
      { count: 4, name: 'Dreepy', set: 'TWM', setNumber: '128' },
      { count: 4, name: 'Drakloak', set: 'TWM', setNumber: '129' },
      { count: 2, name: 'Dragapult ex', set: 'TWM', setNumber: '130' },
      { count: 2, name: 'Duskull', set: 'PRE', setNumber: '035' },
      { count: 2, name: 'Dusclops', set: 'PRE', setNumber: '036' },
      { count: 1, name: 'Dusknoir', set: 'PRE', setNumber: '037' },
      { count: 2, name: 'Budew', set: 'PRE', setNumber: '004' },
      { count: 1, name: 'Toedscool', set: 'PAR', setNumber: '016' },
      { count: 1, name: 'Toedscruel', set: 'PAR', setNumber: '017' },
      { count: 1, name: 'Shaymin', set: 'DRI', setNumber: '010' },
      { count: 1, name: 'Fezandipiti ex', set: 'SFA', setNumber: '038' },
      { count: 1, name: 'Munkidori', set: 'TWM', setNumber: '095' },
      { count: 1, name: 'Hawlucha', set: 'SVI', setNumber: '118' },
      { count: 4, name: 'Iono', set: 'PAL', setNumber: '185' },
      { count: 4, name: "Lillie's Determination", set: 'MEG', setNumber: '119' },
      { count: 2, name: "Boss's Orders", set: 'MEG', setNumber: '114' },
      { count: 1, name: 'Hilda', set: 'WHT', setNumber: '084' },
      { count: 1, name: "Professor's Research", set: 'JTG', setNumber: '155' },
      { count: 4, name: 'Ultra Ball', set: 'MEG', setNumber: '131' },
      { count: 4, name: 'Buddy-Buddy Poffin', set: 'TEF', setNumber: '144' },
      { count: 3, name: 'Counter Catcher', set: 'PAR', setNumber: '160' },
      { count: 3, name: 'Night Stretcher', set: 'SFA', setNumber: '061' },
      { count: 1, name: 'Enhanced Hammer', set: 'TWM', setNumber: '148' },
      { count: 1, name: 'Air Balloon', set: 'BLK', setNumber: '079' },
      { count: 1, name: 'Jamming Tower' },
      { count: 1, name: 'Artazon', set: 'PAL', setNumber: '171' },
      { count: 3, name: 'Luminous Energy' },
      { count: 2, name: 'Psychic Energy', set: 'MEE', setNumber: '005' },
      { count: 1, name: 'Neo Upper Energy', set: 'TEF', setNumber: '162' },
      { count: 1, name: 'Fire Energy', set: 'MEE', setNumber: '002' },
    ],
  },
  {
    desc: 'Portoguese decklist',
    deckList: `
        Pokémon: 10
        1 Hawlucha SVI 118
        4 Dreepy TWM 128 PH
        2 Duskull SFA 18
        1 Fezandipiti ex SFA 38
        2 Budew PRE 4
        4 Drakloak TWM 129 PH
        1 Dusclops SFA 19
        1 Dragapult ex TWM 130
        2 Dusknoir SFA 20
        2 Dragapult ex TWM 200

        Treinador: 18
        2 Boss's Orders RCL 189
        2 Counter Catcher PAR 160
        1 Professor Turo's Scenario PAR 171
        1 Unfair Stamp TWM 165
        3 Rare Candy SSH 180
        1 Nest Ball PAF 84
        3 Iono PR-SV 124
        3 Ultra Ball PAF 91
        2 Night Stretcher SFA 61 PH
        2 Arven SVI 166
        2 Mela PAR 167
        1 Technical Machine: Devolution PAR 177
        1 Jamming Tower TWM 153
        2 Crispin SCR 133
        4 Buddy-Buddy Poffin TEF 144
        1 Switch SVI 194
        2 Professor's Research JTG 155
        1 Earthen Vessel PAR 163

        Energia: 2
        3 Basic {P} Energy Energy 13
        3 Basic {R} Energy Energy 10

        Total de cartas: 60
    `,
    data: [
      { count: 1, name: 'Hawlucha', set: 'SVI', setNumber: '118' },
      { count: 4, name: 'Dreepy', set: 'TWM', setNumber: '128' },
      { count: 2, name: 'Duskull', set: 'SFA', setNumber: '018' },
      { count: 1, name: 'Fezandipiti ex', set: 'SFA', setNumber: '038' },
      { count: 2, name: 'Budew', set: 'PRE', setNumber: '004' },
      { count: 4, name: 'Drakloak', set: 'TWM', setNumber: '129' },
      { count: 1, name: 'Dusclops', set: 'SFA', setNumber: '019' },
      { count: 1, name: 'Dragapult ex', set: 'TWM', setNumber: '130' },
      { count: 2, name: 'Dusknoir', set: 'SFA', setNumber: '020' },
      { count: 2, name: 'Dragapult ex', set: 'TWM', setNumber: '200' },
      { count: 2, name: "Boss's Orders", set: 'RCL', setNumber: '189' },
      { count: 2, name: 'Counter Catcher', set: 'PAR', setNumber: '160' },
      { count: 1, name: "Professor Turo's Scenario", set: 'PAR', setNumber: '171' },
      { count: 1, name: 'Unfair Stamp', set: 'TWM', setNumber: '165' },
      { count: 3, name: 'Rare Candy', set: 'SSH', setNumber: '180' },
      { count: 1, name: 'Nest Ball', set: 'PAF', setNumber: '084' },
      { count: 3, name: 'Iono', set: 'SVP', setNumber: '124' },
      { count: 3, name: 'Ultra Ball', set: 'PAF', setNumber: '091' },
      { count: 2, name: 'Night Stretcher', set: 'SFA', setNumber: '061' },
      { count: 2, name: 'Arven', set: 'SVI', setNumber: '166' },
      { count: 2, name: 'Mela', set: 'PAR', setNumber: '167' },
      { count: 1, name: 'Technical Machine: Devolution', set: 'PAR', setNumber: '177' },
      { count: 1, name: 'Jamming Tower', set: 'TWM', setNumber: '153' },
      { count: 2, name: 'Crispin', set: 'SCR', setNumber: '133' },
      { count: 4, name: 'Buddy-Buddy Poffin', set: 'TEF', setNumber: '144' },
      { count: 1, name: 'Switch', set: 'SVI', setNumber: '194' },
      { count: 2, name: "Professor's Research", set: 'JTG', setNumber: '155' },
      { count: 1, name: 'Earthen Vessel', set: 'PAR', setNumber: '163' },
      { count: 3, name: 'Basic {P} Energy', set: 'SUM', setNumber: 'P' },
      { count: 3, name: 'Basic {R} Energy', set: 'SUM', setNumber: 'R' },
    ],
  },
  {
    desc: '',
    deckList: `
        Pokémon: 10
        1 Hawlucha SVI 118
        4 Dreepy TWM 128
        2 Duskull SFA 18
        1 Fezandipiti ex SFA 38
        2 Budew PRE 4
        4 Drakloak TWM 129
        1 Dusclops SFA 19
        1 Dragapult ex TWM 130
        2 Dusknoir SFA 20
        2 Dragapult ex TWM 200

        Trainer: 18
        2         Boss's Orders RCL     189
        2 Counter Catcher PAR 160
        1 Professor Turo's Scenario PAR 171
        1 Unfair Stamp TWM       165
        3 Rare Candy SSH 180
        1 Nest Ball PAF 84
        3 Iono PR-SV 124
        3 Ultra Ball PAF 91
        2 Night Stretcher SFA 61
        2 Arven SVI 166
        2 Mela PAR 167
        1 Technical Machine: Devolution PAR 177
        1 Jamming Tower TWM 153
        2 Crispin SCR 133
        4 Buddy-Buddy Poffin TEF 144
        1 Switch SVI 194
        2 Professor's Research JTG 155
        1 Earthen Vessel PAR 163

        Energy: 2
        3 Basic {P} Energy Energy 13
        3 Basic {R} Energy Energy 10

        Total Cards: 60
    `,
    data: [
      { count: 1, name: 'Hawlucha', set: 'SVI', setNumber: '118' },
      { count: 4, name: 'Dreepy', set: 'TWM', setNumber: '128' },
      { count: 2, name: 'Duskull', set: 'SFA', setNumber: '018' },
      { count: 1, name: 'Fezandipiti ex', set: 'SFA', setNumber: '038' },
      { count: 2, name: 'Budew', set: 'PRE', setNumber: '004' },
      { count: 4, name: 'Drakloak', set: 'TWM', setNumber: '129' },
      { count: 1, name: 'Dusclops', set: 'SFA', setNumber: '019' },
      { count: 1, name: 'Dragapult ex', set: 'TWM', setNumber: '130' },
      { count: 2, name: 'Dusknoir', set: 'SFA', setNumber: '020' },
      { count: 2, name: 'Dragapult ex', set: 'TWM', setNumber: '200' },
      { count: 2, name: "Boss's Orders", set: 'RCL', setNumber: '189' },
      { count: 2, name: 'Counter Catcher', set: 'PAR', setNumber: '160' },
      { count: 1, name: "Professor Turo's Scenario", set: 'PAR', setNumber: '171' },
      { count: 1, name: 'Unfair Stamp', set: 'TWM', setNumber: '165' },
      { count: 3, name: 'Rare Candy', set: 'SSH', setNumber: '180' },
      { count: 1, name: 'Nest Ball', set: 'PAF', setNumber: '084' },
      { count: 3, name: 'Iono', set: 'SVP', setNumber: '124' },
      { count: 3, name: 'Ultra Ball', set: 'PAF', setNumber: '091' },
      { count: 2, name: 'Night Stretcher', set: 'SFA', setNumber: '061' },
      { count: 2, name: 'Arven', set: 'SVI', setNumber: '166' },
      { count: 2, name: 'Mela', set: 'PAR', setNumber: '167' },
      { count: 1, name: 'Technical Machine: Devolution', set: 'PAR', setNumber: '177' },
      { count: 1, name: 'Jamming Tower', set: 'TWM', setNumber: '153' },
      { count: 2, name: 'Crispin', set: 'SCR', setNumber: '133' },
      { count: 4, name: 'Buddy-Buddy Poffin', set: 'TEF', setNumber: '144' },
      { count: 1, name: 'Switch', set: 'SVI', setNumber: '194' },
      { count: 2, name: "Professor's Research", set: 'JTG', setNumber: '155' },
      { count: 1, name: 'Earthen Vessel', set: 'PAR', setNumber: '163' },
      { count: 3, name: 'Basic {P} Energy', set: 'SUM', setNumber: 'P' },
      { count: 3, name: 'Basic {R} Energy', set: 'SUM', setNumber: 'R' },
    ],
  },
  {
    desc: 'Decklist without sections',
    deckList: `
        2 Teal Mask Ogerpon ex PR-SV 166
        1 Teal Mask Ogerpon ex TWM 25
        1 Noctowl PRE 78
        1 Latias ex SSP 76
        1 Mew ex MEW 151
        2 Raging Bolt ex TEF 123
        3 Hoothoot TEF 126
        1 Raging Bolt SCR 111
        1 Fezandipiti ex SFA 38
        2 Noctowl SCR 115
        1 Ditto MEW 132
        2 Fan Rotom SCR 118
        1 Bloodmoon Ursaluna ex TWM 141
        1 Slither Wing PAR 107
        3 Ultra Ball SVI 196
        1 Judge SVI 176
        2 Earthen Vessel PAR 163
        2 Area Zero Underdepths SCR 131
        2 Crispin SCR 133
        1 Counter Catcher PAR 160
        1 Bravery Charm PAL 173 PH
        1 Jamming Tower TWM 153
        1 Professor Turo's Scenario PAR 171
        2 Professor Sada's Vitality PAR 170
        1 Energy Retrieval SLG 59 PH
        2 Night Stretcher SFA 61
        1 Prime Catcher TEF 157
        1 Pal Pad SVI 182
        4 Nest Ball SVI 181
        2 Professor Sada's Vitality PRE 120
        1 Boss's Orders PAL 172
        1 Energy Switch GEN 61
        3 Basic {F} Energy SVE 14
        3 Basic {L} Energy SVE 12
        5 Basic {G} Energy SVE 9
    `,
    data: [
      { count: 2, name: 'Teal Mask Ogerpon ex', set: 'SVP', setNumber: '166' },
      { count: 1, name: 'Teal Mask Ogerpon ex', set: 'TWM', setNumber: '025' },
      { count: 1, name: 'Noctowl', set: 'PRE', setNumber: '078' },
      { count: 1, name: 'Latias ex', set: 'SSP', setNumber: '076' },
      { count: 1, name: 'Mew ex', set: 'MEW', setNumber: '151' },
      { count: 2, name: 'Raging Bolt ex', set: 'TEF', setNumber: '123' },
      { count: 3, name: 'Hoothoot', set: 'TEF', setNumber: '126' },
      { count: 1, name: 'Raging Bolt', set: 'SCR', setNumber: '111' },
      { count: 1, name: 'Fezandipiti ex', set: 'SFA', setNumber: '038' },
      { count: 2, name: 'Noctowl', set: 'SCR', setNumber: '115' },
      { count: 1, name: 'Ditto', set: 'MEW', setNumber: '132' },
      { count: 2, name: 'Fan Rotom', set: 'SCR', setNumber: '118' },
      { count: 1, name: 'Bloodmoon Ursaluna ex', set: 'TWM', setNumber: '141' },
      { count: 1, name: 'Slither Wing', set: 'PAR', setNumber: '107' },
      { count: 3, name: 'Ultra Ball', set: 'SVI', setNumber: '196' },
      { count: 1, name: 'Judge', set: 'SVI', setNumber: '176' },
      { count: 2, name: 'Earthen Vessel', set: 'PAR', setNumber: '163' },
      { count: 2, name: 'Area Zero Underdepths', set: 'SCR', setNumber: '131' },
      { count: 2, name: 'Crispin', set: 'SCR', setNumber: '133' },
      { count: 1, name: 'Counter Catcher', set: 'PAR', setNumber: '160' },
      { count: 1, name: 'Bravery Charm', set: 'PAL', setNumber: '173' },
      { count: 1, name: 'Jamming Tower', set: 'TWM', setNumber: '153' },
      { count: 1, name: "Professor Turo's Scenario", set: 'PAR', setNumber: '171' },
      { count: 2, name: "Professor Sada's Vitality", set: 'PAR', setNumber: '170' },
      { count: 1, name: 'Energy Retrieval', set: 'SLG', setNumber: '059' },
      { count: 2, name: 'Night Stretcher', set: 'SFA', setNumber: '061' },
      { count: 1, name: 'Prime Catcher', set: 'TEF', setNumber: '157' },
      { count: 1, name: 'Pal Pad', set: 'SVI', setNumber: '182' },
      { count: 4, name: 'Nest Ball', set: 'SVI', setNumber: '181' },
      { count: 2, name: "Professor Sada's Vitality", set: 'PRE', setNumber: '120' },
      { count: 1, name: "Boss's Orders", set: 'PAL', setNumber: '172' },
      { count: 1, name: 'Energy Switch', set: 'GEN', setNumber: '061' },
      { count: 3, name: 'Basic {F} Energy', set: 'SVE', setNumber: '014' },
      { count: 3, name: 'Basic {L} Energy', set: 'SVE', setNumber: '012' },
      { count: 5, name: 'Basic {G} Energy', set: 'SVE', setNumber: '009' },
    ],
  },
  //   {
  //     desc: 'Unconventional formatting - portuguese',
  //     deckList: `

  //         gholdengo ex:

  //         pokémon:
  //         gimmighoul 088/182 - X2
  //         gimmighoul 097/191 - X2
  //         gholdengo ex 139/182 - X4
  //         munkidori 095/167 - X1
  //         scyther 123/165  - x1
  //         Scizor 141/197 - x1
  //         fezandipiti ex 038/064 x1
  //         Genesect Ex 067/086  -  X 2

  //         Treinadores
  //         Recuperação de energia superior - X4
  //         Bola ninho - X4
  //         Poffin de colega - X4
  //         arven - X4
  //         Decodificação da criptomaniaca - x3
  //         balão de ar -x3
  //         ordem da chefia - x3
  //         busca de energia superior - x1
  //         kissera - x1
  //         Recipiente terrestre - x1
  //         pegador de contra-ataque - x1
  //         pokegear 3.0 - X2
  //         Levincia - x1
  //         maca noturna - X2
  //         Hipótese do professor turo - x1

  //         energias

  //         energia metal - x3
  //         energia elétrica - X2
  //         energia psíquica - x1
  //         energia noturno - x1
  //         energia água - x1
  //         energia fogo - x1
  //         energia lutador - x1
  //         energia grama - x1
  //     `,
  //     data: [
  //       { count: 2, name: 'gimmighoul', set: '088/182' },
  //       { count: 2, name: 'gimmighoul', set: '097/191' },
  //       { count: 4, name: 'gholdengo ex', set: '139/182' },
  //       { count: 1, name: 'munkidori', set: '095/167' },
  //       { count: 1, name: 'scyther', set: '123/165' },
  //       { count: 1, name: 'Scizor', set: '141/197' },
  //       { count: 1, name: 'fezandipiti ex', set: '038/064' },
  //       { count: 2, name: 'Genesect Ex', set: '067/086' },
  //       { count: 4, name: 'Recuperação de energia superior' },
  //       { count: 4, name: 'Bola ninho' },
  //       { count: 4, name: 'Poffin de colega' },
  //       { count: 4, name: 'arven' },
  //       { count: 3, name: 'Decodificação da criptomaniaca' },
  //       { count: 3, name: 'balão de ar' },
  //       { count: 3, name: 'ordem da chefia' },
  //       { count: 1, name: 'busca de energia superior' },
  //       { count: 1, name: 'kissera' },
  //       { count: 1, name: 'Recipiente terrestre' },
  //       { count: 1, name: 'pegador de contra-ataque' },
  //       { count: 2, name: 'pokegear 3.0' },
  //       { count: 1, name: 'Levincia' },
  //       { count: 2, name: 'maca noturna' },
  //       { count: 1, name: 'Hipótese do professor turo' },
  //       { count: 3, name: 'energia metal' },
  //       { count: 2, name: 'energia elétrica' },
  //       { count: 1, name: 'energia psíquica' },
  //       { count: 1, name: 'energia noturno' },
  //       { count: 1, name: 'energia água' },
  //       { count: 1, name: 'energia fogo' },
  //       { count: 1, name: 'energia lutador' },
  //       { count: 1, name: 'energia grama' },
  //     ],
  //   },
];

export default decks;
