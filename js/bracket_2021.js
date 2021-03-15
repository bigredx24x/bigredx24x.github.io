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

var teamsff = ['16 Norfolk St',
                  '16 Appalachian State',
                  '11 Wichita State',
                  '11 Drake',
                  '16 Mount St. Mary\'s',
                  '16 Texas Southern',
                  '11 Michigan State',
                  '11 UCLA']

var ff_map2game = [0,4,8,12]

var teams = ['1 Gonzaga',
             'ff1',
             '8 Oklahoma',
             '9 Missouri',
             '5 Creighton',
             '12 UC Santa Barbara',
             '4 Virginia',
             '13 Ohio',
             '6 USC',
             'ff2',
             '3 Kansas',
             '14 Eastern Washington',
             '7 Oregon',
             '10 VCU',
             '2 Iowa',
             '15 Grand Canyon',
             // ---
             '1 Michigan',
             'ff3',
             '8 LSU',
             '9 St. Bonaventure',
             '5 Colorado',
             '12 Georgetown',
             '4 Florida State',
             '13 UNC Greensboro',
             '6 BYU',
             'ff4',
             '3 Texas',
             '14 Abilene Christian',
             '7 UConn',
             '10 Maryland',
             '2 Alabama',
             '15 Iona',
             // ---
             '1 Baylor',
             '16 Hartford',
             '8 North Carolina',
             '9 Wisconsin',
             '5 Villanova',
             '12 Winthrop',
             '4 Purdue',
             '13 North Texas',
             '6 Texas Tech',
             '11 Utah State',
             '3 Arkansas',
             '14 Colgate',
             '7 Florida',
             '10 Virginia Tech',
             '2 Ohio State',
             '15 Oral Roberts',
             // ---
             '1 Illinois',
             '16 Drexel',
             '8 Loyola Chicago',
             '9 Georgia Tech',
             '5 Tennessee',
             '12 Oregon State',
             '4 Oklahoma State',
             '13 Liberty',
             '6 San Diego State',
             '11 Syracuse',
             '3 West Virginia',
             '14 Morehead State',
             '7 Clemson',
             '10 Rutgers',
             '2 Houston',
             '15 Cleveland State']
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
