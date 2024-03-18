var dataSet = JSON.parse(data)
for(i=0; i<dataSet.length; i++){
  dataSet[i]['ngames'] = 0;
  dataSet[i]['projection'] = 0;
}

stats_config = {pfp: 1,
                pfr: 0,
                pfa: 0,
                pfb: 0};


function pick_winner(elem){
  // id will be <round>_<game><top/bottom>
  var round = parseInt(elem.id.split("_")[0]);
  var game = parseInt(elem.id.split("_")[1]);

  //console.log(round);
  //console.log(game);

  if (round>5){
    return;
  }

  var top_bottom;

  if (game%2 == 1){
    top_bottom = 'bottom'
  } else {
    top_bottom = 'top'
  }

  var id_to_update
  if(round==0){
    id_to_update = (round+1)+'_'+parseInt(ff_map2game[game])+'_bottom'
  }
  else{
    id_to_update = (round+1)+'_'+parseInt(game/2)+'_'+top_bottom;
  }

  //console.log(id_to_update);

  var div = document.getElementById(id_to_update);
  div.innerHTML = elem.textContent

  ngames_by_team = get_ngames_for_each_team();
  update_data_stats(ngames_by_team);
  redraw_table()

}

function update_data_stats(ngames_by_team){
  for(i=0; i<dataSet.length; i++){
    var found_team = false;
    for(var team in ngames_by_team){
      if (dataSet[i]['team_name'] === team){
        found_team = true;
        dataSet[i]['ngames'] = ngames_by_team[team]
        // TODO - update this per stats_config
        // AST, STL, REB, PTS, TO
        dataSet[i]['projection'] = (ngames_by_team[team] * parseFloat(dataSet[i]['PTS'])).toFixed(2)
        break
      }
    }
    if (found_team == false){
      //console.log(dataSet[i]['team_name'])
    }
  }
}

function redraw_table(){
  $('#example').dataTable().fnClearTable();
  $('#example').dataTable().fnAddData(dataSet);
}

var teamsff = [' 10 Virginia',
' 10 Colorado State',
' 16 Howard',
' 16 Wagner',
' 10 Boise State',
' 10 Colorado',
' 16 Montana State',
' 16 Grambling']

var ff_map2game = [30,8,22,24]

// 1 / 8 / 5 / 4 / 6 / 3 / 7 / 2

/* 







' -1 None',

' -1 None',




' -1 None',


 */

var teams = ['  1 UConn',
' 16 Stetson',
'  8 Florida Atlantic',
'  9 Northwestern',
'  5 San Diego State',
' 12 UAB',
'  4 Auburn',
' 13 Yale',
'  6 BYU',
' 11 Duquesne',
'  3 Illinois',
' 14 Morehead State',
'  7 Washington State',
' 10 Drake',
'  2 Iowa State',
' 15 South Dakota State',
//
'  1 North Carolina',
'ff2',
'  8 Mississippi State',
'  9 Michigan State',
'  5 Saint Mary\'s',
' 12 Grand Canyon',
'  4 Alabama',
' 13 Charleston',
'  6 Clemson',
' 11 New Mexico',
'  3 Baylor',
' 14 Colgate',
'  7 Dayton',
' 10 Nevada',
'  2 Arizona',
' 15 Long Beach State',
//
'  1 Houston',
' 16 Longwood',
'  8 Nebraska',
'  9 Texas A&M',
'  5 Wisconsin',
' 12 James Madison',
'  4 Duke',
' 13 Vermont',
'  6 Texas Tech',
' 11 NC State',
'  3 Kentucky',
' 14 Oakland',
'  7 Florida',
'ff3',
'  2 Marquette',
' 15 Western Kentucky',
//
'  1 Purdue',
'ff4',
'  8 Utah State',
'  9 TCU',
'  5 Gonzaga',
' 12 McNeese',
'  4 Kansas',
' 13 Samford',
'  6 South Carolina',
' 11 Oregon',
'  3 Creighton',
' 14 Akron',
'  7 Texas',
'ff1',
'  2 Tennessee',
' 15 Saint Peter\'s'
]

/*var teams = ['1 Gonzaga',
             '16 Georgia State',
             '8 Boise State',
             '9 Memphis',
             '5 Connecticut',
             '12 New Mexico State',
             '4 Arkansas',
             '13 Vermont',
             '6 Alabama',
             'ff2',
             '3 Texas Tech',
             '14 Montana State',
             '7 Michigan State',
             '10 Davidson',
             '2 Duke',
             '15 CSU Fullerton',
             // ---
             '1 Baylor',
             '16 Norfolk St',
             '8 North Carolina',
             '9 Marquette',
             '5 Saint Mary\'s',
             '12 ff4',
             '4 UCLA',
             '13 Akron',
             '6 Texas',
             '11 Virginia Tech',
             '3 Purdue',
             '14 Yale',
             '7 Murray State',
             '10 San Francisco',
             '2 Kentucky',
             '15 Saint Peter\'s',
             // ---
             '1 Arizona',
             '16 ff1',
             '8 Seton Hall',
             '9 TCU',
             '5 Houston',
             '12 UAB',
             '4 Illinois',
             '13 Chattanooga',
             '6 Colorado State',
             '11 Michigan',
             '3 Tennessee',
             '14 Longwood',
             '7 Ohio State',
             '10 Loyola Chicago',
             '2 Villanova',
             '15 Delaware',
             // ---
             '1 Kansas',
             '16 ff3',
             '8 San Diego State',
             '9 Creighton',
             '5 Iowa',
             '12 Richmond',
             '4 Providence',
             '13 South Dakota State',
             '6 LSU',
             '11 Iowa State',
             '3 Wisconsin',
             '14 Colgate',
             '7 USC',
             '10 Miami',
             '2 Auburn',
             '15 Jacksonville State']
             */
var ngames_by_team = {};

document.addEventListener("DOMContentLoaded", load_tourney());

function load_tourney(){
  var div = document.getElementById('r1left');
  div.innerHTML += get_empty_game_elements(16,1,0);
  var div = document.getElementById('r1right');
  div.innerHTML += get_empty_game_elements(16,1,16);

  var div = document.getElementById('r2left');
  div.innerHTML += get_empty_game_elements(8,2,0);
  var div = document.getElementById('r2right');
  div.innerHTML += get_empty_game_elements(8,2,8);

  var div = document.getElementById('r3left');
  div.innerHTML += get_empty_game_elements(4,3,0);
  var div = document.getElementById('r3right');
  div.innerHTML += get_empty_game_elements(4,3,4);

  var div = document.getElementById('r4left');
  div.innerHTML += get_empty_game_elements(2,4,0);
  var div = document.getElementById('r4right');
  div.innerHTML += get_empty_game_elements(2,4,2);

  var div = document.getElementById('ff_1');
  div.innerHTML += get_empty_game_elements(1,0,0);
  var div = document.getElementById('ff_2');
  div.innerHTML += get_empty_game_elements(1,0,1);
  var div = document.getElementById('ff_3');
  div.innerHTML += get_empty_game_elements(1,0,2);
  var div = document.getElementById('ff_4');
  div.innerHTML += get_empty_game_elements(1,0,3);

  fill_first_four();
  fill_round_1();
}

function stats_config_change(){
  console.log("stats_config_change...");
  stats_config.pfp = document.getElementById("pfp").value;
  stats_config.pfr = document.getElementById("pfr").value;
  stats_config.pfa = document.getElementById("pfa").value;
  stats_config.pfb = document.getElementById("pfb").value;
  console.log(stats_config);

}

function get_empty_game_elements(ngames, round, offset){
  var returnme = ''
  for(i=0; i<ngames; i++){
    id = round.toString() + '_' + (i+offset).toString()
    idtop = id + '_top'
    idbottom = id + '_bottom'
    returnme += '<ul class="matchup" id="'+id+'"><li class="team team-top" onmousedown="pick_winner(this)" id="'+idtop+'"><span class="score"></span></li><li class="team team-bottom" onmousedown="pick_winner(this)" id="'+idbottom+'"><span class="score"></span></li></ul>';
  }
  return returnme;
}

function fill_first_four(){
  for(i=0; i<4; i++){
    id = '0_' + i.toString() + '_top';
    var div = document.getElementById(id);
    t = teamsff[i*2]
    div.innerHTML += t;

    id = '0_' + i.toString() + '_bottom';
    var div = document.getElementById(id);
    t = teamsff[i*2+1]
    div.innerHTML += t;
  }
}

function fill_round_1(){
    for(i=0; i<32; i++){
      id = '1_'+ i.toString() + '_top';
      var div = document.getElementById(id);
      t = teams[(i*2)%teams.length];
      div.innerHTML += t;

      id = '1_'+ i.toString() + '_bottom'
      var div = document.getElementById(id);
      t = teams[(i*2+1)%teams.length]
      div.innerHTML += t;
    }
}

function get_ngames_for_each_team(){
  ngames_by_team = {};
  for(iround=1; iround<=6; iround++){
    for(igame=0; igame<(32/Math.pow(2,iround-1)); igame++){
      idtop = iround+'_'+igame+'_top';
      topteam = document.getElementById(idtop).textContent.trim();
      idbottom = iround+'_'+igame+'_bottom';
      bottomteam = document.getElementById(idbottom).textContent.trim();
      if(topteam.length>1){
        // strip rank
        topteam = topteam.split(" ").slice(1).join(" ")
        if (topteam in ngames_by_team){
          ngames_by_team[topteam] += 1;
        }
        else {
          ngames_by_team[topteam] = 1;
        }
      }
      if(bottomteam.length>1){
        // strip Rank
        bottomteam = bottomteam.split(" ").slice(1).join(" ");
        if (bottomteam in ngames_by_team){
          ngames_by_team[bottomteam] += 1;
        }
        else {
          ngames_by_team[bottomteam] = 1;
        }
      }


    }
  }
  //console.log(ngames_by_team);
  return ngames_by_team;
}


$(document).ready(function() {
    var table = $('#example').DataTable( {
        data: dataSet,
        columns: [
            { data : 'Name' , title : 'Player'},
            { data : 'team_name', title : 'Team'},
            { data : 'team_rank' , title : 'Rank'},
            { data : 'GP' , title : 'Games Played'},
            { data : 'PTS' , title : 'PPG'},
            { data : 'ngames', title : 'Projected Games'},
            { data : 'projection', title : 'Projected Pts'},
        ]
    } );
    table.order([ 5, "desc" ]).draw()

    var buttons = new $.fn.dataTable.Buttons(table, {
         buttons: [
           'copyHtml5',
           'excelHtml5',
           'csvHtml5',
           'pdfHtml5'
        ]
    }).container().appendTo($('#buttons'));
} );
